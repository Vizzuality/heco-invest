Rails.application.routes.draw do
  get :health_check, to: ->(_env) { [204, {}, [""]] }

  authenticate :user do
    post "/rails/active_storage/direct_uploads", to: "active_storage/direct_uploads#create"
  end

  draw :backoffice
  draw :api
  draw :jobs if ENV["IS_JOBS_INSTANCE"].to_s == "true"
end
