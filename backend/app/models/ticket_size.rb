class TicketSize
  include EnumModel

  TYPES = %w[
    small-grants
    prototyping
    validation
    scaling
  ].freeze

  def amount
    read_attribute("amount")
  end
end
