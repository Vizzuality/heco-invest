class RemoveTranslatedMessageFromOpenCallApplications < ActiveRecord::Migration[7.0]
  def change
    add_column :open_call_applications, :message, :text
    migrate_translated_messages!
    remove_columns :open_call_applications, :message_en, :message_es, :message_pt, :language
  end

  private

  def migrate_translated_messages!
    OpenCallApplication.all.each do |application|
      application.update! message: application.public_send("message_#{application.language}")
    end
  end
end
