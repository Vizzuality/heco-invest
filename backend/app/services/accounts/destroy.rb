module Accounts
  class Destroy
    attr_accessor :account, :emails

    def initialize(account)
      @account = account
      @emails = []
    end

    def call
      collect_emails
      account.destroy!
      emails.map(&:deliver_later)
    end

    private

    def collect_emails
      account.users.each { |user| emails << UserMailer.destroyed(user.email, user.full_name, user.locale) }
      account.investor&.open_call_applications.to_a.each do |open_call_application|
        emails << ProjectDeveloperMailer.open_call_destroyed(open_call_application.project_developer, open_call_application.open_call.name)
      end
      account.project_developer&.open_call_applications.to_a.each do |open_call_application|
        emails << InvestorMailer.project_destroyed(open_call_application.investor, open_call_application.project.name)
      end
    end
  end
end
