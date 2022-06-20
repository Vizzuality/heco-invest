module Backoffice
  module Sections
    extend ActiveSupport::Concern

    included do
      helper_method :section_partial
    end

    private

    def sections(sections, default:)
      @sections = sections
      @sections_default = default
    end

    def section_partial
      raise "Sections not set for the controller" unless defined?(@sections)

      "section_#{section_key}"
    end

    def section_key
      @sections.include?(params[:section]&.downcase) ? params[:section].downcase : @sections_default
    end
  end
end
