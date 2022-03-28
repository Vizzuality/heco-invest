class LocationType
  include EnumModel

  TYPES = %w[
    country
    department
    municipality
    region
  ].freeze
end
