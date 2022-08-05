import {
  Control,
  FieldError,
  FieldErrors,
  FormState,
  UseFormClearErrors,
  UseFormRegister,
} from 'react-hook-form';

import { OpenCall } from 'types/open-calls';

export type OpenCallFormTypes = {
  handleNextClick: () => void;
  onLeave: (isLeaving: boolean) => void;
  title: string;
  mutation: any;
  initialValues?: any;
};

export type OpenCallInformationProps = {
  /**  React-hook-form register function */
  register: UseFormRegister<OpenCall>;
  /**  React-hook-form clearErrors function */
  clearErrors: UseFormClearErrors<OpenCall>;
  /**  React-hook-form state - errors */
  errors: FieldErrors<OpenCall>;
  setError;
  control;
  setValue;
};

export type OpenCallClosingDateProps = {
  control: Control<OpenCall, any>;
  errors?: FieldError;
};
