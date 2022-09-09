# This is just for easy manual testing, not to be integrated - see CalculateProjectImpactScore
module Klab
  class Run
    def call
      started_at = Process.clock_gettime(Process::CLOCK_MONOTONIC)
      # TODO: transform project geometry to klab format, for now just a static example
      # colombia = "aries.heco.locations.colombia_continental"
      colombia_central = "τ0(1){ttype=LOGICAL,period=[1609459200000 1640995200000],tscope=1.0,tunit=YEAR}S2(934,631){bbox=[-75.2281407807369 -72.67107290964314 3.5641500380320963 5.302943221927137],shape=00000000030000000100000005C0522AF2DBCA0987400C8361185B1480C052CE99DBCA0987400C8361185B1480C052CE99DBCA098740153636BF7AE340C0522AF2DBCA098740153636BF7AE340C0522AF2DBCA0987400C8361185B1480,proj=EPSG:4326}"
      pp CalculateProjectImpactScore.new(colombia_central).call
      finished_at = Process.clock_gettime(Process::CLOCK_MONOTONIC)
      Rails.logger.debug("Elapsed: #{finished_at - started_at}")
    rescue Faraday::ServerError => e
      pp e
    end
  end
end
