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
        id: Paths.UserInformation,
        name: intl.formatMessage({ defaultMessage: 'Information', id: 'E80WrK' }),
        restricted: UserRoles.ProjectDeveloper,
      },
      {
        id: Paths.UserPassword,
        name: intl.formatMessage({ defaultMessage: 'Password', id: '5sg7KC' }),
        restricted: UserRoles.ProjectDeveloper,
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
      <nav>
        <ol className="flex flex-wrap -mx-2 gap-y-2 gap-x-4 whitespace-nowrap">
          {links.map(({ id, name, restricted }) => {
            const roles = (Array.isArray(restricted) ? restricted : [restricted]).filter(
              (role) => !!role
            );

            if (roles.length && !roles.includes(userRole)) return;

            const isActive = id === activeLinkId;

            return (
              <li key={id} className="transition-all">
                <Link key={id} href={id}>
                  <a
                    className={cx({
                      'px-2 rounded-full transition-all': true,
                      'focus-visible:outline focus-visible:outline-green-dark focus-visible:outline-2 focus-visible:outline-offset-2':
                        true,
                      'font-semibold': isActive,
                    })}
                    aria-current={isActive ? 'location' : false}
                  >
                    {name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Navigation;
