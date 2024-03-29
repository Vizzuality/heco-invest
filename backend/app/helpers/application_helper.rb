module ApplicationHelper
  include Pagy::Frontend
  include Ransack::Helpers::FormHelper

  STATUS_TAG_CLASSES = {
    "unapproved" => "text-gray-800 bg-gray-800/20",
    "approved" => "text-green-dark bg-green-light/20",
    "rejected" => "text-red-dark bg-red-dark/20",
    "unverified" => "text-gray-800 bg-gray-800/20",
    "verified" => "text-green-dark bg-green-light/20",
    "draft" => "text-gray-800 bg-gray-800/20",
    "published" => "text-green-dark bg-green-light/20",
    "launched" => "text-green-dark bg-green-light/20",
    "closed" => "text-red-dark bg-red-dark/20"
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

  def section_link_to(text, url, section, default: false)
    is_active = (params[:section].blank? && default) || params[:section] == section.to_s
    classnames = {
      "text-black hover:text-gray-600": true,
      "text-green-dark": is_active
    }.reject { |_k, v| v == false }.keys

    link_to text, "#{url}?section=#{section}", class: classnames
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

  def localized_input(f, field_name, lang, **options)
    options[:input_html] ||= {}
    options[:input_html][:value] ||= f.object.public_send(field_name, locale: lang)

    f.input field_name, options
  end

  def account_link_for(record)
    return if record.blank?
    return link_to record.name, edit_backoffice_project_developer_path(record.project_developer), class: "link-button" if record.project_developer_id.present?

    link_to record.name, edit_backoffice_investor_path(record.investor), class: "link-button" if record.investor_id.present?
  end
end
