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
          attrs = RGeo::GeoJSON.decode(File.read(path)).to_a.map { |feature| attributes_of_record_for feature }
          Location.where(id: query.pluck(:id)).upsert_all attrs, unique_by: uniq_key_for(attrs)
          Location.where(id: query.pluck(:id), geometry: nil).destroy_all
        end
      rescue Errno::ENOENT
        # pass
      end

      private

      def attributes_of_record_for(feature)
        raise NotImplementedError
      end

      def query
        raise NotImplementedError
      end

      def uniq_key_for(attrs)
        return [:location_type, :parent_id, :name_en] if attrs.first.key? :parent_id

        [:location_type, :name_en]
      end

      def titleize_of(name)
        name.downcase.humanize.gsub(/\b('?[\w\W])/) { $1.capitalize }
      end
    end
  end
end
