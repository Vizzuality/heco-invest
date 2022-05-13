import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useWindowScrollPosition } from 'rooks';

import useMe from 'hooks/me';

import ActiveLink from 'components/active-link';
import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';
import LanguageSelector from 'layouts/shared/language-selector';
import NavigationMenuButton from 'layouts/shared/navigation-menu-button';
import UserMenu from 'layouts/shared/user-menu';

import { useCurrentProjectDeveloper } from 'services/project-developers/projectDevelopersService';

import SearchIcon from 'svgs/search.svg';

import { HeaderProps } from './types';

export const Header: React.FC<HeaderProps> = ({
  props: { transparent, className } = {},
}: HeaderProps) => {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const { user } = useMe();
  const { projectDeveloper } = useCurrentProjectDeveloper(user);
  const investor = undefined;
  // Important!!! Include the current investor when available

  const account = projectDeveloper || investor;

  const { scrollY }: ReturnType<typeof useWindowScrollPosition> =
    // The `window` check is required because the hook is not SSR-ready yet:
    // https://github.com/imbhargav5/rooks/issues/559
    // eslint-disable-next-line react-hooks/rules-of-hooks
    typeof window === 'undefined' ? { scrollY: 0, scrollX: 0 } : useWindowScrollPosition();
  const showBackground = !transparent || scrollY > 0;

  return (
    <header
      className={cx({
        'fixed top-0 w-full z-10 transition-colors': true,
        'text-white': !showBackground,
        'bg-background-light/90 backdrop-blur-sm': showBackground,
        [className]: !!className,
      })}
    >
      <LayoutContainer>
        <div className="flex items-center justify-between pt-3 pb-3 md:pt-6 md:pb-4 lg:space-x-10">
          <Link href="/">
            <a className="font-semibold">HeCo Invest</a>
          </Link>
          <div className="flex">
            {/* NAVIGATION MENU LG */}
            <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-end lg:mr-4">
              <nav className="flex space-x-8">
                <ActiveLink href="/discover" activeClassName="font-semibold">
                  <a title={formatMessage({ defaultMessage: 'Search', id: 'xmcVZ0' })}>
                    <Icon icon={SearchIcon} />
                  </a>
                </ActiveLink>
                <ActiveLink href="/investors" activeClassName="font-semibold">
                  <a>
                    <FormattedMessage defaultMessage="For investors" id="MfCYKW" />
                  </a>
                </ActiveLink>
                <ActiveLink href="/project-developers" activeClassName="font-semibold">
                  <a>
                    <FormattedMessage defaultMessage="For project developers" id="F1+h/t" />
                  </a>
                </ActiveLink>
                <ActiveLink href="/about" activeClassName="font-semibold">
                  <a>
                    <FormattedMessage defaultMessage="About" id="g5pX+a" />
                  </a>
                </ActiveLink>
              </nav>
            </div>

            <div className="flex items-center gap-1 lg:gap-2">
              <LanguageSelector />
              <UserMenu
                className="hidden sm:flex"
                theme={showBackground ? 'primary-green' : 'primary-white'}
              />
              <NavigationMenuButton
                className="flex lg:hidden"
                theme={showBackground ? 'primary-green' : 'primary-white'}
              />
            </div>
          </div>
        </div>
      </LayoutContainer>
    </header>
  );
};

export default Header;
