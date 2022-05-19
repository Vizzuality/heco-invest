import React, { FC, useEffect, useMemo, useState } from 'react';

import cx from 'classnames';

import { useRouter } from 'next/router';

import DiscoverSearch from 'containers/layouts/discover-search';

import LayoutContainer from 'components/layout-container';
import { Paths } from 'enums';

import { useProjectDevelopersList } from 'services/project-developers/projectDevelopersService';
import { useProjectsList } from 'services/projects/projectService';

import Header from './header';
import Navigation from './navigation';
import { DiscoverPageLayoutProps } from './types';

export const DiscoverPageLayout: FC<DiscoverPageLayoutProps> = ({
  screenHeightLg = false,
  children,
}: DiscoverPageLayoutProps) => {
  const router = useRouter();
  const { query } = router;

  // This shouldn't be needed, but due to CSS positioning / z-index issues we need to have the DiscoverSearch
  // components both in the header and in this layout; which one is visible depends on the screen resolution.
  // These states are here to keep both DiscoverSearch in sync, in case the user resizes their screen.
  const [searchInputValue, setSearchInputValue] = useState('');

  const queryParams = useMemo(
    () => ({
      page: parseInt(query.page as string) || 1,
      search: (query.search as string) || '',
    }),
    [query]
  );

  const queryOptions = { keepPreviousData: false };

  const {
    data: projects,
    isLoading: isLoadingProjects,
    isFetching: isFetchingProjects,
  } = useProjectsList({ ...queryParams, includes: ['project_developer'] }, queryOptions);

  const {
    data: projectDevelopers,
    isLoading: isLoadingProjectDevelopers,
    isFetching: isFetchingProjectDevelopers,
  } = useProjectDevelopersList({ ...queryParams, perPage: 9 }, queryOptions);

  const stats = {
    projects: projects?.meta?.total,
    projectDevelopers: projectDevelopers?.meta?.total,
    investors: 0,
    openCalls: 0,
  };

  const { data, meta, loading } = useMemo(() => {
    // TODO: Find a way to improve this.
    if (router.pathname.startsWith(Paths.Projects))
      return { ...projects, loading: isLoadingProjects || isFetchingProjects };
    if (router.pathname.startsWith(Paths.ProjectDevelopers)) {
      return {
        ...projectDevelopers,
        loading: isLoadingProjectDevelopers || isFetchingProjectDevelopers,
      };
    }
    // if (router.pathname.startsWith(Paths.Investors)) return investors;
    // if (router.pathname.startsWith(Paths.OpenCalls)) return openCalls;
  }, [
    isFetchingProjectDevelopers,
    isFetchingProjects,
    isLoadingProjectDevelopers,
    isLoadingProjects,
    projectDevelopers,
    projects,
    router.pathname,
  ]) || { data: [], meta: [] };

  useEffect(() => {
    setSearchInputValue(queryParams.search);
  }, [queryParams.search]);

  const handleSearch = (searchText: string) => {
    router.push({ query: { ...queryParams, page: 1, search: searchText } }, undefined, {
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
      <div className="flex flex-col h-screen">
        <div>
          <Header {...discoverSearchProps} />
          <LayoutContainer className="z-10 flex justify-center pt-1 mt-20 mb-2 pointer-events-none xl:hidden xl:mb-6 xl:mt-0 xl:left-0 xl:right-0 xl:h-20 xl:fixed xl:top-3">
            <DiscoverSearch
              className="w-full max-w-3xl pointer-events-auto"
              {...discoverSearchProps}
            />
          </LayoutContainer>
        </div>
        <main className="flex flex-col flex-grow h-screen overflow-y-scroll">
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
