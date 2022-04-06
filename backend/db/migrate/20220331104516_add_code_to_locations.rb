class AddCodeToLocations < ActiveRecord::Migration[7.0]
  def change
    add_column :locations, :code, :string
  end
end
