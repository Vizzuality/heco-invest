class RecalculateProjectImpacts < ActiveRecord::Migration[7.0]
  def change
    Rake::Task["klab:recalculate_impacts"].execute if ENV["KLAB_ENABLED"].to_s == "true"
  end
end
