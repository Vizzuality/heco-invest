class CreateFavouriteProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :favourite_projects, id: :uuid do |t|
      t.belongs_to :user, foreign_key: {on_delete: :cascade}, type: :uuid, null: false
      t.belongs_to :project, foreign_key: {on_delete: :cascade}, type: :uuid, null: false

      t.index [:user_id, :project_id], unique: true

      t.timestamps
    end
  end
end
