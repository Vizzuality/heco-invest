require "rails_helper"

RSpec.describe "API V1 Locale Param", type: :request do
  let_it_be(:investor) {
    create(
      :investor,
      account: create(:account, language: "pt"),
      other_information_en: nil,
      other_information_es: nil,
      other_information_pt: "Other Information pt",
      mission_en: "Mission en",
      mission_es: "Mission es",
      mission_pt: "Mission pt"
    )
  }

  context "no locale" do
    before(:each) { get "/api/v1/investors/#{investor.id}" }

    it "should return account locale" do
      expect(response).to have_http_status(:ok)
      expect(response_json["data"]["attributes"]["mission"]).to eq("Mission pt")
    end
  end

  context "valid locale" do
    before(:each) { get "/api/v1/investors/#{investor.id}?locale=es" }

    it "should return attributes properly translated" do
      expect(response).to have_http_status(:ok)
      expect(response_json["data"]["attributes"]["mission"]).to eq("Mission es")
    end

    it "attribute without translations fallback to default record language" do
      expect(response).to have_http_status(:ok)
      expect(response_json["data"]["attributes"]["other_information"]).to eq("Other Information pt")
    end
  end

  context "invalid locale" do
    before(:each) { get "/api/v1/investors/#{investor.id}?locale=invalid" }

    it "should return account locale" do
      expect(response).to have_http_status(:ok)
      expect(response_json["data"]["attributes"]["mission"]).to eq("Mission pt")
    end
  end
end
