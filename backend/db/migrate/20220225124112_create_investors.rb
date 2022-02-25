class CreateInvestors < ActiveRecord::Migration[7.0]
  def change
    create_table :investors, id: :uuid do |t|
      t.belongs_to :account, foreign_key: {on_delete: :cascade}, type: :uuid, index: true

      t.string :categories, array: true
      t.string :ticket_sizes, array: true
      t.string :instrument_types, array: true
      t.string :impacts, array: true
      t.integer :sdgs, array: true

      t.text :how_do_you_work_en
      t.text :how_do_you_work_es
      t.text :how_do_you_work_pt
      t.text :what_makes_the_difference_en
      t.text :what_makes_the_difference_es
      t.text :what_makes_the_difference_pt
      t.text :other_information_en
      t.text :other_information_es
      t.text :other_information_pt

      t.boolean :previously_invested, null: false
      t.text :previously_invested_description_en
      t.text :previously_invested_description_es
      t.text :previously_invested_description_pt

      t.integer :review_status
      t.datetime :reviewed_at
      t.text :review_message

      t.timestamps
    end
  end
end
