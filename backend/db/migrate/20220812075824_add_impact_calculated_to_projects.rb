class AddImpactCalculatedToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :impact_calculated, :boolean, default: false
    Project.update_all impact_calculated: true # we expect that all existing projects already have impact calculated
  end
end
