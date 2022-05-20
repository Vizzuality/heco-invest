module API
  class Filterer
    attr_accessor :query, :filters, :language

    FULL_TEXT_FILTERS = %i[name description about mission problem solution expected_impact]
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
      return if filters[:full_text].blank? || !query.klass.respond_to?(:translatable_attributes)

      columns = (query.klass.translatable_attributes & FULL_TEXT_FILTERS).map { |key| "#{key}_#{language}" }
      columns &= column_names
      self.query = query.dynamic_search columns, filters[:full_text] if columns.present?
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
