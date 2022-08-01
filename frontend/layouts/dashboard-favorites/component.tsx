import { FC } from 'react';

import { useIntl } from 'react-intl';

import Head from 'components/head';
import DashboardLayout from 'layouts/dashboard/component';

import Navigation from './navigation';
import { DashboardFavoritesLayoutProps } from './types';

export const DashboardFavoritesLayout: FC<DashboardFavoritesLayoutProps> = ({
  children,
}: DashboardFavoritesLayoutProps) => {
  const intl = useIntl();

  const stats = {
    projects: 0,
    projectDevelopers: 0,
    investors: 0,
    openCalls: 0,
  };

  return (
    <>
      <Head title={intl.formatMessage({ defaultMessage: 'My favorites', id: '50bxrQ' })} />
      <DashboardLayout sidebar={<Navigation className="mt-8 -ml-6" stats={stats} />}>
        {children}
      </DashboardLayout>
    </>
  );
};

export default DashboardFavoritesLayout;
