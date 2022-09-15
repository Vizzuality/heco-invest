RSpec.shared_examples :translatable do
  include ActiveJob::TestHelper

  attribute = described_class.translatable_attributes.first
  factory = described_class.table_name.singularize

  describe "#translate" do
    let!(:resource) { create factory, language: "es" }

    before do
      resource.public_send "#{attribute}_en=", nil
      resource.public_send "#{attribute}_es=", "ES TEXT"
      resource.public_send "#{attribute}_pt=", "PT TEXT"
      resource.save!
    end

    it "fallbacks to default language" do
      I18n.with_locale("en") { expect(resource.public_send(attribute)).to eq("ES TEXT") }
      I18n.with_locale("es") { expect(resource.public_send(attribute)).to eq("ES TEXT") }
      I18n.with_locale("pt") { expect(resource.public_send(attribute)).to eq("PT TEXT") }
    end
  end

  describe "#translate_attributes" do
    let!(:resource) { create factory, skip_translation: true }

    context "when automatically translated column changes" do
      before do
        resource.skip_translation = false
        resource.public_send "#{attribute}_#{resource.language}=", "NEW TEXT"
      end

      it "queues translation job" do
        assert_enqueued_with job: TranslateJob, args: [resource, changed_attrs: [attribute]] do
          resource.save!
        end
      end
    end

    context "when different column changes" do
      before do
        resource.skip_translation = false
        resource.created_at = 10.days.from_now
      end

      it "does not queue translation job" do
        assert_no_enqueued_jobs only: TranslateJob do
          resource.save!
        end
      end
    end

    context "when automatic translation is turned off" do
      before do
        resource.public_send "#{attribute}_#{resource.language}=", "NEW TEXT"
      end

      it "does not queue translation job" do
        assert_no_enqueued_jobs only: TranslateJob do
          resource.save!
        end
      end
    end
  end
end
