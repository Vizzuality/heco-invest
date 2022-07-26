class RemoveLanguageFromInvestorsAndPDs < ActiveRecord::Migration[7.0]
  def change
    remove_column :investors, :language
    remove_column :project_developers, :language
  end
end
