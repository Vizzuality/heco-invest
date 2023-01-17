module Klab
  class BuildContextString
    attr_accessor :project, :impact_level

    def initialize(project, impact_level)
      @project = project
      @impact_level = impact_level
    end

    def call
      # TODO: construct correct string based on project geometry and required impact level
      "aries.heco.locations.colombia_continental"
    end
  end
end
