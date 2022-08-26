class ImpactArea
  include EnumModel

  TYPES_WITH_GROUPS = {
    "biodiversity" => %w[conservation restoration pollutants-reduction],
    "climate" => %w[carbon-emission-reduction energy-efficiency renewable-energy carbon-storage-or-sequestration],
    "water" => %w[water-capacity-or-efficiency hydrometerological-risk-reduction sustainable-food],
    "community" => %w[gender-equality-jobs indigenous-or-ethic-jobs community-empowerment]
  }.freeze
  TYPES = TYPES_WITH_GROUPS.values.flatten

  def impact
    TYPES_WITH_GROUPS.invert.detect { |k, _| k.include? id }.last
  end
end
