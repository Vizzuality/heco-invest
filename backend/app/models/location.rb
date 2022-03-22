class Location < ApplicationRecord
  belongs_to :parent, class_name: "Location", optional: true

  has_many :locations, class_name: "Location", foreign_key: "parent_id", dependent: :destroy
  has_many :location_members, dependent: :destroy
  has_many :regions, through: :location_members, source: :member

  validates :location_type, inclusion: {in: LocationType::TYPES}
  validates_presence_of :name

  translates :name
end
