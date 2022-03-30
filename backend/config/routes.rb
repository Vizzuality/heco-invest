Rails.application.routes.draw do
  mount Rswag::Ui::Engine => "/api-docs"
  mount Rswag::Api::Engine => "/api-docs"

  get :health_check, to: ->(_env) { [204, {}, [""]] }

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
      resources :project_developers, only: [:index, :show]
      resources :projects, only: [:index, :show]

      resources :enums, only: [:index]

      scope "account", module: "accounts" do
        resource :project_developer, only: :create
      end
    end
  end

  mount LetterOpenerWeb::Engine, at: "/letter_opener"
end
