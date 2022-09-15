class DeviseInvitableAddToUsers < ActiveRecord::Migration[7.0]
  def up
    change_table :users do |t|
      t.string :invitation_token
      t.datetime :invitation_created_at
      t.datetime :invitation_sent_at
      t.datetime :invitation_accepted_at
      t.integer :invitation_limit
      t.references :invited_by, polymorphic: true, type: :uuid
      t.integer :invitations_count, default: 0
      t.index :invitation_token, unique: true # for invitable
      t.index :invited_by_id
    end

    change_column_null :users, :first_name, true
    change_column_null :users, :last_name, true
    change_column_null :users, :ui_language, true
  end

  def down
    change_table :users do |t|
      t.remove_references :invited_by, polymorphic: true
      t.remove :invitations_count, :invitation_limit, :invitation_sent_at, :invitation_accepted_at, :invitation_token, :invitation_created_at
    end
  end
end
