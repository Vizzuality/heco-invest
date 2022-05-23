class LocationGeometry < ApplicationRecord
  belongs_to :location

  validates_presence_of :geometry
end
