require "rails_helper"

class DummyJob < ApplicationJob
  def perform(argument)
  end
end

class DummyWithExceptionJob < ApplicationJob
  def perform(argument)
    raise StandardError, "This is error!"
  end
end

RSpec.describe ApplicationJob do
  describe "stores monitoring events" do
    let(:background_job_event) { BackgroundJobEvent.last }

    context "when job is enqueued" do
      before { DummyJob.perform_later("argument") }

      it "stores monitoring event" do
        expect(background_job_event.status).to eq("enqueued")
        expect(background_job_event.arguments).to eq(["argument"])
        expect(background_job_event.queue_name).to eq("default")
        expect(background_job_event.priority).to be_nil
        expect(background_job_event.executions).to eq(0)
        expect(background_job_event.message).to be_nil
      end
    end

    context "when job is completed" do
      before { DummyJob.perform_now("argument") }

      it "stores monitoring event" do
        expect(background_job_event.status).to eq("completed")
        expect(background_job_event.arguments).to eq(["argument"])
        expect(background_job_event.queue_name).to eq("default")
        expect(background_job_event.priority).to be_nil
        expect(background_job_event.executions).to eq(1)
        expect(background_job_event.message).to be_nil
      end
    end

    context "when job fails with exception" do
      it "stores monitoring event" do
        expect { DummyWithExceptionJob.perform_now("argument") }.to raise_error(StandardError, "This is error!")
        expect(background_job_event.status).to eq("crashed")
        expect(background_job_event.arguments).to eq(["argument"])
        expect(background_job_event.queue_name).to eq("default")
        expect(background_job_event.priority).to be_nil
        expect(background_job_event.executions).to eq(1)
        expect(background_job_event.message).not_to be_nil
      end
    end

    context "when multiple jobs is triggered" do
      before do
        DummyJob.perform_now("argument")
        DummyJob.perform_now("argument")
      end

      it "stores correct number of events" do
        expect(BackgroundJobEvent.count).to eq(2)
      end
    end
  end
end
