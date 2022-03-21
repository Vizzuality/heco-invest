class Location < ApplicationRecord
  belongs_to :parent, class_name: "Location", optional: true

  has_many :locations, class_name: "Location", foreign_key: "parent_id", dependent: :destroy

  validates :location_type, inclusion: {in: LocationType::TYPES}
  validates_presence_of :name

  translates :name
end
