class Category
  include EnumModel

  TYPES = %w[
    sustainable_agrosystems
    tourism_and_recreation
    forestry_and_agroforestry
    non_timber_forest_production
  ].freeze

  COLORS = {
    sustainable_agrosystems: "#E7C343",
    tourism_and_recreation: "#4492E5",
    forestry_and_agroforestry: "#E57D57",
    non_timber_forest_production: "#404B9A"
  }.freeze

  def color
    COLORS[slug.to_sym]
  end

  def description
    read_attribute("description")
  end
end
