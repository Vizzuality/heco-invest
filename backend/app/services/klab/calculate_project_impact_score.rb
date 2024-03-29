module Klab
  class CalculateProjectImpactScore
    ImpactScoreStruct = Struct.new(:biodiversity, :climate, :community, :water)

    # @param geometry [String] geometry in format recognised by ARIES
    def initialize(geometry: nil, urn: nil)
      @geometry = geometry
      @urn = urn
      @client = Klab::APIClient.new
    end

    def call
      started_at = Process.clock_gettime(Process::CLOCK_MONOTONIC)
      result = get_result_from_api
      finished_at = Process.clock_gettime(Process::CLOCK_MONOTONIC)
      Rails.logger.debug("Elapsed: #{finished_at - started_at}")
      result
    end

    private

    def get_result_from_api
      context_resp = Klab::SubmitContext.new(@client).call(geometry: @geometry, urn: @urn)
      ticket_resp = Klab::PollTicket.new(@client).call(context_resp.ticket_id, async: false)
      result = ImpactScoreStruct.new
      ticket_resp.artifacts_ids.each do |artifact_id|
        Rails.logger.debug "Exporting observable #{artifact_id}"
        export_resp = ExportArtifact.new(@client).call(artifact_id)
        artifact_code = Klab::SubmitContext::Request::INDICATORS.invert[export_resp.observable]
        result.send("#{artifact_code}=", export_resp.demand) if artifact_code.present?
      end
      result
    rescue Faraday::ServerError => e
      Google::Cloud::ErrorReporting.report e
      raise e
    end
  end
end
