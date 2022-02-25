module API
  module V1
    class InvestorSerializer
      include JSONAPI::Serializer

      attributes :account_id, :how_do_you_work, :what_makes_the_difference, :other_information,
        :categories, :ticket_sizes, :instrument_types, :impacts, :sdgs,
        :previously_invested, :previously_invested_description
    end
  end
end
