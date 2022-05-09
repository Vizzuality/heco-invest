module API
  class Sorter
    attr_accessor :query, :sorting_query_param, :sorting_direction_param, :language

    SORTING_DIRECTIONS = %i[asc desc]
    SORTING_OPTIONS = {
      name: {ProjectDeveloper => :account, Investor => :account},
      created_at: {}
    }

    def initialize(query, sorting_by:, language: I18n.locale)
      @query = query
      @sorting_query_param, @sorting_direction_param = sorting_by.to_s.split(" ").map(&:to_sym)
      @language = language
    end

    def call
      self.query = query.joins(sort_joins).order(sort_query => sort_direction)
      add_secondary_default_sorting
    end

    private

    def add_secondary_default_sorting
      return query if sorting_query_param == :created_at

      self.query = query.order(created_at: :desc)
    end

    def sort_query
      @sort_query ||= begin
        param = SORTING_OPTIONS.keys.find { |option| option == sorting_query_param } || :created_at
        add_root_table add_locale(param)
      end
    end

    def sort_direction
      @sort_direction ||= SORTING_DIRECTIONS.find { |option| option == sorting_direction_param } || :desc
    end

    def sort_joins
      @sort_joins ||= SORTING_OPTIONS.dig(sorting_query_param, query.klass)
    end

    def add_locale(param)
      klass = sort_joins.present? ? sort_joins.to_s.classify.constantize : query.klass
      param.in?(klass.translatable_attributes) ? "#{param}_#{language}" : param
    end

    def add_root_table(param)
      return "#{query.klass.table_name}.#{param}" if sort_joins.blank?

      "#{sort_joins.to_s.pluralize}.#{param}"
    end

    def column_names
      @column_names ||= query.klass.column_names
    end
  end
end
