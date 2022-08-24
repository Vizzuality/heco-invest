class OpenCallStatus
  include EnumModel

  TYPES_WITH_CODE = {draft: 0, launched: 1, closed: 2}
  TYPES = TYPES_WITH_CODE.keys
end
