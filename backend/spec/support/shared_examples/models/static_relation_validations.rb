RSpec.shared_examples :static_relation_validations do |options|
  attribute = options.fetch(:attribute)
  is_array = options.fetch(:array, attribute.to_s.pluralize == attribute.to_s)

  it "should not be valid without #{attribute}" do
    subject.write_attribute(attribute, nil)
    expect(subject).to have(1).errors_on(attribute)
    if is_array
      subject.write_attribute(attribute, [])
      expect(subject).to have(1).errors_on(attribute)
    end
  end

  it "should not be valid with unknown #{attribute.to_s.singularize}" do
    value = is_array ? ["unknown"] : "unknown"
    subject.write_attribute(attribute, value)
    expect(subject).to have(1).errors_on(attribute)
  end
end
