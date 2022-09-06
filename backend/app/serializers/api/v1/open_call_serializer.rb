module API
  module V1
    class OpenCallSerializer < BaseSerializer
      include BlobSerializer

      attributes :name,
        :slug,
        :description,
        :instrument_types,
        :sdgs,
        :funding_priorities,
        :funding_exclusions,
        :impact_description,
        :maximum_funding_per_project,
        :closing_at,
        :status,
        :language,
        :account_language,
        :verified,
        :created_at,
        :open_call_applications_count
      attribute :trusted, &:verified

      belongs_to :investor
      belongs_to :country, serializer: LocationSerializer
      belongs_to :municipality, serializer: LocationSerializer
      belongs_to :department, serializer: LocationSerializer

      attribute :picture do |object|
        image_links_for object.picture
      end

      attribute :favourite do |object, params|
        next if params[:current_user].blank?

        object.id.in? params[:current_user].open_call_ids
      end
    end
  end
end
