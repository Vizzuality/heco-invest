module Backoffice
  class BaseController < ApplicationController
    before_action :authenticate_admin!
  end
end
