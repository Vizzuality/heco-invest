module API
  module V1
    class ProjectDeveloperSerializer
      include JSONAPI::Serializer

      attributes :name, :slug, :about, :website, :instagram, :facebook, :linkedin, :twitter,
        :mission, :project_developer_type, :categories, :impacts, :language, :picture_url,
        :entity_legal_registration_number

      has_many :locations
    end
  end
end
