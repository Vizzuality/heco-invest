class ChangesForOpenCalls < ActiveRecord::Migration[7.0]
  def change
    add_reference :open_calls, :country, foreign_key: {to_table: :locations}, type: :uuid
    add_reference :open_calls, :department, foreign_key: {to_table: :locations}, type: :uuid
    add_reference :open_calls, :municipality, foreign_key: {to_table: :locations}, type: :uuid

    add_column :open_calls, :maximum_funding_per_project, :integer, default: 0, null: false
    add_column :open_calls, :funding_priorities_en, :text
    add_column :open_calls, :funding_priorities_es, :text
    add_column :open_calls, :funding_priorities_pt, :text
    add_column :open_calls, :funding_exclusions_en, :text
    add_column :open_calls, :funding_exclusions_es, :text
    add_column :open_calls, :funding_exclusions_pt, :text
    add_column :open_calls, :instrument_types, :string, array: true

    migrate_existing_open_calls!

    remove_column :open_calls, :money_distribution_en
    remove_column :open_calls, :money_distribution_es
    remove_column :open_calls, :money_distribution_pt
    remove_column :open_calls, :ticket_size
    remove_column :open_calls, :instrument_type

    change_column_null :open_calls, :country_id, false
    change_column_null :open_calls, :instrument_types, false
  end

  private

  def migrate_existing_open_calls!
    OpenCall.all.each do |open_call|
      open_call.assign_attributes country_id: country.id, instrument_types: [open_call.instrument_type]
      open_call.save validate: false
    end
  end

  def country
    @country ||= Location.find_by! location_type: :country, name_en: "Colombia"
  end
end
