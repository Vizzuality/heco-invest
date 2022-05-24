import React, { FC, useEffect, useMemo, useState } from 'react';

import { useIntl } from 'react-intl';

import cx from 'classnames';

import { useRouter } from 'next/router';

import { UseQueryOptions } from 'react-query/types/react';

import { useQueryParams } from 'helpers/pages';

import DiscoverSearch from 'containers/layouts/discover-search';

import LayoutContainer from 'components/layout-container';
import SortingButtons, { SortingOrderType } from 'components/sorting-buttons';
import { Paths } from 'enums';

import { useInvestorsList } from 'services/investors/investorsService';
import { useProjectDevelopersList } from 'services/project-developers/projectDevelopersService';
import { useProjectsList } from 'services/projects/projectService';
import { PagedResponse } from 'services/types';

import Header from './header';
import Navigation from './navigation';
import { DiscoverPageLayoutProps } from './types';
import FilterTags from 'containers/filter-tags';

export const DiscoverPageLayout: FC<DiscoverPageLayoutProps> = ({
  screenHeightLg = false,
  children,
}: DiscoverPageLayoutProps) => {
  const intl = useIntl();
  const router = useRouter();
  const { push, pathname } = useRouter();

  const sortingOptions = [
    { key: 'name', label: intl.formatMessage({ defaultMessage: 'Name', id: 'HAlOn1' }) },
    { key: 'created_at', label: intl.formatMessage({ defaultMessage: 'Date', id: 'P7PLVj' }) },
  ];

  const defaultSorting = useMemo(
    () => ({
      sortBy: 'created_at',
      sortOrder: 'desc' as SortingOrderType,
    }),
    []
  );

  // This shouldn't be needed, but due to CSS positioning / z-index issues we need to have the DiscoverSearch
  // components both in the header and in this layout; which one is visible depends on the screen resolution.
  // These states are here to keep both DiscoverSearch in sync, in case the user resizes their screen.
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [sorting, setSorting] = useState<{ sortBy: string; sortOrder: string }>(defaultSorting);

  // Hook to use 'search', 'filter', 'page' and 'sorting' query params
  // http://localhost:3000/discover/projects?page=2&search=sar&sorting=name+asc
  const queryParams = useQueryParams(sorting);

  const queryOptions: UseQueryOptions<PagedResponse<any>> = { keepPreviousData: false };

  const {
    data: projects,
    isLoading: isLoadingProjects,
    isFetching: isFetchingProjects,
  } = useProjectsList(
    { ...queryParams, includes: ['project_developer', 'involved_project_developers'] },
    queryOptions
  );

  const {
    data: projectDevelopers,
    isLoading: isLoadingProjectDevelopers,
    isFetching: isFetchingProjectDevelopers,
  } = useProjectDevelopersList({ ...queryParams, perPage: 9 }, queryOptions);

  const {
    data: investors,
    isLoading: isLoadingInvestors,
    isFetching: isFetchingInvestors,
  } = useInvestorsList({ ...queryParams, perPage: 9 }, queryOptions);

  const stats = {
    projects: projects?.meta?.total,
    projectDevelopers: projectDevelopers?.meta?.total,
    investors: investors?.meta?.total,
    openCalls: 0,
  };

  const { data, meta, loading } = useMemo(() => {
    // TODO: Find a way to improve this.
    if (pathname.startsWith(Paths.Projects))
      return { ...projects, loading: isLoadingProjects || isFetchingProjects };

    if (pathname.startsWith(Paths.ProjectDevelopers)) {
      return {
        ...projectDevelopers,
        loading: isLoadingProjectDevelopers || isFetchingProjectDevelopers,
      };
    }

    if (pathname.startsWith(Paths.Investors)) {
      return {
        ...investors,
        loading: isLoadingInvestors || isFetchingInvestors,
      };
    }

    // if (router.pathname.startsWith(Paths.OpenCalls)) return openCalls;
  }, [
    investors,
    isFetchingInvestors,
    isFetchingProjectDevelopers,
    isFetchingProjects,
    isLoadingInvestors,
    isLoadingProjectDevelopers,
    isLoadingProjects,
    projectDevelopers,
    projects,
    pathname,
  ]) || { data: [], meta: [] };

  useEffect(() => {
    const { search } = queryParams;
    setSearchInputValue(search);
  }, [queryParams]);

  useEffect(() => {
    const [sortBy, sortOrder] = queryParams.sorting.split(' ');
    setSorting(sortBy && sortOrder ? { sortBy, sortOrder } : defaultSorting);
  }, [defaultSorting, queryParams.sorting]);

  const handleSearch = (searchText: string) => {
    push({ query: { ...queryParams, page: 1, search: searchText } }, undefined, {
      shallow: true,
    });
  };

  const handleSorting = ({
    sortBy,
    sortOrder,
  }: {
    sortBy: string;
    sortOrder: SortingOrderType;
  }) => {
    router.push({
      query: {
        ...queryParams,
        sorting: `${sortBy || sorting.sortBy} ${sortOrder || sorting.sortOrder}`,
      },
    });
  };

  const discoverSearchProps = {
    searchText: searchInputValue,
    onSearch: handleSearch,
    onSearchChange: setSearchInputValue,
  };

  const sortingButtonsProps = {
    sortBy: sorting.sortBy,
    sortOrder: sorting.sortOrder as SortingOrderType,
    options: sortingOptions,
    onChange: handleSorting,
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { data, meta, loading });
    }

    return child;
  });

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 h-screen bg-background-dark">
      <div className="flex flex-col h-screen overflow-auto">
        <div className="z-10">
          <Header {...discoverSearchProps} />
          <LayoutContainer className="z-10 flex justify-center pt-1 mt-20 mb-2 pointer-events-none xl:hidden xl:mb-6 xl:mt-0 xl:left-0 xl:right-0 xl:h-20 xl:fixed xl:top-3">
            <DiscoverSearch
              className="w-full max-w-3xl pointer-events-auto"
              {...discoverSearchProps}
            />
          </LayoutContainer>
        </div>
        <main className="z-0 flex flex-col flex-grow h-screen overflow-y-scroll">
          <LayoutContainer className="xl:mt-28">
            <FilterTags />
            <div className="flex flex-col items-center gap-2 mt-4 mb-4 lg:mt-2 lg:gap-6 lg:flex-row space-between">
              <SortingButtons className="flex-1" {...sortingButtonsProps} />
              <div className="flex justify-center w-full">
                <Navigation stats={stats} />
              </div>
              <div className="flex-1">{/*Share*/}</div>
            </div>
          </LayoutContainer>
          <LayoutContainer
            className={cx({
              'mb-4 lg:mb-0 lg:overflow-y-scroll': true,
              'h-screen': !screenHeightLg,
              'flex-grow lg:overflow-hidden': screenHeightLg,
            })}
          >
            {childrenWithProps}
          </LayoutContainer>
        </main>
      </div>
    </div>
  );
};

export default DiscoverPageLayout;
