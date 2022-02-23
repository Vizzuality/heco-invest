class TicketSize
  include EnumModel

  TYPES = %w[
    small_grants
    prototyping
    validation
    scaling
  ].freeze
end
