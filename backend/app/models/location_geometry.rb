class LocationGeometry < ApplicationRecord
  belongs_to :location

  validates_presence_of :geometry

  scope :intersection_with, ->(geometry) { where(arel_table[:geometry].st_intersects(geometry)) }
  scope :of_type, ->(location_type) { joins(:location).where(locations: {location_type: location_type}) }
end
