import React, { useState, useCallback, useEffect } from 'react';

import { ChevronDown, Menu as MenuIcon } from 'react-feather';
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

import { useCurrentProjectDeveloper } from 'services/project-developers/projectDevelopersService';

import SearchIcon from 'svgs/search.svg';

import { HeaderProps } from './types';

export const Header: React.FC<HeaderProps> = ({
  props: { transparent, className } = {},
}: HeaderProps) => {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const { user } = useMe();
  const projectDeveloper = useCurrentProjectDeveloper(user);
  const investor = undefined;
  // Important!!! Include the current investor when available

  const account = projectDeveloper.data?.attributes || investor;

  const { scrollY }: ReturnType<typeof useWindowScrollPosition> =
    // The `window` check is required because the hook is not SSR-ready yet:
    // https://github.com/imbhargav5/rooks/issues/559
    // eslint-disable-next-line react-hooks/rules-of-hooks
    typeof window === 'undefined' ? { scrollY: 0, scrollX: 0 } : useWindowScrollPosition();
  const showBackground = !transparent || scrollY > 0;

  const [menuOpen, setMenuOpen] = useState(false);
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
            <a className="font-semibold ">HeCo Invest</a>
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
              {user ? (
                <Menu
                  Trigger={
                    <Button
                      className="px-2 sm:px-4 focus-visible:outline-green-dark"
                      theme="naked"
                      size="small"
                      aria-expanded={userMenuOpen}
                      onClick={() => setUserMenuOpen(true)}
                    >
                      <div
                        className={cx('w-8 h-8 rounded-full flex justify-center items-center', {
                          'bg-green-dark text-white': showBackground,
                          'text-green-dark bg-white': !showBackground,
                        })}
                      >
                        {getUserInitials(user)}
                      </div>
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
                          {user.attributes.first_name} {user.attributes.last_name}
                        </span>
                        <span className="block text-gray-400">{user.attributes.email}</span>
                      </div>
                    </div>
                  }
                >
                  <MenuSection>
                    {account && (
                      <MenuItem
                        key={Paths.Dashboard}
                        textValue={`${account.name} ${formatMessage({
                          defaultMessage: 'account',
                          id: 'ESAHMx',
                        })}`}
                      >
                        {account.name} {formatMessage({ defaultMessage: 'account', id: 'ESAHMx' })}
                      </MenuItem>
                    )}
                    <MenuItem key={Paths.Settings}>
                      {formatMessage({ defaultMessage: 'My preferences', id: 'CEQo2w' })}
                    </MenuItem>
                    <MenuItem key={Paths.SignOut}>
                      {formatMessage({ defaultMessage: 'Sign out', id: 'xXbJso' })}
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

            {/* NAVIGATION MENU SM/MD + USER MENU SM */}
            <div className="flex items-center lg:hidden">
              <Menu
                Trigger={
                  <div className="sm:py-2">
                    {/* Button md */}
                    <Button
                      theme={showBackground ? 'primary-green' : 'primary-white'}
                      size="small"
                      aria-expanded={menuOpen}
                      onClick={() => setMenuOpen(true)}
                      className="hidden sm:inline"
                    >
                      <FormattedMessage defaultMessage="Menu" id="tKMlOc" />
                    </Button>
                    {/* Button sm */}
                    <Button
                      theme="naked"
                      size="small"
                      aria-expanded={menuOpen}
                      className="inline px-2 sm:hidden"
                      onClick={() => setMenuOpen(true)}
                    >
                      <MenuIcon />
                    </Button>
                  </div>
                }
                align="end"
                onAction={onClickMenuItem}
                hiddenSections={{ 'user-section': 'sm' }}
              >
                <MenuSection>
                  <MenuItem key="/discover">
                    <FormattedMessage defaultMessage="Search" id="xmcVZ0" />
                  </MenuItem>
                  <MenuItem key="/investors">
                    <FormattedMessage defaultMessage="For investors" id="MfCYKW" />
                  </MenuItem>
                  <MenuItem key="/project-developers">
                    <FormattedMessage defaultMessage="For project developers" id="F1+h/t" />
                  </MenuItem>
                  <MenuItem key="/about">
                    <FormattedMessage defaultMessage="About" id="g5pX+a" />
                  </MenuItem>
                </MenuSection>
                {user ? (
                  <MenuSection key="user-section">
                    {account && (
                      <MenuItem
                        key={Paths.Dashboard}
                        textValue={`${account.name} ${formatMessage({
                          defaultMessage: 'account',
                          id: 'ESAHMx',
                        })}`}
                      >
                        {account.name} {formatMessage({ defaultMessage: 'account', id: 'ESAHMx' })}
                      </MenuItem>
                    )}
                    <MenuItem key={Paths.Settings}>
                      {formatMessage({ defaultMessage: 'My preferences', id: 'CEQo2w' })}
                    </MenuItem>
                    <MenuItem key={Paths.SignOut}>
                      {formatMessage({ defaultMessage: 'Sign out', id: 'xXbJso' })}
                    </MenuItem>
                  </MenuSection>
                ) : (
                  <MenuSection
                    key="user-section-sign-in"
                    title={formatMessage({ defaultMessage: 'User', id: 'EwRIOm' })}
                  >
                    <MenuItem key={Paths.SignIn}>
                      <FormattedMessage defaultMessage="Sign in" id="SQJto2" />
                    </MenuItem>
                  </MenuSection>
                )}
              </Menu>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </header>
  );
};

export default Header;
