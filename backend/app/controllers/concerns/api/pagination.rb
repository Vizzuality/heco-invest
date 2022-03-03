module API
  module Pagination
    include Pagy::Backend

    def pagination_links(path, pagy_meta)
      links = {}
      links[:first] = send(path, page: {size: per_page})
      links[:prev] = send(path, page: {number: current_page - 1, size: per_page}) unless pagy_meta.page == 1
      links[:self] = send(path, page: {number: current_page, size: per_page})
      links[:next] = send(path, page: {number: current_page + 1, size: per_page}) unless pagy_meta.page == pagy_meta.last
      links[:last] = send(path, page: {number: pagy_meta.pages, size: per_page})
      links
    end

    def pagination_meta(pagy_meta)
      {
        page: current_page,
        per_page: per_page,
        from: pagy_meta.from,
        to: pagy_meta.to,
        total: pagy_meta.count,
        pages: pagy_meta.pages
      }
    end

    def current_page
      (params[:page]&.dig(:number) || 1).to_i
    end

    def per_page
      (params[:page]&.dig(:size) || 10).to_i
    end
  end
end
