module Projects
  class WithEmailNotification
    attr_accessor :project, :emails

    def initialize(project)
      @project = project
      @emails = []
    end

    def destroy!
      collect_emails
      project.destroy!
      emails.map(&:deliver_later)
    end

    private

    def collect_emails
      ([project.project_developer] + project.involved_project_developers).each do |project_developer|
        emails << ProjectDeveloperMailer.project_destroyed(project_developer, project.name)
      end
      project.investors.each { |investor| emails << InvestorMailer.project_destroyed(investor, project.name) }
    end
  end
end
