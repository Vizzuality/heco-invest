class Category
  include EnumModel

  TYPES = %w[
    sustainable-agrosystems
    tourism-and-recreation
    forestry-and-agroforestry
    non-timber-forest-production
    human-capital-and-inclusion
  ].freeze

  COLORS = {
    "sustainable-agrosystems": "#E7C343",
    "tourism-and-recreation": "#4492E5",
    "forestry-and-agroforestry": "#E57D57",
    "non-timber-forest-production": "#404B9A",
    "human-capital-and-inclusion": "#A0616A"
  }.freeze

  def color
    COLORS[slug.to_sym]
  end

  def description
    read_attribute("description")
  end
end
