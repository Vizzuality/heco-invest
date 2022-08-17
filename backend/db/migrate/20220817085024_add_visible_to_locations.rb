class AddVisibleToLocations < ActiveRecord::Migration[7.0]
  def change
    add_column :locations, :visible, :boolean, null: false, default: true
  end
end
