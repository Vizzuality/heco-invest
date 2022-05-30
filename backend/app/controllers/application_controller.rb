class ApplicationController < ActionController::Base
  protected

  def after_sign_out_path_for(resource_or_scope)
    scope = Devise::Mapping.find_scope!(resource_or_scope)
    if scope == :admin
      new_admin_session_path
    else
      super
    end
  end
end
