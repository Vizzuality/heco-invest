module API
  module V1
    class InvestorSerializer < BaseSerializer
      include BlobSerializer

      attributes :name,
        :slug,
        :about,
        :website,
        :instagram,
        :facebook,
        :linkedin,
        :twitter,
        :mission,
        :prioritized_projects_description,
        :other_information,
        :investor_type,
        :categories,
        :ticket_sizes,
        :instrument_types,
        :impacts,
        :sdgs,
        :previously_invested,
        :language,
        :account_language,
        :review_status,
        :created_at

      account_approved_attributes :contact_email, :contact_phone

      belongs_to :owner, serializer: :user

      has_many_restricted :open_calls

      attribute :picture do |object|
        image_links_for object.picture
      end

      attribute :favourite do |object, params|
        next if params[:current_user].blank?

        object.id.in? params[:current_user].investor_ids
      end
    end
  end
end
