module ApplicationHelper
  include Pagy::Frontend
  include Ransack::Helpers::FormHelper

  STATUS_TAG_CLASSES = {
    "unapproved" => "text-gray-800 bg-gray-800/20",
    "approved" => "text-green-dark bg-green-light/20",
    "rejected" => "text-red-dark bg-red-dark/20",
    "unverified" => "text-gray-800 bg-gray-800/20",
    "verified" => "text-green-dark bg-green-light/20"
  }

  FLASH_CLASSES = {
    notice: "alert-success",
    success: "alert-success",
    info: "alert-info",
    error: "alert-danger",
    alert: "alert-danger"
  }.freeze

  def flash_class_for(type)
    FLASH_CLASSES.fetch(type.to_sym, type.to_s)
  end

  def nav_link_to(text, path)
    is_active = current_page?(path)
    classnames = {
      "text-beige hover:text-green-light": true,
      "font-bold": is_active
    }.reject { |_k, v| v == false }.keys

    link_to text, path, class: classnames
  end

  def section_link_to(text, section, default: false)
    is_active = (params[:section].blank? && default) || params[:section] == section.to_s
    classnames = {
      "text-black hover:text-gray-600": true,
      "text-green-dark": is_active
    }.reject { |_k, v| v == false }.keys

    link_to text, url_for(section: section), class: classnames
  end

  def localized_sort_link(q, key, *args, &block)
    sort_link q, "#{key}_#{I18n.locale}", *args, &block
  end

  def status_tag(key, text)
    return if text.blank?

    content_tag(
      :span,
      text,
      class: "text-sm font-sans px-2 py-1 rounded-full #{STATUS_TAG_CLASSES[key.to_s]}"
    )
  end

  def svg(filename, options = {})
    filepath = Rails.root.join("app", "assets", "images", "#{filename}.svg")

    if File.exist?(filepath)
      file = File.read(filepath)
      doc = Nokogiri::HTML::DocumentFragment.parse file
      svg = doc.at_css "svg"
      svg["class"] = options[:class] if options[:class].present?
    else
      doc = "<!-- SVG #{filename} not found -->"
    end

    raw doc
  end
end
