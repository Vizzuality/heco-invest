devise_for :admins, path: "backoffice"

get "/backoffice", to: "backoffice/dashboards#show", as: :admin_root

namespace :backoffice do
  resources :project_developers, only: [:index]
end
