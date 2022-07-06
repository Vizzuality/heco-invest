class ProjectStatus
  include EnumModel

  TYPES_WITH_CODE = {draft: 0, published: 1}
  TYPES = TYPES_WITH_CODE.keys
end
