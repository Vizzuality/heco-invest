namespace :transifex do
  desc "Pulling transifex translations and post processing"
  task :pull do
    puts "transifex_pull: Running TX client to pull translations"
    IO.popen("/usr/tx-cli/tx pull -f -a") { |p| p.each { |line| puts line } }
    puts "transifex_pull: Post-processing"
    Dir[Rails.root.join("config/locales/{en,es,pt}.yml")].each do |file|
      puts "transifex_pull: Cleaning up #{file} from empty strings"
      yaml = YAML.load(File.read(file))
      blank_values = proc do |k, v|
        v.delete_if(&blank_values) if v.is_a? Hash
        v.blank?
      end
      cleaned = yaml.delete_if(&blank_values)
      File.write(file, cleaned.to_yaml)
    end
    puts "transifex_pull: All done :)"
  end
end
