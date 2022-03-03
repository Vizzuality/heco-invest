require "rails_helper"

RSpec.describe "API V1 Locale Param", type: :request do
  let_it_be(:investor) {
    create(
      :investor,
      other_information_en: "Other Information en",
      other_information_es: nil,
      other_information_pt: nil,
      how_do_you_work_en: "How do you work en",
      how_do_you_work_es: "How do you work es",
      how_do_you_work_pt: "How do you work pt"
    )
  }

  context "no locale" do
    before(:each) { get "/api/v1/investors/#{investor.id}" }

    it "should return default locale" do
      expect(response).to have_http_status(:ok)
      expect(response_json["data"]["attributes"]["how_do_you_work"]).to eq("How do you work en")
    end
  end

  context "valid locale" do
    before(:each) { get "/api/v1/investors/#{investor.id}?locale=es" }

    it "should return attributes properly translated" do
      expect(response).to have_http_status(:ok)
      expect(response_json["data"]["attributes"]["how_do_you_work"]).to eq("How do you work es")
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
      expect(response_json["data"]["attributes"]["how_do_you_work"]).to eq("How do you work en")
    end
  end
end
