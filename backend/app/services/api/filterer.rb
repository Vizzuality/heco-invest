module API
  class Filterer
    attr_accessor :query, :filters, :language

    FULL_TEXT_FILTERS = %i[name description about mission problem solution expected_impact]
    FULL_TEXT_EXTRA_TABLES = {
      ProjectDeveloper => :account,
      Investor => :account
    }
    NUMERICAL_FILTERS = %i[municipality_biodiversity_impact municipality_climate_impact municipality_water_impact municipality_community_impact]
    ENUM_FILTERS = %i[category impact sdg instrument_type ticket_size]

    def initialize(query, filters, language: I18n.locale)
      @query = query
      @filters = filters
      @language = language

      expand_filters
    end

    def call
      apply_full_text_filter
      apply_numerical_filter
      filter_by_enums
      filter_by_only_verified
      query
    end

    private

    def expand_filters
      filters[:impact].to_s.split(",").each { |i| filters["municipality_#{i}_impact"] = 0 }
    end

    def apply_full_text_filter
      return query if filters[:full_text].blank?

      associated_columns = Array.wrap(FULL_TEXT_EXTRA_TABLES[query.klass]).each_with_object({}) do |relation, res|
        res[relation] = localized_columns_for relation.to_s.classify.constantize
      end
      subquery_ids = query.klass.dynamic_search(localized_columns_for(query.klass), filters[:full_text], associated_columns).select(:id)
      self.query = query.where id: subquery_ids
    end

    def apply_numerical_filter
      sql_fragments = filters.slice(*NUMERICAL_FILTERS.map(&:to_s)).slice(*column_names).map do |filter_key, filter_value|
        ActiveRecord::Base.sanitize_sql ["#{filter_key} > ?", filter_value]
      end
      self.query = query.where sql_fragments.join(" OR ") if sql_fragments.present?
    end

    def filter_by_enums
      pluralize(filters.slice(*ENUM_FILTERS)).slice(*column_names).each do |filter_key, filter_value|
        sql = ActiveRecord::Base.sanitize_sql ["ARRAY[#{filter_key}]::text[] && ARRAY[?]::text[]", filter_value.split(",")]
        self.query = query.where sql
      end
    end

    def filter_by_only_verified
      return unless filters[:only_verified] && column_names.include?("trusted")

      self.query = query.where trusted: true
    end

    def localized_columns_for(klass)
      columns = (klass.translatable_attributes & FULL_TEXT_FILTERS).map { |key| "#{key}_#{language}" }
      (columns + FULL_TEXT_FILTERS.map(&:to_s)) & klass.column_names
    end

    def pluralize(hash)
      hash.each_with_object({}) do |(key, value), res|
        res[key.to_s] = value
        res[key.to_s.pluralize] = value
      end
    end

    def column_names
      @column_names ||= query.klass.column_names
    end
  end
end
