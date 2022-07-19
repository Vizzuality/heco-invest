require "capybara/cuprite"
require "rails_helper"

Capybara.default_max_wait_time = 2
Capybara.default_normalize_ws = true

Capybara.register_driver(:cuprite) do |app|
  Capybara::Cuprite::Driver.new(
    app,
    window_size: [1200, 800],
    browser_options: {
      "no-sandbox": nil
    },
    timeout: 45,
    # Increase Chrome startup wait time (required for stable CI builds)
    process_timeout: 60,
    inspector: true,
    headless: ENV["HEADLESS"] != "false"
  )
end

# Configure Capybara to use :cuprite driver by default
Capybara.default_driver = Capybara.javascript_driver = :cuprite

RSpec.configure do |config|
  config.include CupriteHelpers, type: :system
  config.include PageHelpers, type: :system

  config.around(:each, type: :system) do |ex|
    was_host = Rails.application.default_url_options[:host]
    Rails.application.default_url_options[:host] = Capybara.server_host
    ex.run
    Rails.application.default_url_options[:host] = was_host
  end

  config.prepend_before(:each, type: :system) do
    driven_by Capybara.javascript_driver
  end

  config.before(:suite) do
    Rails.application.load_tasks
    `yarn build`
    Rake::Task["tailwindcss:build"].execute
    Rake::Task["assets:precompile"].execute
  end

  config.after(:suite) do
    Rails.application.load_tasks
    Rake::Task["assets:clobber"].execute
  end
end
