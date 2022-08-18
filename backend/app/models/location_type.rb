class LocationType
  include EnumModel

  TYPES = %w[
    country
    department
    municipality
    priority_landscape
    basins_category
    basin
  ].freeze
end
