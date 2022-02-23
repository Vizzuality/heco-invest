class InvestorType
  include EnumModel

  TYPES = %w[
    investor
    angel_investor
    commercial_bank
    family_office
    institutional_investor
    investment_bank
    international_financial_institution
    micro_finance
    non_VC_investment_vehicle
    venture_capital_private_equity
    carbon_fund
    ngo
    foundation
    corporate_foundation
    philanthropy
    hnwi_or_celebrity
  ].freeze
end
