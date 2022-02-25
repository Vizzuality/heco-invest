module StaticModel
  extend ActiveSupport::Concern

  included do
    attr_accessor :slug

    def initialize(slug:)
      @slug = slug
    end

    def name
      I18n.t(slug, scope: self.class.name.underscore)
    end

    alias_method :to_s, :name
  end

  class_methods do
    def all
      const_get(:TYPES).map { |slug| new(slug: slug) }
    end
  end
end
