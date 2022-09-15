module API
  class BaseSerializer
    include JSONAPI::Serializer

    class << self
      def account_approved_attributes(*attributes_list)
        attributes_list.each do |attr|
          attribute(attr) { |object, params| params[:current_user]&.approved? ? object.public_send(attr) : nil }
        end
      end

      def has_many_restricted(relationship_name, options = {})
        has_many relationship_name, options do |object, params|
          object.public_send(relationship_name).accessible_by params[:current_ability]
        end
      end
    end
  end
end
