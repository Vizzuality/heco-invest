# This is just for easy manual testing, not to be integrated - see CalculateProjectImpactScore
module Klab
  class Run
    def call
      started_at = Process.clock_gettime(Process::CLOCK_MONOTONIC)
      # Examples how context_string can look like and how it can be build
      urn = nil # "aries.heco.locations.colombia_continental"
      context_string = "τ0(1){ttype=LOGICAL,period=[1640995200000 1672531200000],tscope=1.0,tunit=YEAR}S2(520,297){bbox=[-7.256596802202454 -4.408874148363334 38.39721372248553 40.02677860935444],shape=00000000030000000100000007C01D06C14FE6DEF24043B5F39D8BB550C0160A7B8B2DC6224044036D7B41B470C011A2AFE79D99FB4043B5C0443B5A7CC014D2EFCFADC624404355FA189A597CC0199C599EE6C5B8404332D7E635CC84C01C3D49F12A6BC440437995016B4E6CC01D06C14FE6DEF24043B5F39D8BB550,proj=EPSG:4326}"
      # context_string = Klab::BuildContextString.new(Project.last, "project").call
      pp CalculateProjectImpactScore.new(geometry: context_string, urn: urn).call
      finished_at = Process.clock_gettime(Process::CLOCK_MONOTONIC)
      Rails.logger.debug("Elapsed: #{finished_at - started_at}")
    rescue Faraday::ServerError => e
      pp e
    end
  end
end
