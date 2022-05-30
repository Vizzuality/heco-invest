class ImpactArea
  include EnumModel

  TYPES = %w[
    conservation
    restoration
    pollutants-reduction
    carbon-emission-reduction
    energy-efficiency
    renewable-energy
    carbon-storage-or-sequestration
    water-capacity-or-efficiency
    hydrometerological-risk-reduction
    sustainable-food
    gender-equality-jobs
    indigenous-or-ethic-jobs
    community-empowerment
  ].freeze
end
