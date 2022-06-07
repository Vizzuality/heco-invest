module ApplicationHelper
  include Pagy::Frontend
  include Ransack::Helpers::FormHelper

  STATUS_TAG_CLASSES = {
    "unverified" => "text-gray-800 bg-gray-800/20",
    "verified" => "text-green-dark bg-green-light/20"
  }

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
      class: "text-sm font-sans px-2 py-0.5 rounded-full #{STATUS_TAG_CLASSES[key.to_s]}"
    )
  end
end
