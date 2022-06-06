class CreateFavouriteInvestors < ActiveRecord::Migration[7.0]
  def change
    create_table :favourite_investors, id: :uuid do |t|
      t.belongs_to :user, foreign_key: {on_delete: :cascade}, type: :uuid, null: false
      t.belongs_to :investor, foreign_key: {on_delete: :cascade}, type: :uuid, null: false

      t.index [:user_id, :investor_id], unique: true

      t.timestamps
    end
  end
end
