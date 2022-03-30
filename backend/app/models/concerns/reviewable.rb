module Reviewable
  extend ActiveSupport::Concern

  included do
    enum review_status: {unapproved: 0, approved: 1, rejected: 2}, _default: :unapproved
  end
end
