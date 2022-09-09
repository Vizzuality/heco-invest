module Backoffice
  module FilterMemoization
    def self.included(base)
      base.before_action :save_filters, only: :index
      base.before_action :load_filters, only: :index
    end

    private

    def save_filters
      session[:table_filters] ||= {}
      session[:table_filters][controller_name] ||= {}
      session[:table_filters][controller_name]["page"] = params[:page] == "" ? nil : params[:page] unless params[:page].nil?
      session[:table_filters][controller_name]["q"] = params[:q] == "" ? nil : params[:q].to_unsafe_h unless params[:q].nil?
    end

    def load_filters
      params[:page] = session[:table_filters][controller_name]["page"]
      params[:q] = session[:table_filters][controller_name]["q"]
    end
  end
end
