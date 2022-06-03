module ApplicationHelper
  include Pagy::Frontend
  include Ransack::Helpers::FormHelper

  def nav_link_to(text, path)
    is_active = current_page?(path)
    classnames = {
      "text-beige hover:text-green-light": true,
      "font-bold": is_active
    }.reject { |_k, v| v == false }.keys

    link_to text, path, class: classnames
  end
end
