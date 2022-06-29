mount Rswag::Ui::Engine => "/api-docs"
mount Rswag::Api::Engine => "/api-docs"

devise_for :users, path: "api/v1", skip: :all

namespace :api, format: "json" do
  namespace :v1 do
    resource :session, only: [:create, :destroy]
    resource :invitation, only: [:create, :update] do
      member do
        post :info
      end
    end
    resource :user, only: [:create, :show]
    resource :email_confirmation, only: [:create, :show]
    resource :reset_password, only: [:create, :update]

    resources :investors, only: [:index, :show] do
      resource :favourite_investor, only: [:create, :destroy]
    end
    resources :locations, only: [:index, :show]
    resources :open_calls, only: [:index, :show]
    resources :project_developers, only: [:index, :show] do
      resource :favourite_project_developer, only: [:create, :destroy]
    end

    namespace :projects do
      resource :map, only: [:show]
    end
    resources :projects, only: [:index, :show] do
      resource :favourite_project, only: [:create, :destroy]
    end

    resources :enums, only: [:index]

    resources :background_job_events, only: [:index]

    namespace :account, module: :accounts do
      resource :project_developer, only: [:create, :update, :show]
      resource :investor, only: [:create, :update, :show]
      resources :projects, only: [:index, :create, :update]
      resources :users, only: [:index]
    end
    resources :test_jobs, only: [] do
      post :test_sync, on: :collection
      post :test_async, on: :collection
    end
    resource :goes, only: [] do
      post :boom, on: :collection
    end
  end
end
