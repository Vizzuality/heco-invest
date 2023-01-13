import { useMemo } from 'react';

import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { compact, pickBy } from 'lodash-es';

import { useQueryParams } from 'helpers/pages';

import { SortingOptionType } from 'components/sorting-buttons';
import { SortingOptionKey, SortingOrderType } from 'components/sorting-buttons/types';
import { Paths, Queries } from 'enums';

import { useInvestorsList } from 'services/investors/investorsService';
import { useOpenCallsList } from 'services/open-call/open-call-service';
import { useProjectDevelopersList } from 'services/project-developers/projectDevelopersService';
import { useProjectsList } from 'services/projects/projectService';

export type SortingByTargetType = Queries.Project;

export const defaultSorting = {
  sortBy: 'created_at' as SortingOptionKey,
  sortOrder: 'desc' as SortingOrderType,
};

/** Returns the sorting-by types array with translated labels  */
export const useSortingByOptions = (target?: SortingByTargetType): SortingOptionType[] => {
  const { formatMessage } = useIntl();

  const sortingOptions = {
    general: [
      { key: 'name', label: formatMessage({ defaultMessage: 'Name', id: 'HAlOn1' }) },
      { key: 'created_at', label: formatMessage({ defaultMessage: 'Date', id: 'P7PLVj' }) },
    ],
    [Queries.Project]: [
      {
        key: 'municipality_biodiversity_impact',
        label: formatMessage({ defaultMessage: 'Biodiversity impact', id: 'BvO1iK' }),
      },
      {
        key: 'municipality_climate_impact',
        label: formatMessage({ defaultMessage: 'Climate impact', id: 'TUFmRM' }),
      },
      {
        key: 'municipality_water_impact',
        label: formatMessage({ defaultMessage: 'Water impact', id: 'W5x0GV' }),
      },
      {
        key: 'municipality_community_impact',
        label: formatMessage({ defaultMessage: 'Community impact', id: 'PGlFh/' }),
      },
    ],
  };

  return compact([
    ...sortingOptions['general'],
    ...(sortingOptions[target] || []),
  ]) as SortingOptionType[];
};

const pathFilters = {
  [Paths.Projects]: [
    'filter[category]',
    'filter[sdg]',
    'filter[instrument_type]',
    'filter[ticket_size]',
    'filter[impact]',
    'filter[only_verified]',
    'filter[full_text]',
    'filter[priority_landscape]',
  ],
  [Paths.ProjectDevelopers]: [
    'filter[category]',
    'filter[impact]',
    'filter[full_text]',
    'filter[priority_landscape]',
  ],
  [Paths.Investors]: [
    'filter[category]',
    'filter[sdg]',
    'filter[instrument_type]',
    'filter[ticket_size]',
    'filter[impact]',
    'filter[full_text]',
  ],
  [Paths.OpenCalls]: [
    'filter[sdg]',
    'filter[instrument_type]',
    'filter[ticket_size]',
    'filter[only_verified]',
    'filter[full_text]',
  ],
};

const getPathParams = (
  path: string,
  pathname: string,
  queryParams: { [key: string]: string | string[] }
) => {
  const { page, sorting, search, ...filters } = queryParams;

  // Get only applicable filters for each path to avoid unnecessary fetches
  const pathFilter = pickBy(filters, (_, key) => pathFilters[path].includes(key));

  const params: { [key: string]: string | string[] } = { page, search, ...pathFilter };

  if (pathname !== path) {
    return {
      ...params,
      fields: ['name'],
      perPage: 1,
      'page[size]': 1,
    };
  }

  // Use sorting value only when applies to path to avoid unnecessary fetches
  if (path === Paths.Projects || sorting?.includes('name') || sorting?.includes('created_at')) {
    params.sorting = sorting;
  }

  if (pathname === Paths.Projects) {
    return {
      ...params,
      includes: ['project_developer', 'involved_project_developers'],
      'fields[project_developer]': 'picture,name,contact_phone,contact_email',
      'fields[involved_project_developers]': 'picture,name,contact_phone,contact_email',
    };
  }
  if (pathname === Paths.Investors || pathname === Paths.ProjectDevelopers) {
    return { ...params, perPage: 9 };
  }
  if (pathname === Paths.OpenCalls) {
    return { ...params, includes: ['investor'] };
  }
};

/** Hook to use the stats and the search results on Discover pages */
export const useDiscoverData = () => {
  const queryParams = useQueryParams();
  const { pathname } = useRouter();
  const getParams = (path: string) => getPathParams(path, pathname, queryParams);
  const queryOptions = { keepPreviousData: true };

  const projects = useProjectsList(getParams(Paths.Projects), queryOptions);
  const projectDevelopers = useProjectDevelopersList(
    getParams(Paths.ProjectDevelopers),
    queryOptions
  );
  const investors = useInvestorsList(getParams(Paths.Investors), queryOptions);
  const openCalls = useOpenCallsList(getParams(Paths.OpenCalls), queryOptions);

  const stats = useMemo(
    () => ({
      projects: projects?.data?.meta?.total,
      projectDevelopers: projectDevelopers?.data?.meta?.total,
      investors: investors?.data?.meta?.total,
      openCalls: openCalls?.data?.meta?.total,
    }),
    [investors?.data, openCalls?.data, projectDevelopers?.data, projects?.data]
  );

  const data = useMemo(() => {
    const allPathsData = {
      [Paths.Projects]: projects,
      [Paths.ProjectDevelopers]: projectDevelopers,
      [Paths.Investors]: investors,
      [Paths.OpenCalls]: openCalls,
    };
    const currData = allPathsData[pathname];

    return {
      data: currData.data?.data,
      meta: currData.data?.meta,
      loading: currData?.isLoading || currData?.isFetching || currData?.isRefetching,
    };
  }, [investors, openCalls, pathname, projectDevelopers, projects]);

  return { stats, data };
};
