import React, { FC, useEffect, useMemo, useState } from 'react';

import cx from 'classnames';

import { useRouter } from 'next/router';

import DiscoverSearch from 'containers/discover-search';

import LayoutContainer from 'components/layout-container';
import { Paths } from 'enums';

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

  // We're keeping data in a state so that, while we're fetching new data,
  // we can keep the existing one visible in the screen (and add a loading spinner).
  const [projects, setProjects] = useState({ data: undefined, meta: undefined });

  const queryParams = useMemo(
    () => ({
      page: parseInt(query.page as string) || 1,
      search: (query.search as string) || '',
    }),
    [query]
  );

  const {
    data: projectsData,
    isFetching: isFetchingProjects,
    isLoading: isLoadingProjects,
  } = useProjectsList(queryParams);

  useEffect(() => {
    if (isFetchingProjects) return;
    setProjects(projectsData);
  }, [isFetchingProjects, projectsData]);

  const stats = {
    projects: projects?.meta?.total,
    projectDevelopers: 0,
    investors: 0,
    openCalls: 0,
  };

  const { data, meta, loading } = useMemo(() => {
    // TODO: Find a way to improve this.
    if (router.pathname.startsWith(Paths.Projects))
      return { ...projects, loading: isLoadingProjects };
    // if (router.pathname.startsWith(Paths.ProjectDevelopers)) return projectDevelopers;
    // if (router.pathname.startsWith(Paths.Investors)) return investors;
    // if (router.pathname.startsWith(Paths.OpenCalls)) return openCalls;
  }, [isLoadingProjects, projects, router.pathname]) || { data: [], meta: [] };

  const handleSearch = (searchText: string) => {
    router.push({ query: { ...queryParams, page: 1, search: searchText } });
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
          <Header />
          <LayoutContainer className="z-10 flex justify-center pt-1 mt-20 mb-2 pointer-events-none xl:mb-6 xl:mt-0 xl:left-0 xl:right-0 xl:h-20 xl:fixed xl:top-3">
            <DiscoverSearch
              className="w-full max-w-3xl pointer-events-auto"
              defaultValue={queryParams.search}
              onSearch={handleSearch}
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
