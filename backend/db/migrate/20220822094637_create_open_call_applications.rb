class CreateOpenCallApplications < ActiveRecord::Migration[7.0]
  def change
    create_table :open_call_applications, id: :uuid do |t|
      t.belongs_to :open_call, null: false, foreign_key: {on_delete: :cascade}, type: :uuid
      t.belongs_to :project_developer, null: false, foreign_key: {on_delete: :cascade}, type: :uuid
      t.belongs_to :project, null: false, foreign_key: {on_delete: :cascade}, type: :uuid
      t.text :message_en
      t.text :message_es
      t.text :message_pt
      t.string :language, null: false

      t.timestamps
    end
  end
end
