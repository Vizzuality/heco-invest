import React, { FC, useEffect, useMemo, useState } from 'react';

import { UseQueryResult } from 'react-query';

import cx from 'classnames';

import { useRouter } from 'next/router';

import { useQueryParams } from 'helpers/pages';

import DiscoverSearch from 'containers/layouts/discover-search';

import LayoutContainer from 'components/layout-container';
import SortingButtons, { SortingOrderType } from 'components/sorting-buttons';
import { SortingOptionKey } from 'components/sorting-buttons/types';
import { Paths } from 'enums';

import { useInvestorsList } from 'services/investors/investorsService';
import { useOpenCallsList } from 'services/open-call/open-call-service';
import { useProjectDevelopersList } from 'services/project-developers/projectDevelopersService';
import { useProjectsList } from 'services/projects/projectService';
import { PagedResponse } from 'services/types';

import Header from './header';
import { useSortingByOptions } from './helpers';
import Navigation from './navigation';
import { DiscoverPageLayoutProps } from './types';

export const DiscoverPageLayout: FC<DiscoverPageLayoutProps> = ({
  screenHeightLg = false,
  children,
}: DiscoverPageLayoutProps) => {
  const { push, pathname } = useRouter();

  const sortingOptions = useSortingByOptions();

  const defaultSorting = useMemo(
    () => ({
      sortBy: 'created_at' as SortingOptionKey,
      sortOrder: 'desc' as SortingOrderType,
    }),
    []
  );

  const [sorting, setSorting] =
    useState<{ sortBy: SortingOptionKey; sortOrder: SortingOrderType }>(defaultSorting);

  const queryParams = useQueryParams(sorting);

  const queryOptions = { keepPreviousData: false };

  const projects = useProjectsList(
    { ...queryParams, includes: ['project_developer', 'involved_project_developers'] },
    queryOptions
  );
  const projectDevelopers = useProjectDevelopersList({ ...queryParams, perPage: 9 }, queryOptions);
  const investors = useInvestorsList({ ...queryParams, perPage: 9 }, queryOptions);
  const openCalls = useOpenCallsList({ ...queryParams, includes: ['investor'] }, queryOptions);

  const stats = useMemo(
    () => ({
      projects: projects?.data?.meta?.total,
      projectDevelopers: projectDevelopers?.data?.meta?.total,
      investors: investors?.data?.meta?.total,
      openCalls: openCalls?.data?.meta?.total,
    }),
    [projects, investors, projectDevelopers, openCalls]
  );

  const getCurrentData = (data: UseQueryResult<PagedResponse<any>>) => {
    return {
      data: data.data?.data,
      meta: data.data?.meta,
      loading: data.isLoading || data?.isFetching || data?.isRefetching,
    };
  };

  const { data, meta, loading } = useMemo(() => {
    if (pathname.startsWith(Paths.Projects)) return getCurrentData(projects);
    if (pathname.startsWith(Paths.ProjectDevelopers)) return getCurrentData(projectDevelopers);
    if (pathname.startsWith(Paths.Investors)) return getCurrentData(investors);
    if (pathname.startsWith(Paths.OpenCalls)) return getCurrentData(openCalls);
  }, [pathname, projects, projectDevelopers, investors, openCalls]) || { data: [], meta: [] };

  useEffect(() => {
    const [sortBy, sortOrder]: any = queryParams.sorting.split(' ');
    setSorting(sortBy && sortOrder ? { sortBy, sortOrder } : defaultSorting);
  }, [defaultSorting, queryParams.sorting]);

  const handleSorting = ({
    sortBy,
    sortOrder,
  }: {
    sortBy: string;
    sortOrder: SortingOrderType;
  }) => {
    push({
      query: {
        ...queryParams,
        sorting: `${sortBy || sorting.sortBy} ${sortOrder || sorting.sortOrder}`,
      },
    });
  };

  const getSortingOptions = () => {
    // return all the sorting types for projects pages
    if (pathname === Paths.Projects) return sortingOptions;
    // return just name and data sorting types for the other pages
    if (sorting.sortBy !== 'name' && sorting.sortBy !== 'created_at') {
      setSorting({ ...sorting, sortBy: 'name' });
    }
    return sortingOptions.slice(0, 2);
  };

  const sortingButtonsProps = {
    sortBy: sorting.sortBy,
    sortOrder: sorting.sortOrder as SortingOrderType,
    options: getSortingOptions(),
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
          <Header />
          <LayoutContainer className="z-10 flex justify-center pt-1 mt-0 mb-2 pointer-events-none xl:hidden xl:mb-6 xl:mt-0 xl:left-0 xl:right-0 xl:h-20 xl:fixed xl:top-3">
            <DiscoverSearch className="w-full max-w-3xl pointer-events-auto -z-10" />
          </LayoutContainer>
        </div>
        <main className="z-0 flex flex-col flex-grow h-screen overflow-y-auto">
          <LayoutContainer className="xl:mt-6">
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
              'mb-4 lg:mb-0 lg:overflow-y-auto': true,
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
