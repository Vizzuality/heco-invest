module Klab
  class CalculateProjectImpactScore
    ImpactScoreStruct = Struct.new(:biodiversity, :climate, :community, :water)

    INDICATORS = {
      biodiversity: "im:Indicator (value of ecology:Biodiversity)",
      climate: "im:Indicator (value of ecology:Ecosystem for es:ClimateRegulation)",
      community: "im:Indicator (es.nca:Condition of demography:Human demography:Community)",
      water: "im:Indicator (es.nca:Condition of earth:Aquatic ecology:Ecosystem)"
    }.freeze

    def self.observable_names
      INDICATORS.values
    end

    # @param geometry [String] geometry in format recognised by ARIES
    def initialize(geometry)
      @geometry = geometry
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
      context_resp = Klab::SubmitContext.new(@client).call(@geometry)
      ticket_resp = Klab::PollTicket.new(@client).call(context_resp.ticket_id)
      result = ImpactScoreStruct.new
      ticket_resp.artifacts_ids.each.with_index do |artifact_id, idx|
        Rails.logger.debug "Exporting observable #{artifact_id}"
        export_resp = ExportArtifact.new(@client).call(artifact_id)
        artifact_code = INDICATORS.keys[idx]
        result.send("#{artifact_code}=", export_resp.summary["mean"]) if artifact_code.present?
      end
      result
    rescue Faraday::ServerError => e
      Google::Cloud::ErrorReporting.report e
      raise e
    end
  end
end
