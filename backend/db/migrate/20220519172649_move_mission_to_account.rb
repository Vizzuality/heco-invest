class MoveMissionToAccount < ActiveRecord::Migration[7.0]
  def up
    [:en, :es, :pt].each do |lng|
      add_column :accounts, "mission_#{lng}", :text
    end

    [:investors, :project_developers].each do |table|
      update_stmt = <<~SQL
        UPDATE accounts
        SET
          mission_en = #{table}.mission_en,
          mission_es = #{table}.mission_es,
          mission_pt = #{table}.mission_pt
        FROM #{table} WHERE #{table}.account_id = accounts.id
      SQL
      execute update_stmt
    end

    [:en, :es, :pt].each do |lng|
      remove_column :investors, "mission_#{lng}", :text
      remove_column :project_developers, "mission_#{lng}", :text
    end
  end

  def down
    [:en, :es, :pt].each do |lng|
      add_column :investors, "mission_#{lng}", :text
      add_column :project_developers, "mission_#{lng}", :text
    end

    [:investors, :project_developers].each do |table|
      update_stmt = <<~SQL
        UPDATE #{table}
        SET
          mission_en = accounts.mission_en,
          mission_es = accounts.mission_es,
          mission_pt = accounts.mission_pt
        FROM accounts WHERE #{table}.account_id = accounts.id
      SQL
      execute update_stmt
    end

    [:en, :es, :pt].each do |lng|
      remove_column :accounts, "mission_#{lng}", :text
    end
  end
end
