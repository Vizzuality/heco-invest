module API
  module V1
    class ProjectDeveloperSerializer < BaseSerializer
      include BlobSerializer

      attributes :name, :slug, :about, :website, :instagram, :facebook, :linkedin, :twitter,
        :mission, :project_developer_type, :categories, :impacts, :language, :entity_legal_registration_number,
        :review_status, :mosaics

      account_approved_attributes :contact_email, :contact_phone

      belongs_to :owner, serializer: :user

      has_many :projects
      has_many :involved_projects, serializer: :project

      attribute :picture do |object|
        image_links_for object.picture
      end

      attribute :favourite do |object, params|
        next if params[:current_user].blank?

        object.id.in? params[:current_user].project_developer_ids
      end
    end
  end
end
