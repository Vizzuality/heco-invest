namespace :jobs do
  post :test, to: ->(_env) { [200, {}, [""]] }
end
