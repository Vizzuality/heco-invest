module API
  module V1
    class ProjectSerializer
      include JSONAPI::Serializer

      attributes :name, :slug, :description,
        :ticket_size, :categories, :instrument_types, :sdgs,
        :problem, :solution, :business_model, :other_information,
        :impact_description, :sustainability, :roi,
        :income_in_last_3_years,
        :number_of_employees, :number_of_employees_women, :number_of_employees_young,
        :number_of_employees_indigenous, :number_of_employees_migrants,
        :language

      belongs_to :project_developer
    end
  end
end
