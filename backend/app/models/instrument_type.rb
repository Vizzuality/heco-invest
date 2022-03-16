class InstrumentType
  include EnumModel

  TYPES = %w[
    grant
    loan
    equity
  ].freeze

  def description
    read_attribute("description")
  end
end
