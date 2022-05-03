import {
  UseFormRegister,
  RegisterOptions,
  FieldPath,
  FieldErrors,
  Control,
  UseControllerProps,
  UseFormGetValues,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormResetField,
} from 'react-hook-form';

import { Enum } from 'types/enums';
import { ProjectForm } from 'types/project';

export type ProjectFormPagesProps<FormValues> = {
  /** React Hook Form's `register` function */
  register: UseFormRegister<FormValues>;
  /** Options for React Hook Form's `register` function */
  registerOptions?: RegisterOptions<FormValues, FieldPath<FormValues>>;
  errors: FieldErrors<FormValues>;
  control: Control<FormValues, FieldPath<FormValues>>;
  /** Options for React Hook Form's `control` function */
  controlOptions: UseControllerProps<FormValues, FieldPath<FormValues>>['rules'] & {
    /** Whether the input is disabled */
    disabled?: boolean;
  };
  /** React-hook-form useForm getValues */
  getValues?: UseFormGetValues<FormValues>;
  /** React-hook-form useForm setValues */
  setValue?: UseFormSetValue<FormValues>;
  /** React-hook-form useForm clearErrors */
  clearErrors?: UseFormClearErrors<FormValues>;
  /** React-hook-form useForm resetField */
  resetField?: UseFormResetField<FormValues>;
};

export type ProjectDescriptionProps = ProjectFormPagesProps<ProjectForm> & {
  project_development_stage: Enum[];
  category: Enum[];
  target_group: Enum[];
};

export type ImpactProps = ProjectFormPagesProps<ProjectForm> & {
  impacts: Enum[];
};

export type FundingProps = ProjectFormPagesProps<ProjectForm> & {
  ticket_sizes: Enum[];
  instrument_type: Enum[];
};
