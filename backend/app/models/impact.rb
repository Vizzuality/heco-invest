class Impact
  include StaticModel

  TYPES = %w[
    grant
    loan
    equity
  ].freeze
end
