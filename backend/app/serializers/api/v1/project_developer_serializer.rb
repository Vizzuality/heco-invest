module API
  module V1
    class ProjectDeveloperSerializer
      include JSONAPI::Serializer

      attributes :name, :slug, :about, :website, :instagram, :facebook, :linkedin, :twitter,
        :mission, :project_developer_type, :categories, :impacts, :language
    end
  end
end
