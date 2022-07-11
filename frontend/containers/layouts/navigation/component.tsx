import { FC } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import ActiveLink from 'components/active-link';
import Icon from 'components/icon';
import { Paths } from 'enums';

import SearchIcon from 'svgs/search.svg';

import { NavigationProps } from './types';

export const Navigation: FC<NavigationProps> = ({ className }: NavigationProps) => {
  const intl = useIntl();

  return (
    <div className={className}>
      <nav className="flex space-x-8">
        <ActiveLink href={Paths.Discover} activeClassName="font-semibold">
          <a title={intl.formatMessage({ defaultMessage: 'Search', id: 'xmcVZ0' })}>
            <Icon icon={SearchIcon} />
          </a>
        </ActiveLink>
        <ActiveLink href={Paths.ForInvestors} activeClassName="font-semibold">
          <a>
            <FormattedMessage defaultMessage="For investors" id="MfCYKW" />
          </a>
        </ActiveLink>
        <ActiveLink href={Paths.ForProjecDevelopers} activeClassName="font-semibold">
          <a>
            <FormattedMessage defaultMessage="For project developers" id="F1+h/t" />
          </a>
        </ActiveLink>
        <ActiveLink href={Paths.About} activeClassName="font-semibold">
          <a>
            <FormattedMessage defaultMessage="About" id="g5pX+a" />
          </a>
        </ActiveLink>
      </nav>
    </div>
  );
};

export default Navigation;
