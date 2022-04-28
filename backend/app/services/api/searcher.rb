module API
  class Searcher
    attr_accessor :query, :filters

    ENUM_FILTERS = %i[category impact sdg instrument_type ticket_size]

    def initialize(query, filters)
      @query = query
      @filters = filters
    end

    def call
      filter_by_enums
      filter_by_only_verified
      query
    end

    private

    def filter_by_enums
      pluralize(filters.slice(*ENUM_FILTERS)).slice(*column_names).each do |filter_key, filter_value|
        sql = ActiveRecord::Base.sanitize_sql ["ARRAY[#{filter_key}]::text[] && ARRAY[?]::text[]", Array.wrap(filter_value)]
        self.query = query.where sql
      end
    end

    def filter_by_only_verified
      return unless filters[:only_verified] && column_names.include?("review_status")

      self.query = query.where review_status: :approved
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
