class AddImpactDemandsToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :project_biodiversity_demand, :decimal, precision: 25, scale: 20
    add_column :projects, :project_climate_demand, :decimal, precision: 25, scale: 20
    add_column :projects, :project_community_demand, :decimal, precision: 25, scale: 20
    add_column :projects, :project_water_demand, :decimal, precision: 25, scale: 20

    add_column :projects, :municipality_biodiversity_demand, :decimal, precision: 25, scale: 20
    add_column :projects, :municipality_climate_demand, :decimal, precision: 25, scale: 20
    add_column :projects, :municipality_community_demand, :decimal, precision: 25, scale: 20
    add_column :projects, :municipality_water_demand, :decimal, precision: 25, scale: 20

    add_column :projects, :hydrobasin_biodiversity_demand, :decimal, precision: 25, scale: 20
    add_column :projects, :hydrobasin_climate_demand, :decimal, precision: 25, scale: 20
    add_column :projects, :hydrobasin_community_demand, :decimal, precision: 25, scale: 20
    add_column :projects, :hydrobasin_water_demand, :decimal, precision: 25, scale: 20

    add_column :projects, :priority_landscape_biodiversity_demand, :decimal, precision: 25, scale: 20
    add_column :projects, :priority_landscape_climate_demand, :decimal, precision: 25, scale: 20
    add_column :projects, :priority_landscape_community_demand, :decimal, precision: 25, scale: 20
    add_column :projects, :priority_landscape_water_demand, :decimal, precision: 25, scale: 20
  end
end
