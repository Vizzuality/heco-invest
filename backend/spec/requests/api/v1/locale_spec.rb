require "rails_helper"

RSpec.describe "API V1 Locale Param", type: :request do
  let_it_be(:investor) {
    create(
      :investor,
      other_information_en: "Other Information en",
      other_information_es: nil,
      other_information_pt: nil,
      prioritized_projects_description_en: "Prioritised projects en",
      prioritized_projects_description_es: "Prioritised projects es",
      prioritized_projects_description_pt: "Prioritised projects pt"
    )
  }

  context "no locale" do
    before(:each) { get "/api/v1/investors/#{investor.id}" }

    it "should return default locale" do
      expect(response).to have_http_status(:ok)
      expect(response_json["data"]["attributes"]["prioritized_projects_description"]).to eq("Prioritised projects en")
    end
  end

  context "valid locale" do
    before(:each) { get "/api/v1/investors/#{investor.id}?locale=es" }

    it "should return attributes properly translated" do
      expect(response).to have_http_status(:ok)
      expect(response_json["data"]["attributes"]["prioritized_projects_description"]).to eq("Prioritised projects es")
    end

    it "attribute without translations fallback to default locale" do
      expect(response).to have_http_status(:ok)
      expect(response_json["data"]["attributes"]["other_information"]).to eq("Other Information en")
    end
  end

  context "invalid locale" do
    before(:each) { get "/api/v1/investors/#{investor.id}?locale=invalid" }

    it "should return default locale" do
      expect(response).to have_http_status(:ok)
      expect(response_json["data"]["attributes"]["prioritized_projects_description"]).to eq("Prioritised projects en")
    end
  end
end
