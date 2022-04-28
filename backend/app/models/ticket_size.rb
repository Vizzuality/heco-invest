class TicketSize
  include EnumModel

  TYPES = %w[
    small-grants
    prototyping
    validation
    scaling
  ].freeze

  def description
    read_attribute("description")
  end
end
