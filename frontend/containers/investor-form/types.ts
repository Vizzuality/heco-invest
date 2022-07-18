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
import { Investor, InvestorForm } from 'types/investor';

import { ErrorResponse, ResponseData } from 'services/types';

export type InvestorFormProps = {
  /** Title to Header and MultipageLayout */
  title: string;
  /** Leave message to show when leaving the form */
  leaveMessage: string;
  /** If is the create form. Default = false (update form) */
  isCreateForm?: boolean;
  /** Values of the current project developer, in case it is the update form */
  initialValues?: Investor;
  /** UseMutation hook values */
  mutation: UseMutationResult<
    AxiosResponse<ResponseData<Investor>>,
    AxiosError<ErrorResponse>,
    InvestorForm,
    unknown
  >;
  /** Callback to execute when form has been submitted successfully */
  onComplete: () => void;
  /** Callback to execute when the user clicks to leave the form */
  onLeave: (isOutroPage: boolean) => void;
  /** Server Enums */
  enums: GroupedEnums;
};

export type InvestorFormPagesProps = {
  /** React Hook Form's `register` function */
  register: UseFormRegister<InvestorForm>;
  /** Options for React Hook Form's `register` function */
  registerOptions?: RegisterOptions<InvestorForm, FieldPath<InvestorForm>>;
  /** React Hook Form's state 'errors' function */
  errors: FieldErrors<InvestorForm>;
  /** Options for React Hook Form's `control` function */
  control: Control<InvestorForm, FieldPath<InvestorForm>>;
  /** Options for React Hook Form's `control` function options */
  controlOptions?: UseControllerProps<InvestorForm, FieldPath<InvestorForm>>['rules'];
  /** React-hook-form useForm getValues */
  getValues?: UseFormGetValues<InvestorForm>;
  /** React-hook-form useForm setValues */
  setValue?: UseFormSetValue<InvestorForm>;
  /** React-hook-form useForm setValues */
  setError?: UseFormSetError<InvestorForm>;
  /** React-hook-form useForm clearErrors */
  clearErrors?: UseFormClearErrors<InvestorForm>;
  /** React-hook-form useForm resetField */
  resetField?: UseFormResetField<InvestorForm>;
  /** Default picture src */
  picture?: string;
};

export type ProjectDescriptionProps = InvestorFormPagesProps & {
  project_development_stage: Enum[];
  category: Enum[];
  target_group: Enum[];
};

export type ImpactProps = Omit<InvestorFormPagesProps, 'control'> & {
  impacts: Enum[];
};

export type FundingProps = InvestorFormPagesProps & {
  ticket_sizes: Enum[];
  instrument_type: Enum[];
};

export type ProfileProps = InvestorFormPagesProps & {
  investorTypes: Enum[];
};

export type InvestmentInformationProps = Omit<InvestorFormPagesProps, 'control'> & {
  categories: Enum[];
  ticket_sizes: Enum[];
  instrument_types: Enum[];
};

export type PriorityProps = {
  /** React Hook Form's `register` function */
  register: UseFormRegister<InvestorForm>;
  /** React Hook Form's state 'errors' function */
  errors: FieldErrors<InvestorForm>;
};

export type OtherInformationsProps = {
  /** React Hook Form's `register` function */
  register: UseFormRegister<InvestorForm>;
  /** React Hook Form's state 'errors' function */
  errors: FieldErrors<InvestorForm>;
};
