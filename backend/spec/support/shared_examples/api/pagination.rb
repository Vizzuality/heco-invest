RSpec.shared_examples :api_pagination do |model:, expected_total:|
  context "Pagination" do
    let(:route_key) { model.model_name.route_key }
    let(:page_size) { 3 }

    it "Show list for first page with per pege param" do
      get "/api/v1/#{route_key}?page[number]=1&page[size]=#{page_size}"

      expect(response).to have_http_status(:ok)
      expect(response_json["data"].size).to eq(3)
      expect(response_json["meta"]["page"]).to eq(1)
      expect(response_json["meta"]["per_page"]).to eq(3)
      expect(response_json["meta"]["from"]).to eq(1)
      expect(response_json["meta"]["to"]).to eq(3)
      expect(response_json["meta"]["total"]).to eq(expected_total)
      expect(response_json["meta"]["pages"]).to eq((expected_total / page_size.to_f).ceil)
    end

    it "Show list second page with per pege param" do
      get "/api/v1/#{route_key}?page[number]=2&page[size]=#{page_size}"

      expect(response).to have_http_status(:ok)
      expect(response_json["data"].size).to eq(3)
      expect(response_json["meta"]["page"]).to eq(2)
      expect(response_json["meta"]["per_page"]).to eq(3)
      expect(response_json["meta"]["from"]).to eq(4)
      expect(response_json["meta"]["to"]).to eq(6)
      expect(response_json["meta"]["total"]).to eq(expected_total)
      expect(response_json["meta"]["pages"]).to eq((expected_total / page_size.to_f).ceil)
    end
  end
end
