module API
  module V1
    class EnumsController < BaseController
      def index
        data = [
          InstrumentType.all,
          Category.all,
          TicketSize.all,
          Impact.all,
          # ProjectDeveloperType.all, wait for better definition
          InvestorType.all,
          LocationType.all
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
