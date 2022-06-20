RSpec.shared_examples "with csv export" do |file_name:|
  downloaded_file = File.join(Capybara.save_path, file_name)

  describe "CSV Export" do
    it "allows to export csv" do
      click_on t("backoffice.common.export_csv")
      sleep 1
      expect(File).to exist(downloaded_file)
      FileUtils.rm_rf downloaded_file
    end
  end
end
