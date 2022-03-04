module API
  module SparseFieldset
    def sparse_fieldset
      (params[:fields]&.to_unsafe_h || {}).transform_values { |v| v.split(",") }
    end
  end
end
