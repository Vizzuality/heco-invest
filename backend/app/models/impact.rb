class Impact
  include EnumModel

  TYPES = %w[
    biodiversity
    climate
    water
    community
  ].freeze

  def description
    read_attribute("description")
  end
end
