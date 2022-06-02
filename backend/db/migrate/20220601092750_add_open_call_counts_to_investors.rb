class AddOpenCallCountsToInvestors < ActiveRecord::Migration[7.0]
  def self.up
    add_column :investors, :open_calls_count, :integer, null: false, default: 0
    Investor.find_each { |investor| Investor.reset_counters(investor.id, :open_calls) }
  end

  def self.down
    remove_column :investors, :open_calls_count
  end
end
