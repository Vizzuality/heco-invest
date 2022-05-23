class LocationType
  include EnumModel

  TYPES = %w[
    country
    department
    municipality
    region
    basins_category
    basin
  ].freeze
end
