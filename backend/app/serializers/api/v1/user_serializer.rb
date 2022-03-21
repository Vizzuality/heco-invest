module API
  module V1
    class UserSerializer
      include JSONAPI::Serializer

      attributes :first_name, :last_name, :email, :role
    end
  end
end
