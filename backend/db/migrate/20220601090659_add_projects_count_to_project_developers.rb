class AddProjectsCountToProjectDevelopers < ActiveRecord::Migration[7.0]
  def self.up
    add_column :project_developers, :projects_count, :integer, null: false, default: 0
    ProjectDeveloper.find_each { |project_developer| ProjectDeveloper.reset_counters(project_developer.id, :projects) }
  end

  def self.down
    remove_column :project_developers, :projects_count
  end
end
