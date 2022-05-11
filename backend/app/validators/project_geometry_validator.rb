class ProjectGeometryValidator < ActiveModel::Validator
  def validate(project)
    @project = project

    run_validations
  end

  private

  def run_validations
    return if @project.geometry.blank? || !@project.geometry_changed?

    decoded_geometry = validate_geo_json
    validate_type_of decoded_geometry
  end

  def validate_geo_json
    geometry = @project.geometry.is_a?(String) ? @project.geometry : @project.geometry.to_json
    decoded_geometry, @project.geometry = geo_json_for geometry
    @project.errors.add :geometry, :not_geojson if decoded_geometry.blank?
    decoded_geometry
  rescue JSON::ParserError
    @project.errors.add :geometry, :not_json
    nil
  end

  def validate_type_of(geometry)
    return if geometry.blank?

    center = GeoJsons::CenterFinder.new(geometry).call
    @project.latitude, @project.longitude = [center.y, center.x]
  rescue GeoJsons::NoGeometry
    @project.errors.add :geometry, :missing_geometry
  rescue GeoJsons::NoSupportedGeometry
    @project.errors.add :geometry, :unsupported_geometry
  end

  def geo_json_for(geometry)
    decoded_geometry = RGeo::GeoJSON.decode geometry
    [decoded_geometry, RGeo::GeoJSON.encode(decoded_geometry)]
  end
end
