class AddMosaicToProjectDeveloper < ActiveRecord::Migration[7.0]
  def change
    add_column :project_developers, :mosaics, :string, array: true
    drop_table :project_developer_locations
  end
end
