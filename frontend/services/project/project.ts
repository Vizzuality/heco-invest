import { useMemo } from 'react';

import { useQuery } from 'react-query';

import { AxiosRequestConfig } from 'axios';

import { Queries } from 'enums';
import { Project } from 'types/project';

import API from 'services/api';

/** Get a Project using an id or slug (for the id parameter) and, optionally, the wanted fields and relationships*/
export const getProjectDeveloper = async (
  id: string,
  params?: { 'fields[project]': string[]; includes: string[] }
): Promise<Project> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/projects/${id}`,
    method: 'GET',
    params,
  };
  return await API.request(config).then((response) => response.data.data);
};

/** Use query for a single Project */
export function useProjectDeveloper(id: string) {
  const query = useQuery([Queries.Project, id], () => getProjectDeveloper(id));

  return useMemo(
    () => ({
      ...query,
      project: query.data,
    }),
    [query]
  );
}
