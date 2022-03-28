module BelongsToAccount
  extend ActiveSupport::Concern

  included do
    belongs_to :account

    delegate :name, :slug, :owner_id, :picture, :about, :website, :instagram, :facebook, :linkedin, :twitter, to: :account
  end
end
