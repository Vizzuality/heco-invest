import {
  Control,
  FieldErrors,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormResetField,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';
import { UseMutationResult } from 'react-query';

import { AxiosError } from 'axios';

import { Languages } from 'enums';
import { Enum, GroupedEnums } from 'types/enums';
import { OpenCall, OpenCallForm } from 'types/open-calls';

import { ErrorResponse } from 'services/types';

export type BasicMutationType = UseMutationResult<OpenCall, AxiosError<ErrorResponse>, {}, unknown>;

export type OpenCallFormTypes<MutationType extends BasicMutationType> = {
  /** Title of the Header and MultipageLayout */
  title: string;
  /** Mutation used when submitting the form */
  mutation: MutationType;
  /** Values of the open call when editing */
  initialValues?: OpenCall;
  /** Enums data */
  enums: GroupedEnums;
  /** Locale of the content */
  locale: Languages;
  /** Callback to execute when form has been submitted successfully */
  onComplete: () => void;
  /** Leave message to show when leaving the form */
  leaveMessage: string;
  /** Whether the open call data is still being loaded/fetched */
  isLoading?: boolean;
};

export type OpenCallInformationProps = {
  /** Open call (API data) */
  openCall: OpenCall;
  /** React-hook-form register function */
  register: UseFormRegister<OpenCallForm>;
  /** React-hook-form clearErrors function */
  clearErrors: UseFormClearErrors<OpenCallForm>;
  /** React-hook-form state - errors */
  errors: FieldErrors<OpenCallForm>;
  /** React-hook-form setError function */
  setError: UseFormSetError<OpenCallForm>;
  /** React-hook-form control */
  control: Control<OpenCallForm, any>;
  /** React-hook-form useForm getValues */
  getValues?: UseFormGetValues<OpenCallForm>;
  /** React-hook-form setValue function */
  setValue: UseFormSetValue<OpenCallForm>;
  /** React-hook-form resetField function */
  resetField?: UseFormResetField<OpenCallForm>;
};

export type OpenCallExpectedImpactProps = {
  /** React-hook-form register function */
  register: UseFormRegister<OpenCallForm>;
  /** React-hook-form state - errors */
  errors: FieldErrors<OpenCallForm>;
  /** React-hook-form clearErrors function */
  clearErrors: UseFormClearErrors<OpenCallForm>;
  /** React-hook-form setValue function */
  setValue: UseFormSetValue<OpenCallForm>;
  /** React-hook-form useForm getValues */
  getValues: UseFormGetValues<OpenCallForm>;
};

export type OpenCallFundingInformationProps = {
  /** React-hook-form register function */
  register: UseFormRegister<OpenCallForm>;
  /** React-hook-form state - errors */
  errors: FieldErrors<OpenCallForm>;
  /** React-hook-form clearErrors function */
  clearErrors: UseFormClearErrors<OpenCallForm>;
  /** React-hook-form setValue function */
  setValue: UseFormSetValue<OpenCallForm>;
  /** Instrument type enums */
  instrument_types: Enum[];
};

export type OpenCallClosingDateProps = {
  /** React-hook-form control */
  control: Control<OpenCallForm, any>;
  /** React-hook-form state - errors */
  errors: FieldErrors<OpenCallForm>;
  /** React-hook-form useForm getValues */
  getValues: UseFormGetValues<OpenCallForm>;
};
