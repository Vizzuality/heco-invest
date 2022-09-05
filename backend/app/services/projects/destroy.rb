module Projects
  class Destroy
    attr_accessor :project, :emails

    def initialize(project)
      @project = project
      @emails = []
    end

    def call
      collect_emails
      project.destroy!
      emails.map(&:deliver_later)
    end

    private

    def collect_emails
      ([project.project_developer] + project.involved_project_developers).each do |project_developer|
        emails << ProjectDeveloperMailer.project_destroyed(project_developer, project.name)
      end
      project.open_call_applications.each do |open_call_application|
        emails << InvestorMailer.project_destroyed(
          open_call_application.investor,
          project.name,
          open_call_application.open_call
        )
      end
    end
  end
end
