class AddLastConfirmationEmailSentAtToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :last_confirmation_sent_at, :datetime
  end
end
