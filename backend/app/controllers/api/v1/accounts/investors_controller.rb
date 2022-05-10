module API
  module V1
    module Accounts
      class InvestorsController < BaseController
        before_action :require_investor!, except: :create

        def create
          current_user.with_lock do
            raise API::UnprocessableEntityError, I18n.t("errors.messages.user.multiple_accounts") if current_user.account_id.present?

            account = Account.create! account_params.merge(owner: current_user)
            current_user.update! account: account, role: :investor
            investor = Investor.create! investor_params.merge(account: account)
            render json: InvestorSerializer.new(
              investor,
              params: {current_user: current_user}
            ).serializable_hash
          end
        end

        def update
          current_user.with_lock do
            current_user.account.update! account_params.except(:language)
            current_user.account.investor.update! investor_params.except(:language)
            render json: InvestorSerializer.new(
              current_user.account.investor,
              params: {current_user: current_user}
            ).serializable_hash
          end
        end

        def show
          render json: InvestorSerializer.new(
            current_user.account.investor,
            params: {current_user: current_user}
          ).serializable_hash
        end

        private

        def account_params
          params.permit :language, :picture, :name, :website, :linkedin, :facebook, :twitter, :instagram, :about, :contact_email, :contact_phone
        end

        def investor_params
          params.permit :language, :investor_type, :how_do_you_work, :what_makes_the_difference, :other_information,
            :previously_invested, :previously_invested_description, categories: [], ticket_sizes: [], instrument_types: [],
            impacts: [], sdgs: []
        end
      end
    end
  end
end
