module API
  module V1
    class UserSerializer < BaseSerializer
      attributes :first_name, :last_name, :email, :role
      attribute :confirmed, &:confirmed?
      attribute :approved, &:approved?

      attribute :invitation do |object, _params|
        next :completed if object.invitation_accepted?
        next :waiting if object.invited_to_sign_up?
      end
    end
  end
end
