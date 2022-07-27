class CreateFavouriteOpenCalls < ActiveRecord::Migration[7.0]
  def change
    create_table :favourite_open_calls, id: :uuid do |t|
      t.belongs_to :user, foreign_key: {on_delete: :cascade}, type: :uuid, null: false
      t.belongs_to :open_call, foreign_key: {on_delete: :cascade}, type: :uuid, null: false

      t.index [:user_id, :open_call_id], unique: true, name: "favourite_open_call_id_on_user_id"

      t.timestamps
    end
  end
end
