class CreateProjectDevelopers < ActiveRecord::Migration[7.0]
  def change
    create_table :project_developers, id: :uuid do |t|
      t.belongs_to :account, foreign_key: {on_delete: :cascade}, type: :uuid, null: false, index: true

      t.string :project_developer_type, null: false
      t.string :categories, array: true
      t.string :impacts, array: true
      t.text :mission_en
      t.text :mission_es
      t.text :mission_pt
      t.integer :review_status, null: false, default: 0
      t.datetime :reviewed_at
      t.text :review_message
      t.string :language, null: false

      t.timestamps
    end
  end
end
