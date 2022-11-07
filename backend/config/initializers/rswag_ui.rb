# frozen_string_literal: true

Rswag::Ui.configure do |c|
  c.swagger_endpoint "#{ENV["RAILS_RELATIVE_URL_ROOT"]}/api-docs/v1/swagger.yaml", "API V1 Docs"
  c.basic_auth_enabled = (ENV["HTTP_AUTH_USERNAME"].present? && ENV["HTTP_AUTH_PASSWORD"].present?)
  c.basic_auth_credentials ENV["HTTP_AUTH_USERNAME"], ENV["HTTP_AUTH_PASSWORD"]
end

# Monkey patch for Rswag basic authentication. The problem is caused by how the rswag basic auth checks
# whether it is on an rswag route in `env_matching_path` and how `RAILS_RELATIVE_URL_ROOT` ruins it:
# https://github.com/rswag/rswag/blob/master/rswag-ui/lib/rswag/ui/basic_auth.rb#L19

# This method determines whether or not to trigger basic auth. It does so by comparing the base path of the
# current request and the known swagger urls.
# First it tries to get the base path of the current request, for example the documentation index page:
# `/backend/api-docs/index.html`
# rack `PATH_INFO` is:
# `/api-docs/index.html`
# and so the base_path ends up as `api-docs`. Then it checks if that matches the base path of any swagger urls.
# What these urls look like depends on how we configure `swagger_endpoint`:
# - `v1/swagger.yaml`: base path is `swagger.yaml` (no match - no auth triggered), docs page works because relative urls are used
# - `/api-docs/v1/swagger.yaml`: base path matches, but docs page doesn't work, because absolute urls are used and they are missing the "/backend"
# - `/backend/api-docs/swagger.yaml`: base path matches with the help of the monkey patch below and docs page works

module Rswag
  module Ui
    # Extend Rack HTTP Basic Authentication, as per RFC 2617.
    # @api private
    #
    class BasicAuth < ::Rack::Auth::Basic
      private

      # for reference - this method not changed
      # def env_matching_path(env)
      #   path = base_path(env['PATH_INFO'])
      #   Rswag::Ui.config.config_object[:urls].find do |endpoint|
      #     base_path(endpoint[:url]) == path
      #   end
      # end

      # for eference - this method overriden below
      # def base_path(url)
      #   url.downcase.split('/')[1]
      # end

      def base_path(url)
        url.downcase.sub(/^#{ENV["RAILS_RELATIVE_URL_ROOT"]}/, "").split("/")[1]
      end
    end
  end
end
