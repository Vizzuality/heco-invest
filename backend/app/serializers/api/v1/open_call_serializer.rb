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
        :trusted,
        :created_at

      belongs_to :investor
      belongs_to :country, serializer: LocationSerializer
      belongs_to :municipality, serializer: LocationSerializer
      belongs_to :department, serializer: LocationSerializer

      attribute :picture do |object|
        image_links_for object.picture
      end
    end
  end
end
