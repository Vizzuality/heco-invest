module BelongsToAccount
  extend ActiveSupport::Concern

  included do
    belongs_to :account, autosave: true

    delegate :name, :slug, :owner_id, :owner, :picture, :about, :website, :instagram, :facebook, :linkedin, :twitter,
      :contact_email, :contact_phone, :review_status, :reviewed_at, :review_message, :language, to: :account, allow_nil: true

    scope :approved, -> { joins(:account).where(account: {review_status: :approved}) }

    accepts_nested_attributes_for :account

    alias_method :account_language, :language

    def language=(value)
      account.language = value
    end
  end
end
