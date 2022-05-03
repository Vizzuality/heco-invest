module API
  class BaseSerializer
    include JSONAPI::Serializer

    class << self
      def account_approved_attributes(*attributes_list)
        attributes_list.each do |attr|
          attribute(attr) { |object, params| params[:current_user]&.approved? ? object.public_send(attr) : nil }
        end
      end
    end
  end
end
