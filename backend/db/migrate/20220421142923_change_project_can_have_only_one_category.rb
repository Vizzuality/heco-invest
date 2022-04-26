class ChangeProjectCanHaveOnlyOneCategory < ActiveRecord::Migration[7.0]
  def up
    add_column :projects, :category, :string
    execute "UPDATE projects SET category = COALESCE(categories[0], '#{Category::TYPES.first}')"
    change_column_null :projects, :category, false
    remove_column :projects, :categories
  end

  def down
    add_column :projects, :category, :string, array: true
    execute "UPDATE projects SET categories = ARRAY[COALESCE(category, '#{Category::TYPES.first}')]"
    remove_column :projects, :category
  end
end
