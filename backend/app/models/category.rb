class Category
  include StaticModel

  TYPES = %w[
    sustainable_agrosystems
    tourism_and_recreation
    forestry_and_agroforestry
    non_timber_forest_production
  ].freeze
end
