import React, { useState, useCallback } from 'react';

import { ChevronDown } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useWindowScrollPosition } from 'rooks';

import useMe from 'hooks/me';

import { getUserInitials } from 'helpers/user';

import ActiveLink from 'components/active-link';
import Button from 'components/button';
import Icon from 'components/icon';
import LanguageSelector from 'components/language-selector';
import LayoutContainer from 'components/layout-container';
import Menu, { MenuItem, MenuSection } from 'components/menu';
import { Paths } from 'enums';
import NavigationMenuButton from 'layouts/shared/navigation-menu-button';

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

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const onClickMenuItem = useCallback(
    (key) => {
      switch (key) {
        default:
          router.push(key);
          break;
      }
    },
    [router]
  );

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

            {/* SELECT LANGUAGE MENU */}
            <div className="self-center">
              <LanguageSelector />
            </div>

            {/* USER MENU (MD/LG)*/}
            <div className="items-center hidden sm:flex">
              {!!user ? (
                <Menu
                  Trigger={
                    <Button
                      aria-label={formatMessage({ defaultMessage: 'User menu', id: '6b2CRH' })}
                      className="px-2 sm:px-4 focus-visible:outline-green-dark"
                      theme="naked"
                      size="small"
                      aria-expanded={userMenuOpen}
                      onClick={() => setUserMenuOpen(true)}
                    >
                      <span
                        className={cx('w-8 h-8 rounded-full flex justify-center items-center', {
                          'bg-green-dark text-white': showBackground,
                          'text-green-dark bg-white': !showBackground,
                        })}
                      >
                        {getUserInitials(user)}
                      </span>
                      <ChevronDown className="inline-block w-4 h-4 ml-1" />
                    </Button>
                  }
                  onAction={onClickMenuItem}
                  align="end"
                  direction="bottom"
                  className="md:p-4 md:py-1 lg:pr-0"
                  header={
                    <div className="flex">
                      <div className="flex items-center justify-center w-12 h-12 mr-2 text-white rounded-full bg-green-dark">
                        {getUserInitials(user)}
                      </div>
                      <div className="pb-2 pl-2 pr-2 border-b border-bg-dark">
                        <span className="text-green-dark">
                          {user.first_name} {user.last_name}
                        </span>
                        <span className="block text-gray-400">{user.email}</span>
                      </div>
                    </div>
                  }
                >
                  <MenuSection>
                    {!!account && (
                      <MenuItem
                        key={Paths.Dashboard}
                        textValue={formatMessage(
                          {
                            defaultMessage: '{accountName} account',
                            id: 'YE6fVO',
                          },
                          { accountName: account.name }
                        )}
                      >
                        <FormattedMessage
                          defaultMessage="{accountName} account"
                          id="YE6fVO"
                          values={{
                            accountName: account.name,
                          }}
                        />
                      </MenuItem>
                    )}
                    <MenuItem key={Paths.Settings}>
                      <FormattedMessage defaultMessage="My preferences" id="CEQo2w" />{' '}
                    </MenuItem>
                    <MenuItem key={Paths.SignOut}>
                      <FormattedMessage defaultMessage="Sign out" id="xXbJso" />
                    </MenuItem>
                  </MenuSection>
                </Menu>
              ) : (
                <Button
                  theme={showBackground ? 'primary-green' : 'primary-white'}
                  size="small"
                  className="hidden lg:block"
                  to={Paths.SignIn}
                >
                  <FormattedMessage defaultMessage="Sign in" id="SQJto2" />
                </Button>
              )}
            </div>

            <NavigationMenuButton
              className="flex lg:hidden"
              theme={showBackground ? 'primary-green' : 'primary-white'}
            />
          </div>
        </div>
      </LayoutContainer>
    </header>
  );
};

export default Header;
