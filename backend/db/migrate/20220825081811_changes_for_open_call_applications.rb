class ChangesForOpenCallApplications < ActiveRecord::Migration[7.0]
  def change
    add_column :open_call_applications, :funded, :boolean, null: false, default: false
    remove_column :open_call_applications, :project_developer_id

    add_index :open_call_applications, [:open_call_id, :project_id], unique: true, name: "open_call_applications_open_call_id_on_project_id"
  end
end
