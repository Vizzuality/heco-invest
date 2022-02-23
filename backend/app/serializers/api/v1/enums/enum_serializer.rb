module API
  module V1
    module Enums
      module EnumSerializer
        extend ActiveSupport::Concern
        include JSONAPI::Serializer

        included do
          set_id :slug
          attributes :name
        end
      end
    end
  end
end
