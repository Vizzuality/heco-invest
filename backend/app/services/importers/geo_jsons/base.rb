module Importers
  module GeoJsons
    class Base
      attr_accessor :path, :country

      def initialize(path, country)
        @path = path
        @country = country
      end

      def call
        Location.transaction do
          RGeo::GeoJSON.decode(File.read(path)).to_a.each { |feature| process_line feature }
          Location.where(id: data.pluck(:id), geometry: nil).destroy_all
        end
      rescue Errno::ENOENT
        # pass
      end

      private

      def process_line(feature)
        record = find_correct_record_for(feature) || Location.new
        record.assign_attributes attributes_of_record_for(feature)
        record.save!
      end

      def attributes_of_record_for(feature)
        raise NotImplementedError
      end

      def find_correct_record_for(feature)
        raise NotImplementedError
      end

      def titleize_of(name)
        name.downcase.humanize.gsub(/\b('?[\w\W])/) { $1.capitalize }
      end
    end
  end
end
