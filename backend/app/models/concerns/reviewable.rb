module Reviewable
  extend ActiveSupport::Concern

  included do
    enum review_status: {unapproved: 1, approved: 2, rejected: 3}
  end
end
