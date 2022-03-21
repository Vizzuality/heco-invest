class CreateLocations < ActiveRecord::Migration[7.0]
  def change
    create_table :locations, id: :uuid do |t|
      t.belongs_to :parent, foreign_key: {on_delete: :cascade, to_table: :locations}, type: :uuid

      t.string :location_type, null: false

      t.text :name_en
      t.text :name_es
      t.text :name_pt

      t.index [:location_type, :parent_id, :name_en], unique: true, where: "parent_id IS NOT NULL", name: "uniq_name_en_with_parent_id"
      t.index [:location_type, :parent_id, :name_es], unique: true, where: "parent_id IS NOT NULL", name: "uniq_name_es_with_parent_id"
      t.index [:location_type, :parent_id, :name_pt], unique: true, where: "parent_id IS NOT NULL", name: "uniq_name_pt_with_parent_id"
      t.index [:location_type, :name_en], unique: true, where: "parent_id IS NULL", name: "uniq_name_en_without_parent_id"
      t.index [:location_type, :name_es], unique: true, where: "parent_id IS NULL", name: "uniq_name_es_without_parent_id"
      t.index [:location_type, :name_pt], unique: true, where: "parent_id IS NULL", name: "uniq_name_pt_without_parent_id"

      t.timestamps
    end
  end
end
