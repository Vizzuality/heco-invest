namespace :jobs do
  resources :users, only: [] do
    collection do
      post :purge
    end
  end
end
