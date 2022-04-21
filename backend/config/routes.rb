Rails.application.routes.draw do
  get :health_check, to: ->(_env) { [204, {}, [""]] }

  if ENV["JOBS_INSTANCE"]
    draw :jobs
  else
    draw :backoffice
    draw :api
  end
end
