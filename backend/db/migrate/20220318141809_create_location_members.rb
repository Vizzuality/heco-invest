class CreateLocationMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :location_members, id: :uuid do |t|
      t.belongs_to :location, foreign_key: {on_delete: :cascade}, type: :uuid, null: false
      t.belongs_to :member, foreign_key: {on_delete: :cascade, to_table: :locations}, type: :uuid, null: false

      t.index [:location_id, :member_id], unique: true

      t.timestamps
    end
  end
end
