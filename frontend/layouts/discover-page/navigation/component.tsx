import { FC } from 'react';

import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import BadgeNavigation from 'components/badge-navigation';
import { Paths } from 'enums';

import { NavigationProps } from './types';

export const Navigation: FC<NavigationProps> = ({ stats }: NavigationProps) => {
  const intl = useIntl();
  const { asPath, query } = useRouter();

  // Pick the query params we want to preserve in the navigation links (search, filters, sorting)
  const queryParams = {
    ...(query.search && { search: query.search as string }),
    // TODO: Filters
    // TODO: Sorting
  };

  // Build a query string to append to each link
  const queryString = Object.keys(queryParams).length
    ? `?${new URLSearchParams(queryParams).toString()}`
    : '';

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

  const activeId = navigationItems.find(({ path }) => asPath.startsWith(path))?.id;

  return (
    <div className="flex items-center w-full pb-3 -mb-3 overflow-x-scroll">
      <BadgeNavigation
        className="flex items-center justify-center flex-grow"
        activeId={activeId}
        items={navigationItems}
      />
    </div>
  );
};

export default Navigation;
