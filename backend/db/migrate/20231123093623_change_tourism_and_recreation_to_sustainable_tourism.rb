class ChangeTourismAndRecreationToSustainableTourism < ActiveRecord::Migration[7.0]
  def up
    Project.where(category: "tourism-and-recreation").update_all(category: "sustainable-tourism")
    [Investor, ProjectDeveloper].each do |model|
      model.find_each do |record|
        new_categories = record.categories.map do |category|
          category == "tourism-and-recreation" ? "sustainable-tourism" : category
        end
        record.update(categories: new_categories)
      end
    end
  end

  def down
    Project.where(category: "sustainable-tourism").update_all(category: "tourism-and-recreation")

    [Investor, ProjectDeveloper].each do |model|
      model.find_each do |record|
        new_categories = record.categories.map do |category|
          category == "sustainable-tourism" ? "tourism-and-recreation" : category
        end
        record.update(categories: new_categories)
      end
    end
  end
end
