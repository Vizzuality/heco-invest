module Reviewable
  extend ActiveSupport::Concern

  included do
    enum review_status: {unapproved: 1, approved: 2, rejected: 3}, _default: :unapproved
  end
end
