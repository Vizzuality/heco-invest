module API
  module V1
    class UserSerializer < BaseSerializer
      include BlobSerializer

      attributes :first_name, :last_name, :email, :role, :created_at
      attribute :confirmed, &:confirmed?
      attribute :approved, &:approved?

      attribute :invitation do |object, _params|
        if object.account_id.present?
          :completed if object.invitation_accepted?
        elsif object.invited_to_sign_up?
          next :expired if !object.valid_invitation?

          :waiting
        end
      end

      attribute :owner do |object, _params|
        object.owner_account.present?
      end

      attribute :avatar do |object|
        image_links_for object.avatar
      end
    end
  end
end
