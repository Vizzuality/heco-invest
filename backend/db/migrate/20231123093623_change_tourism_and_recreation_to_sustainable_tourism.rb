class ChangeTourismAndRecreationToSustainableTourism < ActiveRecord::Migration[7.0]
  def up
    Project.where(category: "tourism-and-recreation").update_all(category: "sustainable-tourism")

    [Investor, ProjectDeveloper].each do |model|
      records_to_upsert = model.where("categories @> ?", "{tourism-and-recreation}")
        .map do |record|
        new_categories = record.categories.map do |category|
          category == "tourism-and-recreation" ? "sustainable-tourism" : category
        end

        record.attributes.merge(categories: new_categories)
      end

      model.upsert_all(records_to_upsert, unique_by: :id) unless records_to_upsert.empty?
    end
  end

  def down
    Project.where(category: "sustainable-tourism").update_all(category: "tourism-and-recreation")

    [Investor, ProjectDeveloper].each do |model|
      records_to_upsert = model.where("categories @> ?", "{sustainable-tourism}")
        .map do |record|
        new_categories = record.categories.map do |category|
          category == "sustainable-tourism" ? "tourism-and-recreation" : category
        end

        record.attributes.merge(categories: new_categories)
      end

      model.upsert_all(records_to_upsert, unique_by: :id) unless records_to_upsert.empty?
    end
  end
end
