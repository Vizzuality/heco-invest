module Searchable
  extend ActiveSupport::Concern
  include PgSearch::Model

  included do
    pg_search_scope :dynamic_search, ->(columns, query) { {against: columns, query: query} }
  end
end
