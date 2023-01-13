import { useMemo } from 'react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useMutation } from 'react-query';

import { useRouter } from 'next/router';

import { AxiosRequestConfig } from 'axios';

import { useLocalizedQuery } from 'hooks/query';

import { Queries } from 'enums';
import { Project, ProjectMapParams, ProjectsMap, ProjectsMapGeojson } from 'types/project';

import API from 'services/api';
import { staticDataQueryOptions } from 'services/helpers';
import { PagedResponse, PagedRequest, ResponseData } from 'services/types';

const FeatureCollection: 'FeatureCollection' = 'FeatureCollection';
const Feature: 'Feature' = 'Feature';
const Point: 'Point' = 'Point';

/** Get a paged list of projects */
export const getProjects = async (params?: PagedRequest): Promise<PagedResponse<Project>> => {
  const { search, page, includes, fields, ...rest } = params || {};

  const config: AxiosRequestConfig = {
    url: '/api/v1/projects',
    method: 'GET',
    params: {
      ...rest,
      includes: includes?.join(','),
      'filter[full_text]': search,
      'page[number]': page,
      'fields[project]': fields?.join(','),
    },
  };

  return await API.request(config).then((result) => {
    return result.data;
  });
};

/** Hook to use the the projects list */
export function useProjectsList(
  params?: PagedRequest,
  options?: UseQueryOptions<PagedResponse<Project>>
): UseQueryResult<PagedResponse<Project>> & { projects: Project[] } {
  const query = useLocalizedQuery([Queries.ProjectList, params], () => getProjects(params), {
    ...staticDataQueryOptions,
    ...options,
  });

  return useMemo(
    () => ({
      ...query,
      projects: query?.data?.data || [],
    }),
    [query]
  );
}

/** Get a Project using an id and, optionally, the wanted fields */
export const getProject = async (
  id: string,
  params?: {
    'fields[project]'?: string;
    includes?: string[];
    locale?: string;
  }
): Promise<{
  data: Project;
  included: any[]; // TODO
}> => {
  const { includes, ...rest } = params || {};

  const config: AxiosRequestConfig = {
    url: `/api/v1/projects/${id}`,
    method: 'GET',
    params: {
      includes: includes?.join(','),
      ...rest,
    },
  };
  return await API.request(config).then((response) => response.data);
};

/** Use query for a single Project */
export function useProject(
  id: string,
  params?: Parameters<typeof getProject>[1],
  initialData?: Project
) {
  const query = useLocalizedQuery([Queries.Project, id], () => getProject(id, params), {
    refetchOnWindowFocus: false,
    initialData: { data: initialData, included: [] },
  });

  return useMemo(
    () => ({
      ...query,
      project: query.data,
    }),
    [query]
  );
}

/** Functon to get the projects locations using the paramns */
const getProjectsMap = (params) =>
  API.get<ResponseData<ProjectsMap[]>>('/api/v1/projects/map', { params }).then(
    (resp) => resp.data
  );

/** Hook to use the projects map locations */
export const useProjectsMap = (
  params: ProjectMapParams
): UseQueryResult<ResponseData<ProjectsMap[]>, unknown> & { projectsMap: ProjectsMapGeojson } => {
  const query = useLocalizedQuery([Queries.ProjectsMap, params], () => getProjectsMap(params), {
    placeholderData: {
      data: [],
    },
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return useMemo(() => {
    // Parse the response to a geojson
    const projectsMapFeatures: ProjectsMapGeojson['features'] = [];
    (query.data.data || []).forEach(({ latitude, longitude, category, id, trusted, type }) => {
      // Valid longitude and latitude values
      if (
        typeof longitude === 'number' &&
        typeof latitude === 'number' &&
        longitude > -180 &&
        longitude < 180 &&
        latitude > -90 &&
        latitude < 90
      ) {
        const feature = {
          type: Feature,
          id: id,
          geometry: {
            type: Point,
            coordinates: [longitude, latitude],
          },
          properties: {
            category,
            id,
            trusted,
            type,
          },
        };
        projectsMapFeatures.push(feature);
      }
    });

    const projectsMap: ProjectsMapGeojson = {
      type: FeatureCollection,
      features: projectsMapFeatures,
    };

    return {
      ...query,
      projectsMap,
    };
  }, [query]);
};

/** Hook with mutation that handle favorite state. If favorite is false, creates a POST request to set favorite to true, and if favorite is true, creates a DELETE request that set favorite to false. */
export const useFavoriteProject = () => {
  const { locale } = useRouter();
  const queryClient = useQueryClient();

  const favoriteOrUnfavoriteProject = (
    projectId: string,
    isFavourite: boolean
  ): Promise<Project> => {
    const config: AxiosRequestConfig = {
      method: isFavourite ? 'DELETE' : 'POST',
      url: `/api/v1/projects/${projectId}/favourite_project`,
      data: { project_id: projectId },
    };

    return API.request(config).then((response) => response.data.data);
  };

  return useMutation(
    ({ id, isFavourite }: { id: string; isFavourite: boolean }) =>
      favoriteOrUnfavoriteProject(id, isFavourite),
    {
      onSuccess: (data) => {
        queryClient.setQueryData([Queries.Project, locale], data);
        queryClient.invalidateQueries([Queries.Project], {});
        queryClient.invalidateQueries([Queries.ProjectList], {});
        queryClient.invalidateQueries([Queries.FavoriteProjectsList, {}]);
      },
    }
  );
};
