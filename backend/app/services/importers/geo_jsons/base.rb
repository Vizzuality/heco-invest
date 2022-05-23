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
          store_locations_with! attrs
          add_location_ids_to attrs
          store_geometries_with! attrs
        end
      rescue Errno::ENOENT
        puts "GeoJSON at #{path} with location data was not found. Skipping location import!"
      end

      private

      def store_locations_with!(attrs)
        Location.upsert_all attrs.map { |attr| attr.except(:geometry) }, unique_by: uniq_key_for(attrs)
      end

      def store_geometries_with!(attrs)
        LocationGeometry.upsert_all attrs.map { |attr| attr.slice(:geometry, :location_id) }, unique_by: :location_id
      end

      def add_location_ids_to(attrs)
        keys = uniq_key_for attrs
        locations = Location.select(keys + [:id]).group_by { |r| keys.map { |attr| r.read_attribute attr } }
        attrs.each { |attr| attr[:location_id] = locations[attr.values_at(*keys)].first.id }
      end

      def attributes_of_record_for(feature)
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
