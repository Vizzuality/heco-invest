module API
  module V1
    module Accounts
      class InvestorsController < BaseController
        include API::Pagination

        before_action :require_investor!, except: %i[create favourites]
        around_action(only: %i[create]) { |_, action| set_locale(language: account_params[:language], &action) }
        around_action(only: %i[update]) { |_, action| set_locale(language: current_user&.account&.language, &action) }
        around_action(only: %i[show]) { |_, action| set_locale(fallback_language: current_user&.account&.language, &action) }
        load_and_authorize_resource only: :favourites

        def create
          current_user.with_lock do
            raise API::UnprocessableEntityError, I18n.t("errors.messages.user.multiple_accounts") if current_user.account_id.present?

            account = Account.create! account_params.merge(owner: current_user, users: [current_user])
            current_user.update! role: :investor
            investor = Investor.create! investor_params.merge(account: account)
            Admin.all.each { |admin| AdminMailer.investor_created(admin, investor).deliver_later }
            render json: InvestorSerializer.new(
              investor,
              params: {current_user: current_user, current_ability: current_ability}
            ).serializable_hash
          end
        end

        def update
          current_user.with_lock do
            current_user.account.update! account_params.except(:language)
            current_user.account.investor.update! investor_params.except(:language)
            render json: InvestorSerializer.new(
              current_user.account.investor,
              params: {current_user: current_user, current_ability: current_ability}
            ).serializable_hash
          end
        end

        def show
          render json: InvestorSerializer.new(
            current_user.account.investor,
            include: included_relationships,
            params: {current_user: current_user, current_ability: current_ability}
          ).serializable_hash
        end

        def favourites
          @investors = @investors.includes(account: [:owner, {picture_attachment: :blob}])
          pagy_object, @investors = pagy(@investors, page: current_page, items: per_page)
          render json: InvestorSerializer.new(
            @investors,
            include: included_relationships,
            fields: sparse_fieldset,
            links: pagination_links(:api_v1_investors_path, pagy_object),
            meta: pagination_meta(pagy_object),
            params: {current_user: current_user, current_ability: current_ability}
          ).serializable_hash
        end

        private

        def account_params
          params.permit :language, :picture, :name, :website, :linkedin, :facebook, :twitter, :instagram, :about, :contact_email, :contact_phone
        end

        def investor_params
          params.permit :investor_type, :mission, :prioritized_projects_description, :other_information,
            :previously_invested, categories: [], ticket_sizes: [], instrument_types: [], impacts: [], sdgs: []
        end
      end
    end
  end
end
