class AddContactFieldsToProjectDevelopers < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :contact_email, :text
    add_column :accounts, :contact_phone, :text
    change_column_null :accounts, :contact_email, false, "contact@example.com"
  end
end
