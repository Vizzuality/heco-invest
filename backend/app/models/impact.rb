class Impact
  include EnumModel

  TYPES = %w[
    biodiversity
    climate
    water
    community
  ].freeze
end
