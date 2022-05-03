module API
  module V1
    class InvestorSerializer < BaseSerializer
      include BlobSerializer

      attributes :name, :slug, :about, :website, :instagram, :facebook, :linkedin, :twitter,
        :how_do_you_work, :what_makes_the_difference, :other_information, :investor_type,
        :categories, :ticket_sizes, :instrument_types, :impacts, :sdgs,
        :previously_invested, :previously_invested_description, :language, :review_status,
        :contact_email, :contact_phone

      belongs_to :owner, serializer: :user

      attribute :picture do |object|
        image_links_for object.picture
      end
    end
  end
end
