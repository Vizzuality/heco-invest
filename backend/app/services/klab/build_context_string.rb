module Klab
  class BuildContextString
    attr_accessor :project, :impact_level

    def initialize(project, impact_level)
      @project = project
      @impact_level = impact_level
    end

    def call
      # TODO: construct correct string based on project geometry and required impact level
      # returns nil if there is no usable geometry which can be send to k.LAB (for example there is no intersection between project centroid and raster of appropriate location type)
      "aries.heco.locations.colombia_continental"
    end
  end
end
