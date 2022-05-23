module API
  module V1
    class InvestorSerializer < BaseSerializer
      include BlobSerializer

      attributes :name, :slug, :about, :website, :instagram, :facebook, :linkedin, :twitter,
        :mission, :prioritized_projects_description, :other_information, :investor_type,
        :categories, :ticket_sizes, :instrument_types, :impacts, :sdgs,
        :previously_invested, :language, :review_status

      account_approved_attributes :contact_email, :contact_phone

      belongs_to :owner, serializer: :user

      attribute :picture do |object|
        image_links_for object.picture
      end
    end
  end
end
