class TicketSize
  include StaticModel

  TYPES = %w[
    small_grants
    prototyping
    validation
    scaling
  ].freeze
end
