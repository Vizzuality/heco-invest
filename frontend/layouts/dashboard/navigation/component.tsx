import { FC, useMemo } from 'react';

import { useIntl } from 'react-intl';

import cx from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Paths, UserRoles } from 'enums';

import { NavigationProps } from './types';

export const Navigation: FC<NavigationProps> = ({ className, userRole }: NavigationProps) => {
  const intl = useIntl();
  const { asPath } = useRouter();

  const links = useMemo(
    () => [
      {
        id: Paths.DashboardProjects,
        name: intl.formatMessage({ defaultMessage: 'Projects', id: 'UxTJRa' }),
        restricted: UserRoles.ProjectDeveloper,
      },
      {
        id: Paths.DashboardOpenCallApplications,
        name: intl.formatMessage({ defaultMessage: 'Open call applications', id: 'daUTdN' }),
        restricted: UserRoles.ProjectDeveloper,
      },
      {
        id: Paths.DashboardOpenCalls,
        name: intl.formatMessage({ defaultMessage: 'Open calls', id: 'OBhULP' }),
        restricted: UserRoles.Investor,
      },
      {
        id: Paths.DashboardFavorites,
        name: intl.formatMessage({ defaultMessage: 'Favorites', id: 'SMrXWc' }),
      },
      {
        id: Paths.DashboardUsers,
        name: intl.formatMessage({ defaultMessage: 'Users', id: 'YDMrKK' }),
      },
      {
        id: Paths.DashboardAccountInfo,
        name: intl.formatMessage({ defaultMessage: 'Account information', id: 'CzsYIe' }),
      },
    ],
    [intl]
  );

  const activeLinkId = useMemo(
    () => links.find(({ id }) => asPath.startsWith(id))?.id,
    [asPath, links]
  );

  return (
    <div className={className}>
      <div className="flex flex-wrap font-normal gap-y-2 gap-x-8">
        {links.map(({ id, name, restricted }) => {
          const roles = (Array.isArray(restricted) ? restricted : [restricted]).filter(
            (role) => !!role
          );

          if (roles.length && !roles.includes(userRole)) return;

          return (
            <Link key={id} href={id}>
              <a
                className={cx({
                  'font-semibold': id === activeLinkId,
                })}
              >
                {name}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
