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
  UseFormSetError,
} from 'react-hook-form';
import { UseMutationResult } from 'react-query';

import { AxiosResponse, AxiosError } from 'axios';

import { Enum, GroupedEnums } from 'types/enums';
import { Project, ProjectForm } from 'types/project';

import { ErrorResponse, ResponseData } from 'services/types';

export type ProjectFormProps = {
  /** Title to Header and MultipageLayout */
  title: string;
  /** Leave message to show when leaving the form */
  leaveMessage: string;
  /** If is the create form. Default = false (update form) */
  isCreateForm?: boolean;
  /** Values of the current project developer, in case it is the update form */
  initialValues?: Project;
  /** UseMutation hook values */
  mutation: UseMutationResult<AxiosResponse<ResponseData<Project>>, AxiosError<ErrorResponse>>;
  /** Callback to execute when form has been submitted successfully */
  onComplete?: () => void;
  enums: GroupedEnums;
};

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
  /** React Hook Form's `setError` function */
  setError?: UseFormSetError<FormValues>;
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
