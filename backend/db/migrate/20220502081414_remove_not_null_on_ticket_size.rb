class RemoveNotNullOnTicketSize < ActiveRecord::Migration[7.0]
  def change
    change_column_null :projects, :ticket_size, true
  end
end
