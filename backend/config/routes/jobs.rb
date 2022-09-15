namespace :jobs do
  resources :users, only: [] do
    collection do
      post :purge
    end
  end
  resources :open_calls, only: [] do
    collection do
      post :close_past_deadline
    end
  end
end
