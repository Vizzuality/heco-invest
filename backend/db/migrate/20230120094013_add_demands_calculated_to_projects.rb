class AddDemandsCalculatedToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :project_demands_calculated, :boolean, default: false
    add_column :projects, :municipality_demands_calculated, :boolean, default: false
    add_column :projects, :hydrobasin_demands_calculated, :boolean, default: false
    add_column :projects, :priority_landscape_demands_calculated, :boolean, default: false
  end
end
