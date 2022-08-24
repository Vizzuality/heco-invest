class AddStatusToOpenCalls < ActiveRecord::Migration[7.0]
  def change
    add_column :open_calls, :status, :integer, null: false, default: 1
  end
end
