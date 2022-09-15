class OpenCallApplication < ApplicationRecord
  belongs_to :open_call, counter_cache: true
  belongs_to :project

  validates_presence_of :message

  validates :funded, inclusion: [true, false]

  validates_uniqueness_of :open_call, scope: :project_id

  delegate :project_developer, :project_developer_id, to: :project
  delegate :investor, :investor_id, to: :open_call
end
