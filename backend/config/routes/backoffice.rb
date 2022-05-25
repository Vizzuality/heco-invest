devise_for :admins, path: "backoffice"

get "/backoffice", to: "backoffice/dashboards#show", as: :admin_root

namespace :backoffice do
  resources :accounts, only: [] do
    member do
      post :approve
      post :reject
    end
  end
  resources :project_developers, only: [:index]
end
