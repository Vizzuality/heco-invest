class CreateBackgroundJobEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :background_job_events, id: :uuid do |t|
      t.integer :status, null: false, default: 0
      t.jsonb :arguments, default: []
      t.string :queue_name
      t.string :priority
      t.integer :executions, null: false, default: 0
      t.jsonb :message

      t.timestamps
    end
  end
end
