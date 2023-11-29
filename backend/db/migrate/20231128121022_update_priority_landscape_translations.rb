class UpdatePriorityLandscapeTranslations < ActiveRecord::Migration[7.0]
  def up
    Rake::Task["priority_landscapes:translate"].execute
    Location.priority_landscape.update_all visible: true
  end

  def down
    new_location_names_en = ["Eastern Mountain", "Central Mountain Range", "Pacific - Coastal Marine", "Caribbean", "Pacific - Caribbean Transition"]
    Location.priority_landscape.where(name_en: new_location_names_en).update_all(visible: false)
  end
end
