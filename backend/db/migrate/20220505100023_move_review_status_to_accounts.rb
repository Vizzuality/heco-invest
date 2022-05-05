class MoveReviewStatusToAccounts < ActiveRecord::Migration[7.0]
  def change
    add_review_columns_to_account!
    migrate_old_date!
    remove_review_columns_from_project_developer!
    remove_review_columns_from_investor!
  end

  private

  def add_review_columns_to_account!
    add_column :accounts, :review_status, :integer, null: false, default: 0
    add_column :accounts, :reviewed_at, :datetime
    add_column :accounts, :review_message, :text
  end

  def migrate_old_date!
    (ProjectDeveloper.all + Investor.all).each do |record|
      record.account.update! review_status: record.review_status,
        reviewed_at: record.reviewed_at,
        review_message: record.review_message
    end
  end

  def remove_review_columns_from_project_developer!
    remove_column :project_developers, :review_status
    remove_column :project_developers, :reviewed_at
    remove_column :project_developers, :review_message
  end

  def remove_review_columns_from_investor!
    remove_column :investors, :review_status
    remove_column :investors, :reviewed_at
    remove_column :investors, :review_message
  end
end
