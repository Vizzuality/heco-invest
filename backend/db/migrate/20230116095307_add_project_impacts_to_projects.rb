class AddProjectImpactsToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :project_biodiversity_impact, :decimal, precision: 25, scale: 20
    add_column :projects, :project_climate_impact, :decimal, precision: 25, scale: 20
    add_column :projects, :project_water_impact, :decimal, precision: 25, scale: 20
    add_column :projects, :project_community_impact, :decimal, precision: 25, scale: 20
    add_column :projects, :project_total_impact, :decimal, precision: 25, scale: 20
  end
end
