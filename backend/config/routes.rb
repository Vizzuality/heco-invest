Rails.application.routes.draw do
  mount Rswag::Ui::Engine => "/api-docs"
  mount Rswag::Api::Engine => "/api-docs"

  get :health_check, to: ->(_env) { [204, {}, [""]] }

  namespace :api, format: "json" do
    namespace :v1 do
      devise_for :users, singular: :user, only: [:confirmations]

      resource :session, only: [:create, :destroy]
      resource :user, only: [:create, :show]

      resources :investors, only: [:index, :show]
      resources :locations, only: [:index, :show]
      resources :open_calls, only: [:index, :show]
      resources :project_developers, only: [:index, :show]
      resources :projects, only: [:index, :show]

      resources :enums, only: [:index]

      get :csrf, to: "csrf#show"
    end
  end
end
