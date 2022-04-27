class CreateFavouriteProjectDevelopers < ActiveRecord::Migration[7.0]
  def change
    create_table :favourite_project_developers, id: :uuid do |t|
      t.belongs_to :user, foreign_key: {on_delete: :cascade}, type: :uuid, null: false
      t.belongs_to :project_developer, foreign_key: {on_delete: :cascade}, type: :uuid, null: false

      t.index [:user_id, :project_developer_id], unique: true, name: "favourite_project_developer_id_on_user_id"

      t.timestamps
    end
  end
end
