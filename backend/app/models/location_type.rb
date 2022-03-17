class LocationType
  include EnumModel

  TYPES = %w[
    state
    department
    municipality
  ].freeze
end
