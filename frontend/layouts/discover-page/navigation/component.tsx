import { FC } from 'react';

import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { useQueryString } from 'helpers/pages';

import BadgeNavigation from 'components/badge-navigation';
import { Paths } from 'enums';
import { logEvent } from 'lib/analytics/ga';

import { defaultSorting } from '../helpers';

import { NavigationProps } from './types';

export const Navigation: FC<NavigationProps> = ({ stats }: NavigationProps) => {
  const intl = useIntl();
  const { pathname } = useRouter();

  // Pick the the query params we want to preserve in the navigation links (search, filters). The
  // page and sorting will always change to default when changing tabs.
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
    <div
      // The `relative`, `-mx-4` and `sm:mx-0` classes are used by the before and after
      // pseudo-elements of the `<BadgeNavigation />` component below
      className="relative flex -mx-4 overflow-x-auto sm:mx-0"
    >
      <BadgeNavigation
        activeId={activeId}
        items={navigationItems}
        // The `before:*` and `after:*` classes are used to fade out the navigation items on the
        // sides on mobile
        className="px-4 sm:px-0 before:absolute before:left-0 before:top-0 before:w-4 before:h-[calc(100%_-_theme(spacing.2))] before:bg-gradient-to-r before:via-background-green-dark/70 before:from-background-green-dark before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:w-4 after:h-[calc(100%_-_theme(spacing.2))] after:bg-gradient-to-l after:via-background-green-dark/70 after:from-background-green-dark after:to-transparent after:z-10 sm:before:hidden sm:after:hidden"
        onClick={(id) => logEvent('click_tab_in_catalogue', { tab_name: id })}
      />
    </div>
  );
};

export default Navigation;
