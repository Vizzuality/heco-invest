require "spec_helper"
ENV["RAILS_ENV"] ||= "test"
require File.expand_path("../config/environment", __dir__)
# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
require "rspec/rails"

require "test_prof/recipes/rspec/before_all"
require "test_prof/recipes/rspec/let_it_be"

require "super_diff/rspec-rails"

Dir[Rails.root.join("spec", "support", "**", "*.rb")].sort.each { |f| require f }

begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  puts e.to_s.strip
  exit 1
end

RSpec.configure do |config|
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.request_snapshots_dir = "spec/fixtures/snapshots"
  # adding dynamic attributes for snapshots, small medium original are for active storage links
  config.request_snapshots_dynamic_attributes = %w[id created_at updated_at small medium original]

  config.include ActiveSupport::Testing::TimeHelpers
  config.include FactoryBot::Syntax::Methods
  config.include Rails.application.routes.url_helpers, type: :request
  config.include RequestHelpers, type: :request
  config.include Devise::Test::IntegrationHelpers, type: :request
  config.include Warden::Test::Helpers

  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!

  config.after do
    # Clear ActiveJob jobs
    if defined?(ActiveJob) && ActiveJob::QueueAdapters::TestAdapter == ActiveJob::Base.queue_adapter
      ActiveJob::Base.queue_adapter.enqueued_jobs.clear
      ActiveJob::Base.queue_adapter.performed_jobs.clear
    end
  end

  config.before :each, jobs_routes: true do |_example|
    stub_const("ENV", {"JOBS_INSTANCE" => true})
    Backend::Application.reload_routes!
  end

  config.after :each, jobs_routes: true do |_example|
    stub_const("ENV", {"JOBS_INSTANCE" => false})
    Backend::Application.reload_routes!
  end
end
