import React, { FC, useMemo } from 'react';

import { useIntl } from 'react-intl';
import { UseQueryResult } from 'react-query';

import { useRouter } from 'next/router';

import Head from 'components/head';
import { Paths } from 'enums';
import DashboardLayout from 'layouts/dashboard/component';

import {
  useFavoriteInvestorsList,
  useFavoriteProjectDevelopersList,
  useFavoriteProjectsList,
  useFavoriteOpenCallsList,
} from 'services/account/favoritesService';
import { PagedResponse } from 'services/types';

import Navigation from './navigation';
import { DashboardFavoritesLayoutProps } from './types';

export const DashboardFavoritesLayout: FC<DashboardFavoritesLayoutProps> = ({
  children,
}: DashboardFavoritesLayoutProps) => {
  const intl = useIntl();
  const { pathname } = useRouter();

  const defaultQueryParams = {
    perPage: 10000, // TODO: Implement pagination. Infinite scroll perhaps?
  };

  const defaultQueryOptions = {
    refetchOnMount: true, // Fix issues with react-query not refetching stale data
    keepPreviousData: false,
  };

  const projects = useFavoriteProjectsList(defaultQueryParams, defaultQueryOptions);
  const investors = useFavoriteInvestorsList(defaultQueryParams, defaultQueryOptions);
  const projectDevelopers = useFavoriteProjectDevelopersList(
    defaultQueryParams,
    defaultQueryOptions
  );
  const openCalls = useFavoriteOpenCallsList(
    { ...defaultQueryParams, includes: ['investor'] },
    defaultQueryOptions
  );

  const stats = useMemo(
    () => ({
      projects: projects.data?.meta.total,
      projectDevelopers: projectDevelopers.data?.meta.total,
      investors: investors.data?.meta.total,
      openCalls: openCalls.data?.meta.total,
    }),
    [projects, investors, projectDevelopers, openCalls]
  );

  const getFavoriteCurrentData = (data: UseQueryResult<PagedResponse<any>>) => {
    return {
      data: data.data?.data,
      meta: data.data?.meta,
      loading: data.isLoading || data?.isFetching,
    };
  };

  const { data, meta, loading } = useMemo(() => {
    if (pathname.startsWith(Paths.DashboardFavoritesProjects))
      return getFavoriteCurrentData(projects);
    if (pathname.startsWith(Paths.DashboardFavoritesProjectDevelopers))
      return getFavoriteCurrentData(projectDevelopers);
    if (pathname.startsWith(Paths.DashboardFavoritesInvestors))
      return getFavoriteCurrentData(investors);
    if (pathname.startsWith(Paths.DashboardFavoritesOpenCalls))
      return getFavoriteCurrentData(openCalls);
  }, [pathname, projects, projectDevelopers, investors, openCalls]) || { data: [], meta: [] };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { data, meta, loading });
    }

    return child;
  });

  return (
    <>
      <Head title={intl.formatMessage({ defaultMessage: 'My favorites', id: '50bxrQ' })} />
      <DashboardLayout
        isLoading={loading}
        sidebar={<Navigation className="-ml-6 md:mt-8 md:sticky md:top-16" stats={stats} />}
      >
        <div className="relative">{childrenWithProps}</div>
      </DashboardLayout>
    </>
  );
};

export default DashboardFavoritesLayout;
