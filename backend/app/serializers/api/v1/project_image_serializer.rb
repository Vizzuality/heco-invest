module API
  module V1
    class ProjectImageSerializer
      include JSONAPI::Serializer
      include BlobSerializer

      attributes :is_cover

      attribute :file do |object|
        image_links_for object.file
      end
    end
  end
end
