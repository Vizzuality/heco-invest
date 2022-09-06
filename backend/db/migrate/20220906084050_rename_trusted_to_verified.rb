class RenameTrustedToVerified < ActiveRecord::Migration[7.0]
  def change
    rename_column :projects, :trusted, :verified
    rename_column :open_calls, :trusted, :verified
  end
end
