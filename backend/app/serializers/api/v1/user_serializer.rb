module API
  module V1
    class UserSerializer
      include JSONAPI::Serializer

      attributes :first_name, :last_name, :email, :role
      attribute :confirmed, &:confirmed?
    end
  end
end
