class AddFinancialAndClimateChangeDataToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :positive_financial_returns_en, :text, null: true
    add_column :projects, :positive_financial_returns_es, :text, null: true
    add_column :projects, :positive_financial_returns_pt, :text, null: true
    add_column :projects, :last_year_sales_revenue_en, :text, null: true
    add_column :projects, :last_year_sales_revenue_es, :text, null: true
    add_column :projects, :last_year_sales_revenue_pt, :text, null: true
    add_column :projects, :climate_change_risks_details_en, :text, null: true
    add_column :projects, :climate_change_risks_details_es, :text, null: true
    add_column :projects, :climate_change_risks_details_pt, :text, null: true
    add_column :projects, :climate_change_risks_identified, :boolean, default: false
  end
end
