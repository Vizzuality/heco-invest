import { UseMutationResult } from 'react-query';

import { AxiosResponse, AxiosError } from 'axios';

import { ProjectDeveloper, ProjectDeveloperSetupForm } from 'types/projectDeveloper';

import { ErrorResponse } from 'services/types';

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
    AxiosResponse<ProjectDeveloper>,
    AxiosError<ErrorResponse>,
    ProjectDeveloperSetupForm,
    unknown
  >;
};
