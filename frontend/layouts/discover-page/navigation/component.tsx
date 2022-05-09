import { FC } from 'react';

import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import BadgeNavigation from 'components/badge-navigation';
import { Paths } from 'enums';

import { NavigationProps } from './types';

export const Navigation: FC<NavigationProps> = ({ stats }: NavigationProps) => {
  const intl = useIntl();
  const { asPath } = useRouter();

  const navigationItems = [
    {
      id: 'projects',
      name: intl.formatMessage({ defaultMessage: 'Projects', id: 'UxTJRa' }),
      link: Paths.Projects,
      number: stats?.projects,
    },
    {
      id: 'open-calls',
      name: intl.formatMessage({ defaultMessage: 'Open Calls', id: 'wpyHb9' }),
      link: Paths.OpenCalls,
      number: stats?.openCalls,
    },
    {
      id: 'project-developers',
      name: intl.formatMessage({ defaultMessage: 'Project Developers', id: '+K9fF0' }),
      link: Paths.ProjectDevelopers,
      number: stats?.projectDevelopers,
    },
    {
      id: 'investors',
      name: intl.formatMessage({ defaultMessage: 'Investors', id: 'zdIaHp' }),
      link: Paths.Investors,
      number: stats?.investors,
    },
  ];

  const activeId = navigationItems.find(({ id, link }) => asPath.startsWith(link))?.id;

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
