class ChangesForProjects < ActiveRecord::Migration[7.0]
  def change
    add_reference :projects, :country, foreign_key: {to_table: :locations}, type: :uuid, null: false
    add_reference :projects, :department, foreign_key: {to_table: :locations}, type: :uuid, null: false
    add_reference :projects, :municipality, foreign_key: {to_table: :locations}, type: :uuid, null: false

    add_column :projects, :development_stage, :string, null: false
    add_column :projects, :estimated_duration_in_months, :integer, null: false
    add_column :projects, :expected_impact_en, :text
    add_column :projects, :expected_impact_es, :text
    add_column :projects, :expected_impact_pt, :text
    add_column :projects, :target_groups, :string, array: true, null: false
    add_column :projects, :impact_areas, :string, array: true, null: false
    add_column :projects, :looking_for_funding, :boolean, null: false, default: false
    add_column :projects, :involved_project_developer_not_listed, :boolean, null: false, default: false
    add_column :projects, :funding_plan_en, :text
    add_column :projects, :funding_plan_es, :text
    add_column :projects, :funding_plan_pt, :text
    add_column :projects, :replicability_en, :text
    add_column :projects, :replicability_es, :text
    add_column :projects, :replicability_pt, :text
    add_column :projects, :progress_impact_tracking_en, :text
    add_column :projects, :progress_impact_tracking_es, :text
    add_column :projects, :progress_impact_tracking_pt, :text
    add_column :projects, :received_funding_amount_usd, :decimal
    add_column :projects, :received_funding_investor, :text
    add_column :projects, :relevant_links_en, :text
    add_column :projects, :relevant_links_es, :text
    add_column :projects, :relevant_links_pt, :text

    remove_column :projects, :roi_en, :text
    remove_column :projects, :roi_es, :text
    remove_column :projects, :roi_pt, :text
    remove_column :projects, :number_of_partners, :integer
    remove_column :projects, :number_of_employees, :integer, null: false
    remove_column :projects, :number_of_employees_indigenous, :integer
    remove_column :projects, :number_of_employees_migrants, :integer
    remove_column :projects, :number_of_employees_young, :integer
    remove_column :projects, :number_of_employees_women, :integer
    remove_column :projects, :received_funding_description_en, :text
    remove_column :projects, :received_funding_description_es, :text
    remove_column :projects, :received_funding_description_pt, :text
    remove_column :projects, :income_in_last_3_years, :text, null: false
    remove_column :projects, :business_model_en, :text
    remove_column :projects, :business_model_es, :text
    remove_column :projects, :business_model_pt, :text
    remove_column :projects, :impact_description_en, :text
    remove_column :projects, :impact_description_es, :text
    remove_column :projects, :impact_description_pt, :text
    remove_column :projects, :other_information_en, :text
    remove_column :projects, :other_information_es, :text
    remove_column :projects, :other_information_pt, :text
  end
end
