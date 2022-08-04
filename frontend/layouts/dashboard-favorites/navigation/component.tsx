import { FC } from 'react';

import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import BadgeNavigation from 'components/badge-navigation';
import { Paths } from 'enums';

import { NavigationProps } from './types';

export const Navigation: FC<NavigationProps> = ({ className, stats }: NavigationProps) => {
  const intl = useIntl();
  const { asPath } = useRouter();

  const navigationItems = [
    {
      id: 'projects',
      name: intl.formatMessage({ defaultMessage: 'Projects', id: 'UxTJRa' }),
      link: Paths.DashboardFavoritesProjects,
      number: stats?.projects,
    },
    {
      id: 'open-calls',
      name: intl.formatMessage({ defaultMessage: 'Open calls', id: 'OBhULP' }),
      link: Paths.DashboardFavoritesOpenCalls,
      number: stats?.openCalls,
    },
    {
      id: 'investors',
      name: intl.formatMessage({ defaultMessage: 'Investors', id: 'zdIaHp' }),
      link: Paths.DashboardFavoritesInvestors,
      number: stats?.investors,
    },
    {
      id: 'project-developers',
      name: intl.formatMessage({ defaultMessage: 'Project developers', id: '0wBg9P' }),
      link: Paths.DashboardFavoritesProjectDevelopers,
      number: stats?.projectDevelopers,
    },
  ];

  // Default to `projects` (in case the user is accessing just `/dashboard/favorites`)
  const activeId =
    navigationItems.find(({ link }) => asPath.startsWith(link))?.id ?? navigationItems[0]?.id;

  return (
    <BadgeNavigation
      className={className}
      orientation="vertical"
      badgePosition="left"
      theme="simple"
      activeId={activeId}
      items={navigationItems}
    />
  );
};

export default Navigation;
