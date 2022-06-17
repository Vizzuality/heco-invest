module Backoffice
  class Breadcrumb
    attr_reader :path

    def initialize(title, path)
      @title = title
      @path = path
    end

    def title
      ActionController::Base.helpers.truncate(@title, length: 100)
    end

    def link?
      @path.present?
    end
  end
end
