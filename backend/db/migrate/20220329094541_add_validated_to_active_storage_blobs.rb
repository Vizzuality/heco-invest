class AddValidatedToActiveStorageBlobs < ActiveRecord::Migration[7.0]
  def change
    add_column :active_storage_blobs, :validated, :boolean, default: false
  end
end
