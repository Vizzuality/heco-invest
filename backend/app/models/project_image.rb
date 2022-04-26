class ProjectImage < ApplicationRecord
  belongs_to :project

  has_one_attached :file

  validates :file, attached: true, content_type: /\Aimage\/.*\z/, size: {less_than: 5.megabytes}
  validates :cover, inclusion: {in: [true, false]}

  after_save :keep_only_one_cover

  private

  def keep_only_one_cover
    return unless cover

    ProjectImage.where(project_id: project_id, cover: true).where.not(id: id).update_all cover: false
  end
end
