class Location < ApplicationRecord
  belongs_to :parent, class_name: "Location", optional: true

  has_many :locations, class_name: "Location", foreign_key: "parent_id", dependent: :destroy
  has_many :country_projects, class_name: "Project", foreign_key: "country_id", dependent: :destroy
  has_many :municipality_projects, class_name: "Project", foreign_key: "municipality_id", dependent: :destroy
  has_many :department_projects, class_name: "Project", foreign_key: "department_id", dependent: :destroy

  has_one :location_geometry, dependent: :destroy

  LocationType::TYPES.each do |location_type|
    scope location_type, -> { where(location_type: location_type) }
  end

  validates :location_type, inclusion: {in: LocationType::TYPES, allow_blank: true}, presence: true
  validates_presence_of :name

  validates_uniqueness_of :name_en, scope: :location_type, if: -> { parent_id.blank? }

  translates :name

  accepts_nested_attributes_for :location_geometry, reject_if: :all_blank, allow_destroy: true
end
