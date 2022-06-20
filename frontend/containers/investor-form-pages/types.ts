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
  Path,
  UseFormSetError,
} from 'react-hook-form';

import { Enum } from 'types/enums';
import { InvestorForm } from 'types/investor';

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
