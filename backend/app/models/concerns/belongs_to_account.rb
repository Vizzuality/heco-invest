module BelongsToAccount
  extend ActiveSupport::Concern

  included do
    belongs_to :account

    delegate :name, :slug, :picture, :about, :website, :instagram, :facebook, :linkedin, :twitter, to: :account
  end

  def picture_url
    Rails.application.routes.url_helpers.url_for picture if picture.present?
  end
end
