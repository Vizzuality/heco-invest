module API
  class Filterer
    attr_accessor :query, :filters, :language

    FULL_TEXT_FILTERS = %i[name description about mission problem solution expected_impact]
    FULL_TEXT_EXTRA_TABLES = {
      ProjectDeveloper => :account,
      Investor => :account
    }
    ENUM_FILTERS = %i[category impact sdg instrument_type ticket_size]

    def initialize(query, filters, language: I18n.locale)
      @query = query
      @filters = filters
      @language = language
    end

    def call
      apply_full_text_filter
      filter_by_enums
      filter_by_only_verified
      query
    end

    private

    def apply_full_text_filter
      return query if filters[:full_text].blank?

      extra_ids = Array.wrap(FULL_TEXT_EXTRA_TABLES[query.klass]).map do |relation|
        full_text_record_ids_for relation.to_s.classify.constantize, attr: "#{relation}_id"
      end.flatten
      self.query = query.where(id: extra_ids + full_text_record_ids_for(query.klass))
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

    def full_text_record_ids_for(klass, attr: "id")
      columns = (klass.translatable_attributes & FULL_TEXT_FILTERS).map { |key| "#{key}_#{language}" }
      columns = (columns + FULL_TEXT_FILTERS.map(&:to_s)) & klass.column_names
      return [] if columns.blank?

      query.klass.where(attr => klass.dynamic_search(columns, filters[:full_text]).pluck(:id)).pluck(:id)
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
