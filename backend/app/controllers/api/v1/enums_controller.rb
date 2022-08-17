module API
  module V1
    class EnumsController < BaseController
      def index
        data = [
          Category.all,
          Impact.all,
          ImpactArea.all,
          InstrumentType.all,
          InvestorType.all,
          LocationType.all,
          ProjectDeveloperType.all,
          ProjectDevelopmentStage.all,
          ProjectStatus.all,
          ProjectTargetGroup.all,
          Sdg.all,
          TicketSize.all,
          OpenCallStatus.all
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
