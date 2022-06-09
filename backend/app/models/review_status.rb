class ReviewStatus
  include EnumModel

  TYPES_WITH_CODE = {unapproved: 0, approved: 1, rejected: 2}
  TYPES = TYPES_WITH_CODE.keys
end
