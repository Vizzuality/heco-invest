import {
  SetFieldValue,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  FormState,
  Control,
} from 'react-hook-form';
import { UseMutationResult } from 'react-query';

import { AxiosResponse, AxiosError } from 'axios';

import { Enum } from 'types/enums';
import { ProjectDeveloper, ProjectDeveloperSetupForm, Interest } from 'types/projectDeveloper';

import { ErrorResponse, ResponseData } from 'services/types';

export type ProjectDeveloperFormProps = {
  /** Title to Header and MultipageLayout */
  title: string;
  /** Leave message to show when leaving the form */
  leaveMessage: string;
  /** If is the create form. Default = false (update form) */
  isCreateForm?: boolean;
  /** Values of the current project developer, in case it is the update form */
  initialValues?: ProjectDeveloper;
  /** UseMutation hook values */
  mutation: UseMutationResult<
    AxiosResponse<ResponseData<ProjectDeveloper>>,
    AxiosError<ErrorResponse>,
    ProjectDeveloperSetupForm,
    unknown
  >;
  /** Callback to execute when form has been submitted successfully */
  onComplete: () => void;
};

export type ProfileProps = {
  /**  React-hook-form setError function */
  setError: UseFormSetError<ProjectDeveloperSetupForm>;
  /**  React-hook-form setValue function */
  setValue: SetFieldValue<any>;
  /**  React-hook-form register function */
  register: UseFormRegister<ProjectDeveloperSetupForm>;
  /**  React-hook-form clearErrors function */
  clearErrors: UseFormClearErrors<ProjectDeveloperSetupForm>;
  /**  React-hook-form state - errors */
  errors: FormState<ProjectDeveloperSetupForm>['errors'];
  /**  React-hook-form control function */
  control: Control<ProjectDeveloperSetupForm, any>;
  /**  Project developers enums */
  projectDeveloperTypeEnums: Enum[];
  /**  If there is some error on enum query */
  enumsIsError: boolean;
  /**  PD picture small url */
  picture?: string;
};

export type AboutProps = {
  /** Interest enums */
  interests: Interest[];
  /**  If thgere is some error on enum query */
  enumsIsError: boolean;
  /**  React-hook-form register function */
  register: UseFormRegister<ProjectDeveloperSetupForm>;
  /**  React-hook-form setValue function */
  setValue: SetFieldValue<any>;
  /**  React-hook-form state - errors */
  errors: FormState<ProjectDeveloperSetupForm>['errors'];
  /**  React-hook-form clearErrors function */
  clearErrors: UseFormClearErrors<ProjectDeveloperSetupForm>;
};
