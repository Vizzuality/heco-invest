class RenameRegionLocationType < ActiveRecord::Migration[7.0]
  def change
    Location.where(location_type: :region).update_all location_type: :priority_landscape
  end
end
