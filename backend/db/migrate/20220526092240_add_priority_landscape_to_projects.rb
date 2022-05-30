class AddPriorityLandscapeToProjects < ActiveRecord::Migration[7.0]
  def change
    add_reference :projects, :priority_landscape, foreign_key: {to_table: :locations}, type: :uuid
  end
end
