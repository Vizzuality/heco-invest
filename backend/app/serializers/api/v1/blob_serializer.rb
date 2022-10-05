module API
  module V1
    module BlobSerializer
      extend ActiveSupport::Concern

      class_methods do
        def image_links_for(blob)
          {
            analyzed: blob.present? ? blob.analyzed?.present? : nil,
            small: Blobs::GetLink.new(blob, resize: "200x200").call,
            medium: Blobs::GetLink.new(blob, resize: "800x800").call,
            original: Blobs::GetLink.new(blob).call
          }
        end
      end
    end
  end
end
