class Backoffice::Admins::PasswordsController < Devise::PasswordsController
  include Backoffice::HttpAuth
  include Backoffice::Localization
end
