class CreateLocationGeometries < ActiveRecord::Migration[7.0]
  def change
    create_table :location_geometries, id: :uuid do |t|
      t.belongs_to :location, foreign_key: {on_delete: :cascade}, index: {unique: true}, type: :uuid, null: false
      t.geometry :geometry, null: false

      t.timestamps
    end
  end
end
