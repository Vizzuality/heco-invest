class AddOwnerToAccounts < ActiveRecord::Migration[7.0]
  def change
    add_belongs_to :accounts, :owner, foreign_key: {on_delete: :cascade, to_table: :users}, type: :uuid, null: false
  end
end
