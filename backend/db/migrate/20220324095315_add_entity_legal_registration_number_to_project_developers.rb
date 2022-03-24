class AddEntityLegalRegistrationNumberToProjectDevelopers < ActiveRecord::Migration[7.0]
  def change
    add_column :project_developers, :entity_legal_registration_number, :string, null: false
  end
end
