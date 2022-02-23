module API
  module V1
    class EnumsController < ApplicationController
      def index
        data = [
          InstrumentType.all,
          Category.all,
          TicketSize.all,
          Impact.all,
          ProjectDeveloperType.all,
          InvestorType.all
        ].flatten

        serialized_enums = data.map do |d|
          resolve_serializer(d).new(d).serializable_hash[:data]
        end.compact

        render json: {data: serialized_enums}
      end

      private

      def resolve_serializer(object)
        API::V1.const_get("Enums::#{object.class.name}Serializer")
      end
    end
  end
end
