devise_for :admins, path: "backoffice"

# admin_root_path is useful for devise
get "/backoffice", to: redirect("backoffice/investors"), as: :admin_root

namespace :backoffice do
  resources :accounts, only: [] do
    member do
      post :approve
      post :reject
    end
  end
  resources :investors, only: [:index]
  resources :project_developers, only: [:index]
end
