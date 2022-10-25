import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import { UseQueryResult } from 'react-query';

import cx from 'classnames';

import { useRouter } from 'next/router';

import { cleanQueryParams, useQueryParams } from 'helpers/pages';

import DiscoverSearch from 'containers/layouts/discover-search';

import LayoutContainer from 'components/layout-container';
import ScrollToTopButton from 'components/scroll-to-top-button';
import SortingButtons, { SortingOrderType } from 'components/sorting-buttons';
import { SortingOptionKey } from 'components/sorting-buttons/types';
import { Paths, Queries } from 'enums';

import { useInvestorsList } from 'services/investors/investorsService';
import { useOpenCallsList } from 'services/open-call/open-call-service';
import { useProjectDevelopersList } from 'services/project-developers/projectDevelopersService';
import { useProjectsList } from 'services/projects/projectService';
import { PagedResponse } from 'services/types';

import Header from './header';
import { useSortingByOptions, SortingByTargetType, defaultSorting } from './helpers';
import Navigation from './navigation';
import { DiscoverPageLayoutProps } from './types';

export const DiscoverPageLayout: FC<DiscoverPageLayoutProps> = ({
  screenHeightLg = false,
  children,
}: DiscoverPageLayoutProps) => {
  const { push, pathname } = useRouter();

  const mainRef = useRef<HTMLDivElement>();

  const [sorting, setSorting] =
    useState<{ sortBy: SortingOptionKey; sortOrder: SortingOrderType }>(defaultSorting);

  const sortingOptionsTarget = useMemo(() => {
    if (pathname.startsWith(Paths.Projects)) return Queries.Project;
  }, [pathname]) as SortingByTargetType;

  const sortingOptions = useSortingByOptions(sortingOptionsTarget);
  const queryParams = useQueryParams();

  const queryOptions = { keepPreviousData: true };

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

  const searchResult = useMemo(() => {
    if (pathname.startsWith(Paths.Projects)) return getCurrentData(projects);
    if (pathname.startsWith(Paths.ProjectDevelopers)) return getCurrentData(projectDevelopers);
    if (pathname.startsWith(Paths.Investors)) return getCurrentData(investors);
    if (pathname.startsWith(Paths.OpenCalls)) return getCurrentData(openCalls);
  }, [pathname, projects, projectDevelopers, investors, openCalls]) || { data: [], meta: [] };

  useEffect(() => {
    const [sortBy, sortOrder]: [SortingOptionKey, SortingOrderType] = queryParams?.sorting?.split(
      ' '
    ) || [defaultSorting.sortBy, defaultSorting.sortOrder];

    setSorting({ sortBy, sortOrder });
  }, [queryParams?.sorting]);

  const handleSorting = ({
    sortBy,
    sortOrder,
  }: {
    sortBy: string;
    sortOrder: SortingOrderType;
  }) => {
    push({
      query: cleanQueryParams({
        ...queryParams,
        sorting: `${sortBy || sorting.sortBy} ${sortOrder || sorting.sortOrder}`,
      }),
    });
  };

  const sortingButtonsProps = {
    sortBy: sorting.sortBy,
    sortOrder: sorting.sortOrder as SortingOrderType,
    options: sortingOptions,
    onChange: handleSorting,
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, searchResult);
    }

    return child;
  });

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 h-screen bg-background-dark">
      <div className="flex flex-col h-screen sm:overflow-auto bg-gradient-to-t from-background-green-dark to-background-green-dark bg-[length:100%_166px] bg-no-repeat sm:bg-none">
        <div className="z-10 h-min">
          <Header />
          <LayoutContainer className="z-10 flex justify-center mt-1 pointer-events-none sm:pt-1 sm:mb-2 xl:pb-0 xl:mb-0 xl:-mt-10 xl:left-0 xl:right-0 xl:relative">
            <DiscoverSearch className="w-full max-w-3xl pointer-events-auto -z-10" />
          </LayoutContainer>
        </div>
        <main
          ref={mainRef}
          className="z-0 flex flex-col flex-grow h-[calc(100%-180px)] sm:h-screen sm:overflow-y-auto"
        >
          <LayoutContainer className="">
            <div className="relative flex flex-col sm:items-center gap-2 pb-2 mt-1 sm:mt-4 mb-2 sm:mb-6 sm:-ml-1 sm:-mr-1 after:left-2 after:right-2 sm:after:h-px after:bg-[#D3CDC4] after:bg-opacity-40 after:absolute after:-bottom-2 after:md:bottom-2 md:mb-1 md:mt-2 md:gap-6 md:flex-row space-between md:pb-0">
              <Navigation stats={stats} />
              <SortingButtons {...sortingButtonsProps} className="ml-4 sm:ml-0" />
            </div>
          </LayoutContainer>
          <LayoutContainer
            className={cx({
              'list sm:mb-4 md:mb-0 md:overflow-y-auto sm:h-auto overflow-y-auto': true,
              'sm:h-screen': !screenHeightLg,
              'flex-grow md:overflow-hidden': screenHeightLg,
            })}
          >
            {childrenWithProps}
          </LayoutContainer>
        </main>
      </div>
      <LayoutContainer className="flex justify-end">
        <ScrollToTopButton containerRef={mainRef} />
      </LayoutContainer>
    </div>
  );
};

export default DiscoverPageLayout;
