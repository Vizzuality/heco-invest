class RecalculateProjectImpacts < ActiveRecord::Migration[7.0]
  def change
    Rake::Task["klab:recalculate_impacts"].execute
  end
end
