class ProjectDeveloperType
  include EnumModel

  TYPES = %w[
    academic
    business-cooperative
    business-large-enterprise-corporation
    business-sme-and-msme
    business-start-up-entrepreneur
    business-trade-or-business-association
    government-national
    government-sub-national
    public-private-organization-or-program
    ngo
    iplc-organization
  ].freeze
end
