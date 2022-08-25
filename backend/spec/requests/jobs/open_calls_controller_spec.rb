require "swagger_helper"

RSpec.describe "Jobs Open Call", type: :request do
  path "/jobs/open_calls/close_past_deadline" do
    post "Close open calls past deadline" do
      tags "Jobs"

      let!(:already_closed_open_call) { create :open_call, status: :closed }
      let!(:past_deadline_open_call) { create :open_call, status: :launched, closing_at: 9.days.from_now }
      let!(:launched_open_call) { create :open_call, status: :launched, closing_at: 11.day.from_now }

      response "204", :success do
        it "returns correct response" do |example|
          submit_request example.metadata
          assert_response_matches_metadata example.metadata
        end

        it "closes only past deadline open calls" do |example|
          travel_to 10.days.from_now do
            submit_request example.metadata

            already_closed_open_call.reload
            past_deadline_open_call.reload
            launched_open_call.reload

            expect(already_closed_open_call.closing_at).to be_within(5.seconds).of(10.days.ago)
            expect(already_closed_open_call).to be_closed
            expect(past_deadline_open_call.closing_at).to be_within(5.seconds).of(1.day.ago)
            expect(past_deadline_open_call).to be_closed
            expect(launched_open_call.closing_at).to be_within(5.seconds).of(1.day.from_now)
            expect(launched_open_call).to be_launched
          end
        end
      end
    end
  end
end
