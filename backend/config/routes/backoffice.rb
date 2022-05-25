devise_for :admins, path: "backoffice"

# admin_root_path is useful for devise
get "/backoffice", to: "backoffice/project_developers#index", as: :admin_root

namespace :backoffice do
  resources :accounts, only: [] do
    member do
      post :approve
      post :reject
    end
  end
  resources :project_developers, only: [:index]
end
