class CreateProjectImages < ActiveRecord::Migration[7.0]
  def change
    create_table :project_images, id: :uuid do |t|
      t.belongs_to :project, foreign_key: {on_delete: :cascade}, type: :uuid, null: false
      t.boolean :is_cover, null: false, default: false

      t.timestamps
    end
  end
end
