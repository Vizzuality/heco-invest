module API
  module V1
    class OpenCallSerializer < BaseSerializer
      attributes :name, :slug, :description,
        :ticket_size, :instrument_type, :sdgs,
        :money_distribution, :impact_description,
        :closing_at, :language, :trusted

      belongs_to :investor
    end
  end
end
