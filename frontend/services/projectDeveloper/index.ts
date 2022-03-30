import { AxiosResponse } from 'axios';

import { ProjectDeveloperSetupForm } from 'types/projectDeveloper';

import api from 'services/api';

export async function createProjectDeveloper(
  data: ProjectDeveloperSetupForm
): Promise<AxiosResponse<ProjectDeveloperSetupForm>> {
  return await api.post('/project-developer/create', data);
}
