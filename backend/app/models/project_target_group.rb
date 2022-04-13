class ProjectTargetGroup
  include EnumModel

  TYPES = %w[
    entrepreneurs-and-innovators-startups
    small-and-medium-businesses
    urban-populations
    indigenous-peoples
    afro-desendant-peoples
    peasants-and-traditional-inhabitants
    migrants-and-displaced-groups
    groups-with-disabilities
    lgtbq-plus-groups
    other
  ].freeze
end
