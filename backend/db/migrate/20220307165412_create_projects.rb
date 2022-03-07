class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects, id: :uuid do |t|
      t.belongs_to :project_developer, foreign_key: {on_delete: :cascade}, type: :uuid, null: false

      t.text :name_en
      t.text :name_es
      t.text :name_pt
      t.text :slug, null: false

      t.integer :status, null: false, default: 0

      t.decimal :latitude, precision: 10, scale: 6
      t.decimal :longitude, precision: 10, scale: 6
      t.text :address

      t.string :categories, array: true
      t.string :ticket_size, null: false
      t.string :instrument_types, array: true, null: false
      t.integer :sdgs, array: true

      t.integer :number_of_partners
      t.integer :number_of_employees, null: false
      t.integer :number_of_employees_women
      t.integer :number_of_employees_young
      t.integer :number_of_employees_indigenous
      t.integer :number_of_employees_migrants

      t.boolean :received_funding, null: false
      t.text :received_funding_description_en
      t.text :received_funding_description_es
      t.text :received_funding_description_pt
      t.text :income_in_last_3_years, null: false

      t.text :description_en
      t.text :description_es
      t.text :description_pt
      t.text :problem_en
      t.text :problem_es
      t.text :problem_pt
      t.text :solution_en
      t.text :solution_es
      t.text :solution_pt
      t.text :business_model_en
      t.text :business_model_es
      t.text :business_model_pt
      t.text :roi_en
      t.text :roi_es
      t.text :roi_pt
      t.text :sustainability_en
      t.text :sustainability_es
      t.text :sustainability_pt
      t.text :impact_description_en
      t.text :impact_description_es
      t.text :impact_description_pt
      t.text :other_information_en
      t.text :other_information_es
      t.text :other_information_pt

      t.boolean :trusted, null: false, default: false

      t.text :website
      t.text :linkedin
      t.text :facebook
      t.text :twitter
      t.text :instagram

      t.string :language, null: false

      t.index [:project_developer_id, :name_en], unique: true
      t.index [:project_developer_id, :name_es], unique: true
      t.index [:project_developer_id, :name_pt], unique: true
      t.index :slug, unique: true

      t.timestamps
    end
  end
end
