module API
  module V1
    class InstrumentTypesController < ApplicationController
      def index
        render json: InstrumentTypeSerializer.new(InstrumentType.all).serializable_hash
      end
    end
  end
end
