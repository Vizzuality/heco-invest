class AddImpactDemandsToLocations < ActiveRecord::Migration[7.0]
  def change
    enable_extension "postgis"
    add_column :locations, :biodiversity, :decimal, precision: 25, scale: 20
    add_column :locations, :biodiversity_demand, :decimal, precision: 25, scale: 20
    add_column :locations, :climate, :decimal, precision: 25, scale: 20
    add_column :locations, :climate_demand, :decimal, precision: 25, scale: 20
    add_column :locations, :community, :decimal, precision: 25, scale: 20
    add_column :locations, :community_demand, :decimal, precision: 25, scale: 20
    add_column :locations, :water, :decimal, precision: 25, scale: 20
    add_column :locations, :water_demand, :decimal, precision: 25, scale: 20
  end
end
