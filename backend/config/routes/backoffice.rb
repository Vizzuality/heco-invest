devise_for :admins, path: "backoffice", controllers: {sessions: "backoffice/admins/sessions"}
devise_scope :admin do
  get "backoffice/admins/sessions/change_locale" => "backoffice/admins/sessions"
end

# admin_root_path is useful for devise
get "/backoffice", to: redirect("backoffice/projects"), as: :admin_root

namespace :backoffice do
  resources :accounts, only: [] do
    member do
      post :approve
      post :reject
    end
  end
  resources :investors, only: [:index, :edit, :update, :destroy]
  resources :project_developers, only: [:index, :edit, :update, :destroy]
  resources :projects, only: [:index, :edit, :update, :destroy]
  resources :admins, only: [:index]
end
