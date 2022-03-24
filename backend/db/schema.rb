# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_03_24_100316) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "name", null: false
    t.text "slug", null: false
    t.text "about_en"
    t.text "about_es"
    t.text "about_pt"
    t.text "website"
    t.text "linkedin"
    t.text "facebook"
    t.text "twitter"
    t.text "instagram"
    t.string "language", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_accounts_on_name", unique: true
    t.index ["slug"], name: "index_accounts_on_slug", unique: true
  end

  create_table "active_storage_attachments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.uuid "record_id", null: false
    t.uuid "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_type", "sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id"
  end

  create_table "investors", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "account_id", null: false
    t.string "investor_type", null: false
    t.string "categories", array: true
    t.string "ticket_sizes", array: true
    t.string "instrument_types", array: true
    t.string "impacts", array: true
    t.integer "sdgs", array: true
    t.text "how_do_you_work_en"
    t.text "how_do_you_work_es"
    t.text "how_do_you_work_pt"
    t.text "what_makes_the_difference_en"
    t.text "what_makes_the_difference_es"
    t.text "what_makes_the_difference_pt"
    t.text "other_information_en"
    t.text "other_information_es"
    t.text "other_information_pt"
    t.boolean "previously_invested", default: false, null: false
    t.text "previously_invested_description_en"
    t.text "previously_invested_description_es"
    t.text "previously_invested_description_pt"
    t.integer "review_status", default: 0, null: false
    t.datetime "reviewed_at"
    t.text "review_message"
    t.string "language", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_investors_on_account_id"
  end

  create_table "location_members", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "location_id", null: false
    t.uuid "member_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_id", "member_id"], name: "index_location_members_on_location_id_and_member_id", unique: true
    t.index ["location_id"], name: "index_location_members_on_location_id"
    t.index ["member_id"], name: "index_location_members_on_member_id"
  end

  create_table "locations", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "parent_id"
    t.string "location_type", null: false
    t.text "name_en"
    t.text "name_es"
    t.text "name_pt"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_type", "name_en"], name: "uniq_name_en_without_parent_id", unique: true, where: "(parent_id IS NULL)"
    t.index ["location_type", "name_es"], name: "uniq_name_es_without_parent_id", unique: true, where: "(parent_id IS NULL)"
    t.index ["location_type", "name_pt"], name: "uniq_name_pt_without_parent_id", unique: true, where: "(parent_id IS NULL)"
    t.index ["location_type", "parent_id", "name_en"], name: "uniq_name_en_with_parent_id", unique: true, where: "(parent_id IS NOT NULL)"
    t.index ["location_type", "parent_id", "name_es"], name: "uniq_name_es_with_parent_id", unique: true, where: "(parent_id IS NOT NULL)"
    t.index ["location_type", "parent_id", "name_pt"], name: "uniq_name_pt_with_parent_id", unique: true, where: "(parent_id IS NOT NULL)"
    t.index ["parent_id"], name: "index_locations_on_parent_id"
  end

  create_table "open_calls", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "investor_id", null: false
    t.text "name_en"
    t.text "name_es"
    t.text "name_pt"
    t.text "slug"
    t.text "description_en"
    t.text "description_es"
    t.text "description_pt"
    t.text "money_distribution_en"
    t.text "money_distribution_es"
    t.text "money_distribution_pt"
    t.text "impact_description_en"
    t.text "impact_description_es"
    t.text "impact_description_pt"
    t.boolean "trusted", default: false, null: false
    t.string "ticket_size", null: false
    t.string "instrument_type", null: false
    t.integer "sdgs", array: true
    t.string "language", null: false
    t.datetime "closing_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["investor_id", "name_en"], name: "index_open_calls_on_investor_id_and_name_en", unique: true
    t.index ["investor_id", "name_es"], name: "index_open_calls_on_investor_id_and_name_es", unique: true
    t.index ["investor_id", "name_pt"], name: "index_open_calls_on_investor_id_and_name_pt", unique: true
    t.index ["investor_id"], name: "index_open_calls_on_investor_id"
    t.index ["slug"], name: "index_open_calls_on_slug", unique: true
  end

  create_table "project_developer_locations", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "location_id", null: false
    t.uuid "project_developer_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_id", "project_developer_id"], name: "uniq_index_project_developer_id_on_location_id", unique: true
    t.index ["location_id"], name: "index_project_developer_locations_on_location_id"
    t.index ["project_developer_id"], name: "index_project_developer_locations_on_project_developer_id"
  end

  create_table "project_developers", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "account_id", null: false
    t.string "project_developer_type", null: false
    t.string "categories", array: true
    t.string "impacts", array: true
    t.text "mission_en"
    t.text "mission_es"
    t.text "mission_pt"
    t.integer "review_status", default: 0, null: false
    t.datetime "reviewed_at"
    t.text "review_message"
    t.string "language", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "entity_legal_registration_number", null: false
    t.index ["account_id"], name: "index_project_developers_on_account_id"
  end

  create_table "projects", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "project_developer_id", null: false
    t.text "name_en"
    t.text "name_es"
    t.text "name_pt"
    t.text "slug", null: false
    t.integer "status", default: 0, null: false
    t.decimal "latitude", precision: 10, scale: 6
    t.decimal "longitude", precision: 10, scale: 6
    t.text "address"
    t.string "categories", array: true
    t.string "ticket_size", null: false
    t.string "instrument_types", null: false, array: true
    t.integer "sdgs", array: true
    t.integer "number_of_partners"
    t.integer "number_of_employees", null: false
    t.integer "number_of_employees_women"
    t.integer "number_of_employees_young"
    t.integer "number_of_employees_indigenous"
    t.integer "number_of_employees_migrants"
    t.boolean "received_funding", null: false
    t.text "received_funding_description_en"
    t.text "received_funding_description_es"
    t.text "received_funding_description_pt"
    t.text "income_in_last_3_years", null: false
    t.text "description_en"
    t.text "description_es"
    t.text "description_pt"
    t.text "problem_en"
    t.text "problem_es"
    t.text "problem_pt"
    t.text "solution_en"
    t.text "solution_es"
    t.text "solution_pt"
    t.text "business_model_en"
    t.text "business_model_es"
    t.text "business_model_pt"
    t.text "roi_en"
    t.text "roi_es"
    t.text "roi_pt"
    t.text "sustainability_en"
    t.text "sustainability_es"
    t.text "sustainability_pt"
    t.text "impact_description_en"
    t.text "impact_description_es"
    t.text "impact_description_pt"
    t.text "other_information_en"
    t.text "other_information_es"
    t.text "other_information_pt"
    t.boolean "trusted", default: false, null: false
    t.text "website"
    t.text "linkedin"
    t.text "facebook"
    t.text "twitter"
    t.text "instagram"
    t.string "language", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_developer_id", "name_en"], name: "index_projects_on_project_developer_id_and_name_en", unique: true
    t.index ["project_developer_id", "name_es"], name: "index_projects_on_project_developer_id_and_name_es", unique: true
    t.index ["project_developer_id", "name_pt"], name: "index_projects_on_project_developer_id_and_name_pt", unique: true
    t.index ["project_developer_id"], name: "index_projects_on_project_developer_id"
    t.index ["slug"], name: "index_projects_on_slug", unique: true
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "account_id"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "ui_language", null: false
    t.integer "role", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_users_on_account_id"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "investors", "accounts", on_delete: :cascade
  add_foreign_key "location_members", "locations", column: "member_id", on_delete: :cascade
  add_foreign_key "location_members", "locations", on_delete: :cascade
  add_foreign_key "locations", "locations", column: "parent_id", on_delete: :cascade
  add_foreign_key "open_calls", "investors", on_delete: :cascade
  add_foreign_key "project_developer_locations", "locations", on_delete: :cascade
  add_foreign_key "project_developer_locations", "project_developers", on_delete: :cascade
  add_foreign_key "project_developers", "accounts", on_delete: :cascade
  add_foreign_key "projects", "project_developers", on_delete: :cascade
  add_foreign_key "users", "accounts", on_delete: :cascade
end
