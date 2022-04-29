import { useMemo } from 'react';

import { useQuery } from 'react-query';

import { AxiosRequestConfig } from 'axios';

import { Queries } from 'enums';
import { Project } from 'types/project';

import API from 'services/api';

/** Get a Project using an id and, optionally, the wanted fields */
export const getProject = async (
  id: string,
  params?: {
    fields?: string;
    includes?: string;
  }
): Promise<{
  data: Project;
  included: any[]; // TODO
}> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/projects/${id}`,
    method: 'GET',
    params: params,
  };
  return await API.request(config).then((response) => response.data);
};

/** Use query for a single Project */
export function useProject(id: string, params) {
  const query = useQuery([Queries.ProjectQuery, id], () => getProject(id, params));

  return useMemo(
    () => ({
      ...query,
      project: query.data,
    }),
    [query]
  );
}
