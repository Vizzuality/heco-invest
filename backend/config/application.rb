require_relative "boot"

require "rails/all"

require "google/cloud/error_reporting/rails"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

# otherwise relative rails url root is not taken when running server using bin/rails s command
Dotenv::Railtie.load if Rails.env.development?

module Backend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    backend_url = URI.parse ENV.fetch("BACKEND_URL", "http://localhost:4000")
    Rails.application.routes.default_url_options = {
      host: backend_url.host,
      port: backend_url.port,
      protocol: backend_url.scheme
    }

    config.generators.test_framework = :rspec

    config.i18n.default_locale = :en
    config.i18n.available_locales = [:en, :es, :pt, :zu]
    config.i18n.fallbacks = [:en, :zu]
    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Use cloudtasker as the ActiveJob backend:
    # config.active_job.queue_adapter = :cloudtasker
  end
end
