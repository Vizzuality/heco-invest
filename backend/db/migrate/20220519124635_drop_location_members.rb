class DropLocationMembers < ActiveRecord::Migration[7.0]
  def change
    drop_table :location_members
  end
end
