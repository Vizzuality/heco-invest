class AddCentroidToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :centroid, :st_point
    migrate_old_projects!
    remove_column :projects, :latitude
    remove_column :projects, :longitude
  end

  private

  def migrate_old_projects!
    Project.all.each do |project|
      next if project.latitude.nil? || project.longitude.nil?

      project.centroid = RGeo::Geographic.spherical_factory.point(project.longitude, project.latitude)
      project.save validate: false
    end
  end
end
