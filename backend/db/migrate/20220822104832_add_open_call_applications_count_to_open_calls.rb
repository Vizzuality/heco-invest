class AddOpenCallApplicationsCountToOpenCalls < ActiveRecord::Migration[7.0]
  def self.up
    add_column :open_calls, :open_call_applications_count, :integer, null: false, default: 0
    OpenCall.find_each { |open_call| OpenCall.reset_counters(open_call.id, :open_call_applications) }
  end

  def self.down
    remove_column :open_calls, :open_call_applications_count
  end
end
