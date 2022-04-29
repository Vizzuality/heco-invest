class AddGeometryToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :geometry, :jsonb, default: {}
  end
end
