module ExtraRansackers
  extend ActiveSupport::Concern

  class_methods do
    def generate_ransackers_for_translated_columns(fallback = "#{table_name}.language", db_column: true)
      fallback = db_column ? fallback : "'#{fallback}'"

      translatable_attributes.each do |attribute|
        ransacker attribute do |parent|
          parent_table_name = parent.table.table_alias || table_name
          fallback_sql = (I18n.available_locales - [:zu]).map { |l| "when #{fallback} = '#{l}' then #{parent_table_name}.#{attribute}_#{l}" }.join(" ")
          Arel.sql("(case when #{parent_table_name}.#{attribute}_#{I18n.locale} <> '' then #{parent_table_name}.#{attribute}_#{I18n.locale} else (case #{fallback_sql} end) end)")
        end
      end
    end

    def generate_localized_ransackers_for_static_types(*types)
      types.each do |type|
        ransacker "#{type}_localized" do |parent|
          parent_table_name = parent.table.table_alias || table_name
          translated_type_sql = type.to_s.classify.constantize.all.inject("ARRAY[#{parent_table_name}.#{type}]::text[]") do |res, obj|
            "array_replace(#{res}, '#{obj.slug}', '#{obj.name}')"
          end
          Arel.sql("array_to_string(#{translated_type_sql}, ' ')")
        end
      end
    end

    def generate_localized_ransackers_for_enums(**enums)
      enums.each do |enum, klass|
        ransacker "#{enum}_localized" do |parent|
          parent_table_name = parent.table.table_alias || table_name
          translated_enum_sql = klass.all.map do |obj|
            "when #{parent_table_name}.#{enum} = #{obj.class::TYPES_WITH_CODE[obj.slug]} then '#{obj.name}'"
          end.join(" ")
          Arel.sql("(case #{translated_enum_sql} end)")
        end
      end
    end
  end
end
