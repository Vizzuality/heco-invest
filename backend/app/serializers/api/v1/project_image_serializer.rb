module API
  module V1
    class ProjectImageSerializer < BaseSerializer
      include BlobSerializer

      attributes :cover, :created_at

      attribute :file do |object|
        image_links_for object.file
      end
    end
  end
end
