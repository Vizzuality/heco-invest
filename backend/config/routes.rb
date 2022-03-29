Rails.application.routes.draw do
  mount Rswag::Ui::Engine => "/api-docs"
  mount Rswag::Api::Engine => "/api-docs"

  get :health_check, to: ->(_env) { [204, {}, [""]] }

  namespace :api, format: "json" do
    namespace :v1 do
      devise_for :users, singular: :user, path: "", only: [:confirmations],
        controllers: {
          confirmations: "api/v1/email_confirmations"
        },
        path_names: {
          confirmation: "email_confirmation"
        }

      resource :session, only: [:create, :destroy]
      resource :user, only: [:create, :show]

      resources :investors, only: [:index, :show]
      resources :locations, only: [:index, :show]
      resources :open_calls, only: [:index, :show]
      resources :project_developers, only: [:index, :show]
      resources :projects, only: [:index, :show]

      resources :enums, only: [:index]

      scope "account", module: "accounts" do
        resource :project_developer, only: [:create, :update]
      end
    end
  end
end
