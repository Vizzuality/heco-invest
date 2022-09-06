module OpenCalls
  class Destroy
    attr_accessor :open_call, :emails

    def initialize(open_call)
      @open_call = open_call
      @emails = []
    end

    def call
      collect_emails
      open_call.destroy!
      emails.map(&:deliver_later)
    end

    private

    def collect_emails
      emails << InvestorMailer.open_call_destroyed(open_call.investor, open_call.name)
      open_call.open_call_applications.each do |open_call_application|
        emails << ProjectDeveloperMailer.open_call_destroyed(
          open_call_application.project_developer,
          open_call_application.project,
          open_call_application.open_call.name
        )
      end
    end
  end
end
