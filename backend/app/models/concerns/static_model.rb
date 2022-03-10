module StaticModel
  extend ActiveSupport::Concern

  attr_accessor :slug

  def initialize(slug:)
    @slug = slug
  end

  def name
    I18n.t("name", scope: ["enums", translation_key, slug])
  end
  alias_method :to_s, :name

  def translation_key
    self.class.name.underscore
  end

  class_methods do
    def all
      const_get(:TYPES).map { |slug| new(slug: slug) }
    end
  end
end
