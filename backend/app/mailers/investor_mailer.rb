class InvestorMailer < ApplicationMailer
  def open_call_destroyed(investor, open_call_name)
    @user = investor.owner
    @open_call_name = open_call_name

    I18n.with_locale investor.account_language do
      mail to: @user.email
    end
  end
end
