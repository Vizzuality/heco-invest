class AddImpactsToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :municipality_biodiversity_impact, :decimal, precision: 25, scale: 20
    add_column :projects, :municipality_climate_impact, :decimal, precision: 25, scale: 20
    add_column :projects, :municipality_water_impact, :decimal, precision: 25, scale: 20
    add_column :projects, :municipality_community_impact, :decimal, precision: 25, scale: 20
    add_column :projects, :municipality_total_impact, :decimal, precision: 25, scale: 20
    add_column :projects, :hydrobasin_biodiversity_impact, :decimal, precision: 25, scale: 20
    add_column :projects, :hydrobasin_climate_impact, :decimal, precision: 25, scale: 20
    add_column :projects, :hydrobasin_water_impact, :decimal, precision: 25, scale: 20
    add_column :projects, :hydrobasin_community_impact, :decimal, precision: 25, scale: 20
    add_column :projects, :hydrobasin_total_impact, :decimal, precision: 25, scale: 20
    add_column :projects, :priority_landscape_biodiversity_impact, :decimal, precision: 25, scale: 20
    add_column :projects, :priority_landscape_climate_impact, :decimal, precision: 25, scale: 20
    add_column :projects, :priority_landscape_water_impact, :decimal, precision: 25, scale: 20
    add_column :projects, :priority_landscape_community_impact, :decimal, precision: 25, scale: 20
    add_column :projects, :priority_landscape_total_impact, :decimal, precision: 25, scale: 20
  end
end
