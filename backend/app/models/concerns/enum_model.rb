module EnumModel
  extend ActiveSupport::Concern

  attr_reader :slug

  def initialize(slug:)
    @slug = slug
  end

  def name
    read_attribute("name")
  end
  alias_method :to_s, :name
  alias_method :id, :slug

  def read_attribute(name)
    I18n.t(name, scope: ["enums", translation_key, slug])
  end

  def translation_key
    self.class.name.underscore
  end

  class_methods do
    def all
      const_get(:TYPES).map { |slug| new(slug: slug) }
    end

    def find_many(slugs)
      Array.wrap(slugs).map { |s| find(s) }
    end

    def find(slug)
      new(slug: slug)
    end

    def select_index_sql(column_name = name.underscore)
      sql = ["CASE"]
      all.sort_by(&:name).each_with_index do |enum, index|
        sql << "WHEN #{column_name} ='#{enum.slug}' THEN #{index}"
      end
      sql << "END"
      sql.join(" ")
    end
  end
end
