class LocationMember < ApplicationRecord
  belongs_to :location
  belongs_to :member, class_name: "Location"
end
