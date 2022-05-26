module Backoffice
  class BaseController < ApplicationController
    layout "backoffice"

    before_action :authenticate_admin!
  end
end
