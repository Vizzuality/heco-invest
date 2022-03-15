class InvestorType
  include EnumModel

  TYPES = %w[
    investor
    angel-investor
    commercial-bank
    family-office
    institutional-investor
    investment-bank
    international-financial-institution
    micro-finance
    non-VC-investment-vehicle
    venture-capital-private-equity
    carbon-fund
    ngo
    foundation
    corporate-foundation
    philanthropy
    hnwi-or-celebrity
  ].freeze
end
