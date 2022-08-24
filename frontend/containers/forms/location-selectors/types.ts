import {
  Control,
  FieldErrors,
  FieldPath,
  Path,
  UseControllerProps,
  UseFormGetValues,
  UseFormResetField,
} from 'react-hook-form';

export type LocationSelectorsTypes<FormValues> = {
  /** React-hook-form useForm formState errors */
  errors: FieldErrors<FormValues>;
  /** React-hook-form useForm control */
  control: Control<FormValues, FieldPath<FormValues>>;
  /** React-hook-form useForm resetField */
  resetField?: UseFormResetField<FormValues>;
  /** React-hook-form useForm getValues */
  getValues: UseFormGetValues<FormValues>;
  /** Fields displayed */
  fields: {
    country: {
      fieldName: Path<FormValues>;
      required: boolean;
      controlOptions?: UseControllerProps<FormValues, FieldPath<FormValues>>['rules'] & {
        /** Whether the input is disabled */
        disabled?: boolean;
      };
    };
    state: {
      fieldName: Path<FormValues>;
      required: boolean;
      controlOptions?: UseControllerProps<FormValues, FieldPath<FormValues>>['rules'] & {
        /** Whether the input is disabled */
        disabled?: boolean;
      };
    };
    municipality: {
      fieldName: Path<FormValues>;
      required: boolean;
      controlOptions?: UseControllerProps<FormValues, FieldPath<FormValues>>['rules'] & {
        /** Whether the input is disabled */
        disabled?: boolean;
      };
    };
  };
};
