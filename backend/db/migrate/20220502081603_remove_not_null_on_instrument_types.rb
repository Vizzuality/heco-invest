class RemoveNotNullOnInstrumentTypes < ActiveRecord::Migration[7.0]
  def change
    change_column_null :projects, :instrument_types, true
  end
end
