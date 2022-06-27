module API
  module V1
    class UserSerializer < BaseSerializer
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
    end
  end
end
