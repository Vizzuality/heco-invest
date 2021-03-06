module Backoffice
  class BaseController < ApplicationController
    include Pagy::Backend
    include Breadcrumbs
    include Localization

    layout "backoffice"

    before_action :authenticate_admin!

    def pagy_defaults
      {items: 10}
    end
  end
end
