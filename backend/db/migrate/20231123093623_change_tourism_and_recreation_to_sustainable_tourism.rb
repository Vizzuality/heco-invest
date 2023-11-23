class ChangeTourismAndRecreationToSustainableTourism < ActiveRecord::Migration[7.0]
  def up
    Project.where(category: "tourism-and-recreation").update_all(category: "sustainable-tourism")

    [Investor, ProjectDeveloper].each do |model|
      model.where("categories @> ?", "{tourism-and-recreation}").find_each do |record|
        new_categories = record.categories.map do |category|
          category == "tourism-and-recreation" ? "sustainable-tourism" : category
        end

        data = record.attributes
        data['categories'] = new_categories
        
        model.upsert_all([data], unique_by: :id)
      end
    end
  end

  def down
    Project.where(category: "sustainable-tourism").update_all(category: "tourism-and-recreation")

    [Investor, ProjectDeveloper].each do |model|
      model.where("categories @> ?", "{sustainable-tourism}").find_each do |record|
        new_categories = record.categories.map do |category|
          category == "sustainable-tourism" ? "tourism-and-recreation" : category
        end

        data = record.attributes
        data['categories'] = new_categories

        model.upsert_all([data], unique_by: :id)
      end
    end
  end
end
