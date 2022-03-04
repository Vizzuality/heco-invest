class CreateOpenCalls < ActiveRecord::Migration[7.0]
  def change
    create_table :open_calls, id: :uuid do |t|
      t.belongs_to :investor, foreign_key: {on_delete: :cascade}, type: :uuid, null: false, index: true

      t.text :name_en
      t.text :name_es
      t.text :name_pt
      t.text :slug
      t.text :description_en
      t.text :description_es
      t.text :description_pt
      t.text :money_distribution_en
      t.text :money_distribution_es
      t.text :money_distribution_pt
      t.text :impact_description_en
      t.text :impact_description_es
      t.text :impact_description_pt

      t.boolean :trusted, null: false, default: false

      t.string :ticket_size, null: false
      t.string :instrument_type, null: false
      t.integer :sdgs, array: true

      t.string :language, null: false

      t.datetime :closing_at, null: false

      t.index [:investor_id, :name_en], unique: true
      t.index [:investor_id, :name_es], unique: true
      t.index [:investor_id, :name_pt], unique: true
      t.index :slug, unique: true

      t.timestamps
    end
  end
end
