import React, { FC, useEffect, useMemo, useState } from 'react';

import cx from 'classnames';

import { useRouter } from 'next/router';

import { UseQueryOptions } from 'react-query/types/react';

import { useQueryParams } from 'helpers/pages';

import DiscoverSearch from 'containers/layouts/discover-search';

import LayoutContainer from 'components/layout-container';
import { Paths } from 'enums';
import { Project } from 'types/project';

import { useProjectsList } from 'services/projects/projectService';
import { PagedResponse } from 'services/types';

import Header from './header';
import Navigation from './navigation';
import { DiscoverPageLayoutProps } from './types';

export const DiscoverPageLayout: FC<DiscoverPageLayoutProps> = ({
  screenHeightLg = false,
  children,
}: DiscoverPageLayoutProps) => {
  const { push, pathname } = useRouter();

  // This shouldn't be needed, but due to CSS positioning / z-index issues we need to have the DiscoverSearch
  // components both in the header and in this layout; which one is visible depends on the screen resolution.
  // These states are here to keep both DiscoverSearch in sync, in case the user resizes their screen.
  const [searchInputValue, setSearchInputValue] = useState('');

  const queryParams = useQueryParams();

  const queryOptions: UseQueryOptions<PagedResponse<Project>> = { keepPreviousData: true };

  const {
    data: projects,
    isLoading: isLoadingProjects,
    isFetching: isFetchingProjects,
  } = useProjectsList(queryParams, queryOptions);

  const stats = {
    projects: projects?.meta?.total,
    projectDevelopers: 0,
    investors: 0,
    openCalls: 0,
  };

  const { data, meta, loading } = useMemo(() => {
    // TODO: Find a way to improve this.
    if (pathname.startsWith(Paths.Projects))
      return { ...projects, loading: isLoadingProjects || isFetchingProjects };
    // if (router.pathname.startsWith(Paths.ProjectDevelopers)) return projectDevelopers;
    // if (router.pathname.startsWith(Paths.Investors)) return investors;
    // if (router.pathname.startsWith(Paths.OpenCalls)) return openCalls;
  }, [isFetchingProjects, isLoadingProjects, projects, pathname]) || { data: [], meta: [] };

  useEffect(() => {
    const { search } = queryParams;
    setSearchInputValue(search);
  }, [queryParams]);

  const handleSearch = (searchText: string) => {
    push({ query: { ...queryParams, page: 1, search: searchText } }, undefined, {
      shallow: true,
    });
  };

  const discoverSearchProps = {
    searchText: searchInputValue,
    onSearch: handleSearch,
    onSearchChange: setSearchInputValue,
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
            <div className="flex items-center gap-6 mt-2 mb-4 space-between">
              {/*<div>Sort</div>*/}
              <Navigation stats={stats} />
              {/*<div>Share</div>*/}
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
