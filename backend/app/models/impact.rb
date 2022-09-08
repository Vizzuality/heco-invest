class Impact
  include EnumModel

  TYPES = ImpactArea::TYPES_WITH_GROUPS.keys

  def description
    read_attribute("description")
  end
end
