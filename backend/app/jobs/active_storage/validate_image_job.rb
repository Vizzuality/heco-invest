require "mini_magick"

module ActiveStorage
  class ValidateImageJob < ApplicationJob
    def perform(blob)
      blob.open do |tempfile|
        blob.update! validated: MiniMagick::Image.new(tempfile.path).valid?
      end
    end
  end
end
