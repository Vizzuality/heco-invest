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
    // TODO: Implement pagination. Infinite scroll perhaps?
    perPage: 10000,
  };

  const {
    data: projects,
    isLoading: isLoadingProjects,
    isFetching: isFetchingProjects,
    isRefetching: isRefetchingProjects,
  } = useFavoriteProjectsList(defaultQueryParams);

  const {
    data: investors,
    isLoading: isLoadingInvestors,
    isFetching: isFetchingInvestors,
    isRefetching: isRefetchingInvestors,
  } = useFavoriteInvestorsList(defaultQueryParams);

  const {
    data: projectDevelopers,
    isLoading: isLoadingProjectDevelopers,
    isFetching: isFetchingProjectDevelopers,
    isRefetching: isRefetchingProjectDevelopers,
  } = useFavoriteProjectDevelopersList(defaultQueryParams);

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
        loading: isLoadingProjects || (isFetchingProjects && !isRefetchingProjects),
      };
    }

    if (pathname.startsWith(Paths.DashboardFavoritesProjectDevelopers)) {
      return {
        ...projectDevelopers,
        loading:
          isLoadingProjectDevelopers ||
          (isFetchingProjectDevelopers && !isRefetchingProjectDevelopers),
      };
    }

    if (pathname.startsWith(Paths.DashboardFavoritesInvestors)) {
      return {
        ...investors,
        loading: isLoadingInvestors || (isFetchingInvestors && !isRefetchingInvestors),
      };
    }

    // if (router.pathname.startsWith(Paths.DashboardFavoritesOpenCalls)) return openCalls;
  }, [
    pathname,
    projects,
    isLoadingProjects,
    isFetchingProjects,
    isRefetchingProjects,
    projectDevelopers,
    isLoadingProjectDevelopers,
    isFetchingProjectDevelopers,
    isRefetchingProjectDevelopers,
    investors,
    isLoadingInvestors,
    isFetchingInvestors,
    isRefetchingInvestors,
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
      <DashboardLayout sidebar={<Navigation className="mt-8 -ml-6" stats={stats} />}>
        {childrenWithProps}
      </DashboardLayout>
    </>
  );
};

export default DashboardFavoritesLayout;
