class UpdateInvestorFields < ActiveRecord::Migration[7.0]
  def change
    cols_to_remove = [:how_do_you_work, :what_makes_the_difference, :previously_invested_description]
    cols_to_add = [:mission, :prioritized_projects_description]

    cols_to_remove.each do |col|
      [:en, :es, :pt].each { |lng| remove_column :investors, "#{col}_#{lng}", :string }
    end
    cols_to_add.each do |col|
      [:en, :es, :pt].each { |lng| add_column :investors, "#{col}_#{lng}", :string }
    end
  end
end
