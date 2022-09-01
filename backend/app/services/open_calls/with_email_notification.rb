module OpenCalls
  class WithEmailNotification
    attr_accessor :open_call, :emails

    def initialize(open_call)
      @open_call = open_call
      @emails = []
    end

    def destroy!
      collect_emails
      open_call.destroy!
      emails.map(&:deliver_later)
    end

    private

    def collect_emails
      emails << InvestorMailer.open_call_destroyed(open_call.investor, open_call.name)
      open_call.project_developers.each do |project_developer|
        emails << ProjectDeveloperMailer.open_call_destroyed(project_developer, open_call.name)
      end
    end
  end
end
