import React, { FC, useMemo } from 'react';

import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import Head from 'components/head';
import { Paths } from 'enums';
import DashboardLayout from 'layouts/dashboard/component';

import {
  useFavoriteInvestorsList,
  useFavoriteProjectDevelopersList,
  useFavoriteProjectsList,
} from 'services/account/favoritesService';

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

  const {
    data: projects,
    isLoading: isLoadingProjects,
    isFetching: isFetchingProjects,
  } = useFavoriteProjectsList(defaultQueryParams, defaultQueryOptions);

  const {
    data: investors,
    isLoading: isLoadingInvestors,
    isFetching: isFetchingInvestors,
  } = useFavoriteInvestorsList(defaultQueryParams, defaultQueryOptions);

  const {
    data: projectDevelopers,
    isLoading: isLoadingProjectDevelopers,
    isFetching: isFetchingProjectDevelopers,
  } = useFavoriteProjectDevelopersList(defaultQueryParams, defaultQueryOptions);

  const stats = {
    projects: projects?.meta?.total,
    projectDevelopers: projectDevelopers?.meta?.total,
    investors: investors?.meta?.total,
    openCalls: 0,
  };

  const { data, meta, loading } = useMemo(() => {
    // TODO: Find a way to improve this.
    if (pathname.startsWith(Paths.DashboardFavoritesProjects)) {
      return {
        ...projects,
        loading: isLoadingProjects || isFetchingProjects,
      };
    }

    if (pathname.startsWith(Paths.DashboardFavoritesProjectDevelopers)) {
      return {
        ...projectDevelopers,
        loading: isLoadingProjectDevelopers || isFetchingProjectDevelopers,
      };
    }

    if (pathname.startsWith(Paths.DashboardFavoritesInvestors)) {
      return {
        ...investors,
        loading: isLoadingInvestors || isFetchingInvestors,
      };
    }

    // if (router.pathname.startsWith(Paths.DashboardFavoritesOpenCalls)) return openCalls;
  }, [
    pathname,
    projects,
    isLoadingProjects,
    isFetchingProjects,
    projectDevelopers,
    isLoadingProjectDevelopers,
    isFetchingProjectDevelopers,
    investors,
    isLoadingInvestors,
    isFetchingInvestors,
  ]) || { data: [], meta: [] };

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
        sidebar={<Navigation className="-ml-6 -mb-14 md:mt-8 md:sticky md:top-16" stats={stats} />}
      >
        <div className="relative">{childrenWithProps}</div>
      </DashboardLayout>
    </>
  );
};

export default DashboardFavoritesLayout;
