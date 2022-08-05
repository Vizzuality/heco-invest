import {
  Control,
  FieldError,
  FieldErrors,
  FormState,
  UseFormClearErrors,
  UseFormRegister,
  UseFormResetField,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';

import { OpenCallForm } from 'types/open-calls';

export type OpenCallFormTypes = {
  handleNextClick: () => void;
  onLeave: (isLeaving: boolean) => void;
  title: string;
  mutation: any;
  initialValues?: any;
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

export type OpenCallClosingDateProps = {
  /**  React-hook-form control */
  control: Control<OpenCallForm, any>;
  /**  React-hook-form state - errors */
  errors: FieldErrors<OpenCallForm>;
};
