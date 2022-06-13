require "csv"

module Backoffice
  module CSV
    class BaseExporter
      attr_accessor :query, :columns

      def initialize(query)
        @query = query
      end

      def call
        raise NotImplementedError
      end

      private

      def generate_csv
        self.columns = []
        yield

        ::CSV.generate do |csv|
          csv << columns.map { |column| column[:name] }
          query.each do |record|
            csv << columns.map { |column| column[:block].call record }
          end
        end
      end

      def column(name, &block)
        columns << {name: name, block: block}
      end
    end
  end
end
