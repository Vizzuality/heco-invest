class OpenCallApplication < ApplicationRecord
  belongs_to :open_call, counter_cache: true
  belongs_to :project_developer
  belongs_to :project

  translates :message

  validates :language, inclusion: {in: Language::TYPES, allow_blank: true}, presence: true

  validates_presence_of :message
end
