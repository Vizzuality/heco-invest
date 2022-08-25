module API
  module V1
    class OpenCallApplicationSerializer < BaseSerializer
      attributes :message,
        :funded,
        :created_at,
        :updated_at

      belongs_to :open_call
      belongs_to :project
      belongs_to :project_developer
      belongs_to :investor
    end
  end
end
