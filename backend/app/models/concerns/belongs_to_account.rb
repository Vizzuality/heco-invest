module BelongsToAccount
  extend ActiveSupport::Concern

  included do
    belongs_to :account

    delegate :name, :slug, :about, :website, :instagram, :facebook, :linkedin, :twitter, to: :account
  end
end
