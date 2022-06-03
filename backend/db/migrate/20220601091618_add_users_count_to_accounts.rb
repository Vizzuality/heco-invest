class AddUsersCountToAccounts < ActiveRecord::Migration[7.0]
  def self.up
    add_column :accounts, :users_count, :integer, null: false, default: 0
    Account.find_each { |account| Account.reset_counters(account.id, :users) }
  end

  def self.down
    remove_column :accounts, :users_count
  end
end
