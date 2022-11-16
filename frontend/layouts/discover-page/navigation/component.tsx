import { FC } from 'react';

import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { useQueryString } from 'helpers/pages';

import BadgeNavigation from 'components/badge-navigation';
import { Paths } from 'enums';

import { defaultSorting } from '../helpers';

import { NavigationProps } from './types';

export const Navigation: FC<NavigationProps> = ({ stats }: NavigationProps) => {
  const intl = useIntl();
  const { pathname } = useRouter();

  // Pick the the query params we want to preserve in the navigation links (search, filters). The page and sorting will always change to default when changing tabs.
  const queryString = useQueryString({
    page: null,
    sorting: `${defaultSorting.sortBy} ${defaultSorting.sortOrder}`,
  });

  const navigationItems = [
    {
      id: 'projects',
      name: intl.formatMessage({ defaultMessage: 'Projects', id: 'UxTJRa' }),
      path: Paths.Projects,
      link: `${Paths.Projects}${queryString}`,
      number: stats?.projects,
    },
    {
      id: 'open-calls',
      name: intl.formatMessage({ defaultMessage: 'Open Calls', id: 'wpyHb9' }),
      path: Paths.OpenCalls,
      link: `${Paths.OpenCalls}${queryString}`,
      number: stats?.openCalls,
    },
    {
      id: 'project-developers',
      name: intl.formatMessage({ defaultMessage: 'Project Developers', id: '+K9fF0' }),
      path: Paths.ProjectDevelopers,
      link: `${Paths.ProjectDevelopers}${queryString}`,
      number: stats?.projectDevelopers,
    },
    {
      id: 'investors',
      name: intl.formatMessage({ defaultMessage: 'Investors', id: 'zdIaHp' }),
      path: Paths.Investors,
      link: `${Paths.Investors}${queryString}`,
      number: stats?.investors,
    },
  ];

  const activeId = navigationItems.find(({ path }) => pathname.startsWith(path))?.id;

  return (
    <div className="flex overflow-x-auto">
      <BadgeNavigation activeId={activeId} items={navigationItems} />
    </div>
  );
};

export default Navigation;
