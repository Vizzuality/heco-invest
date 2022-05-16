class Location < ApplicationRecord
  belongs_to :parent, class_name: "Location", optional: true

  has_many :locations, class_name: "Location", foreign_key: "parent_id", dependent: :destroy
  has_many :location_members, dependent: :destroy
  has_many :regions, -> { where(location_type: :region) }, through: :location_members, source: :member
  has_many :basins, -> { where(location_type: :basin) }, through: :location_members, source: :member

  has_many :country_projects, class_name: "Project", foreign_key: "country_id", dependent: :destroy
  has_many :municipality_projects, class_name: "Project", foreign_key: "municipality_id", dependent: :destroy
  has_many :department_projects, class_name: "Project", foreign_key: "department_id", dependent: :destroy

  LocationType::TYPES.each do |location_type|
    scope location_type, -> { where(location_type: location_type) }
  end

  validates :location_type, inclusion: {in: LocationType::TYPES}
  validates_presence_of :name

  translates :name
end
