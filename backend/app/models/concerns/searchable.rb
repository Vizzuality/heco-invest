module Searchable
  extend ActiveSupport::Concern
  include PgSearch::Model

  included do
    pg_search_scope :dynamic_search, ->(columns, query, associated_against) do
      {
        against: columns,
        query: query,
        associated_against: associated_against
      }
    end
  end
end
