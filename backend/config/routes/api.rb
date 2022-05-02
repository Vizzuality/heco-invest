mount Rswag::Ui::Engine => "/api-docs"
mount Rswag::Api::Engine => "/api-docs"

devise_for :users, path: "api/v1", skip: :all

namespace :api, format: "json" do
  namespace :v1 do
    resource :session, only: [:create, :destroy]
    resource :user, only: [:create, :show]
    resource :email_confirmation, only: [:create, :show]
    resource :reset_password, only: [:create, :update]

    resources :investors, only: [:index, :show]
    resources :locations, only: [:index, :show]
    resources :open_calls, only: [:index, :show]
    resources :project_developers, only: [:index, :show] do
      resource :favourite_project_developer, only: [:create, :destroy]
    end
    resources :projects, only: [:index, :show] do
      resource :favourite_project, only: [:create, :destroy]
    end

    resources :enums, only: [:index]

    scope "account", module: "accounts" do
      resource :project_developer, only: [:create, :update, :show]
      resources :projects, only: [:create]
    end
    resources :test_jobs, only: [] do
      post :test_sync, on: :collection
      post :test_async, on: :collection
    end
  end
end
