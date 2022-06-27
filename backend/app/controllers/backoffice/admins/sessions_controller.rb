class Backoffice::Admins::SessionsController < Devise::SessionsController
  include Backoffice::Localization

  # GET
  def change_locale
    session[:locale] = params[:locale]
    redirect_back fallback_location: admin_root_path
  end
end
