class AddCodeToPriorityLandscapes < ActiveRecord::Migration[7.0]
  def change
    Rake::Task["priority_landscapes:add_codes"].execute
  end
end
