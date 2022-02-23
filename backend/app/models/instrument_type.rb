class InstrumentType
  include EnumModel

  TYPES = %w[
    grant
    loan
    equity
  ].freeze
end
