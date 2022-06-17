import {
  SetFieldValue,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  FormState,
  Control,
  FieldPath,
} from 'react-hook-form';

import { Enum } from 'types/enums';
import { ProjectDeveloperSetupForm } from 'types/projectDeveloper';

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
  /**  Fetch error message */
  fetchError: string;
};

export type AboutProps = {
  /** Interest enums */
  interests: Enum[];
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
  /**  Fetch error message */
  fetchError: string;
};
