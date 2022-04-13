class ProjectDevelopmentStage
  include EnumModel

  TYPES = %w[
    incipient
    consolidaton
    scaling-up
  ].freeze

  def description
    read_attribute("description")
  end
end
