class CreateFundedProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :funded_projects, id: :uuid do |t|
      t.belongs_to :project, foreign_key: {on_delete: :cascade}, type: :uuid, null: false
      t.belongs_to :investor, foreign_key: {on_delete: :cascade}, type: :uuid, null: false

      t.index [:project_id, :investor_id], unique: true

      t.timestamps
    end
  end
end
