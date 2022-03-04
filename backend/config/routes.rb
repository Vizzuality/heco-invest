Rails.application.routes.draw do
  namespace :api, format: "json" do
    namespace :v1 do
      resources :investors, only: [:index, :show]
      resources :open_calls, only: [:index, :show]
      resources :project_developers, only: [:index, :show]
    end
  end
end
