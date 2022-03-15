module API
  module V1
    module Enums
      class CategorySerializer
        include EnumSerializer

        attribute :color, :description
      end
    end
  end
end
