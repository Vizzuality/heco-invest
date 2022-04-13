class CreateProjectInvolvements < ActiveRecord::Migration[7.0]
  def change
    create_table :project_involvements, id: :uuid do |t|
      t.belongs_to :project, foreign_key: {on_delete: :cascade}, type: :uuid, null: false
      t.belongs_to :project_developer, foreign_key: {on_delete: :cascade}, type: :uuid, null: false

      t.index [:project_id, :project_developer_id], unique: true, name: "index_project_inv_on_project_id_and_project_developer_id"

      t.timestamps
    end
  end
end
