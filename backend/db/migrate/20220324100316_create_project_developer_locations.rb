class CreateProjectDeveloperLocations < ActiveRecord::Migration[7.0]
  def change
    create_table :project_developer_locations, id: :uuid do |t|
      t.belongs_to :location, foreign_key: {on_delete: :cascade}, type: :uuid, null: false
      t.belongs_to :project_developer, foreign_key: {on_delete: :cascade}, type: :uuid, null: false

      t.index [:location_id, :project_developer_id], unique: true, name: "uniq_index_project_developer_id_on_location_id"

      t.timestamps
    end
  end
end
