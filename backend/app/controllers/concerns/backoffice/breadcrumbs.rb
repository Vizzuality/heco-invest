module Backoffice
  module Breadcrumbs
    extend ActiveSupport::Concern

    included do
      helper_method :breadcrumbs
    end

    def breadcrumbs
      @breadcrumbs ||= []
    end

    def add_breadcrumb(title, path = nil)
      breadcrumbs << Breadcrumb.new(title, path)
    end
  end
end
