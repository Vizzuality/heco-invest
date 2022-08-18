class CreateProjectDeveloperPriorityLandscapes < ActiveRecord::Migration[7.0]
  ENUM_TO_LOCATION_TABLE = {
    "amazon-heart" => "Corazón Amazonía",
    "amazonian-piedmont-massif" => "Piedemonte Amazónico - Macizo",
    "orinoquia-transition" => "Transición Orinoquía",
    "orinoquia" => "Orinoquía"
  }

  def up
    create_table :project_developer_priority_landscapes, id: :uuid do |t|
      t.references :project_developer, null: false, foreign_key: {on_delete: :cascade}, type: :uuid, index: {name: "index_project_developer_id_on_priority_landscapes"}
      t.references :priority_landscape, null: false, foreign_key: {on_delete: :cascade, to_table: :locations}, type: :uuid, index: {name: "index_priority_landscape_id_on_priority_landscapes"}

      t.timestamps
    end

    I18n.with_locale(:es) { migrate_mosaics_to_priority_landscapes! }

    remove_column :project_developers, :mosaics
  end

  def down
    add_column :project_developers, :mosaics, :string, array: true

    I18n.with_locale(:es) { migrate_priority_landscapes_to_mosaics! }

    drop_table :project_developer_priority_landscapes
  end

  private

  def migrate_mosaics_to_priority_landscapes!
    ProjectDeveloper.all.each do |project_developer|
      developer_priority_landscapes = project_developer.mosaics.to_a.map { |m| priority_landscapes[ENUM_TO_LOCATION_TABLE[m]].first }
      project_developer.priority_landscapes = developer_priority_landscapes.compact
      project_developer.save validate: false
    end
  end

  def migrate_priority_landscapes_to_mosaics!
    ProjectDeveloper.all.each do |project_developer|
      mosaics = project_developer.priority_landscapes.map { |l| ENUM_TO_LOCATION_TABLE.invert[l.name] }
      project_developer.mosaics = mosaics.compact
      project_developer.save validate: false
    end
  end

  def priority_landscapes
    @priority_landscapes ||= Location.priority_landscape.group_by(&:name)
  end
end
