import {
  Control,
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormResetField,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';
import { UseMutationResult } from 'react-query';

import { AxiosError, AxiosResponse } from 'axios';

import { Languages } from 'enums';
import { Enum, GroupedEnums } from 'types/enums';
import { OpenCall, OpenCallForm, OpenCallDto } from 'types/open-calls';

import { ResponseData, ErrorResponse } from 'services/types';

export type OpenCallFormTypes = {
  title: string;
  mutation: UseMutationResult<
    AxiosResponse<ResponseData<OpenCall>>,
    AxiosError<ErrorResponse>,
    { dto: OpenCallDto; locale: Languages }
  >;
  initialValues?: OpenCall;
  enums: GroupedEnums;
  language: Languages;
  onComplete: () => void;
  leaveMessage: string;
};

export type OpenCallInformationProps = {
  /**  React-hook-form register function */
  register: UseFormRegister<OpenCallForm>;
  /**  React-hook-form clearErrors function */
  clearErrors: UseFormClearErrors<OpenCallForm>;
  /**  React-hook-form state - errors */
  errors: FieldErrors<OpenCallForm>;
  /**  React-hook-form setError function */
  setError: UseFormSetError<OpenCallForm>;
  /**  React-hook-form control */
  control: Control<OpenCallForm, any>;
  /**  React-hook-form setValue function */
  setValue: UseFormSetValue<OpenCallForm>;
  /**  React-hook-form resetField function */
  resetField?: UseFormResetField<OpenCallForm>;
};

export type OpenCallExpectedImpactProps = {
  /**  React-hook-form register function */
  register: UseFormRegister<OpenCallForm>;
  /**  React-hook-form state - errors */
  errors: FieldErrors<OpenCallForm>;
  /**  React-hook-form clearErrors function */
  clearErrors: UseFormClearErrors<OpenCallForm>;
  /**  React-hook-form setValue function */
  setValue: UseFormSetValue<OpenCallForm>;
};

export type OpenCallFundingInformationProps = {
  /**  React-hook-form register function */
  register: UseFormRegister<OpenCallForm>;
  /**  React-hook-form state - errors */
  errors: FieldErrors<OpenCallForm>;
  /**  React-hook-form clearErrors function */
  clearErrors: UseFormClearErrors<OpenCallForm>;
  /**  React-hook-form setValue function */
  setValue: UseFormSetValue<OpenCallForm>;
  /** Instrument type enums */
  instrument_types: Enum[];
};

export type OpenCallClosingDateProps = {
  /**  React-hook-form control */
  control: Control<OpenCallForm, any>;
  /**  React-hook-form state - errors */
  errors: FieldErrors<OpenCallForm>;
};
