class ChangeProjectDefaultStatus < ActiveRecord::Migration[7.0]
  def up
    change_column_default :projects, :status, from: 0, to: 1
    execute "UPDATE projects SET status = 1" # no need to change back in down migration, this is for existing staging data
  end

  def down
    change_column_default :projects, :status, from: 1, to: 0
  end
end
