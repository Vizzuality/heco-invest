module BelongsToAccount
  extend ActiveSupport::Concern

  included do
    belongs_to :account

    delegate :name, :slug, :owner_id, :picture, :about, :website, :instagram, :facebook, :linkedin, :twitter, :contact_email, :contact_phone, to: :account
  end
end
