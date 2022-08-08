import {
  Control,
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormResetField,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';

import { Languages } from 'enums';
import { Enum, GroupedEnums } from 'types/enums';
import { OpenCallForm } from 'types/open-calls';

export type OpenCallFormTypes = {
  title: string;
  mutation: any;
  initialValues?: any;
  enums: GroupedEnums;
  language: Languages;
  onComplete: () => void;
  leaveMessage: string;
  isCreateForm?: boolean;
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
