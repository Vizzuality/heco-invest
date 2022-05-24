devise_for :admins, path: "backoffice"

namespace :backoffice do
  resource :dashboard, only: [:show]

  root "dashboards#show"
end
