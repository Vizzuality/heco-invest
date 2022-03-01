import React, { useState, useCallback } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useWindowScrollPosition } from 'rooks';

import ActiveLink from 'components/active-link';
import Button from 'components/button';
import Icon from 'components/icon';
import LanguageSelector from 'components/language-selector';
import LayoutContainer from 'components/layout-container';
import Menu, { MenuItem, MenuSection } from 'components/menu';

import SearchIcon from 'svgs/search.svg';

import { HeaderProps } from './types';

export const Header: React.FC<HeaderProps> = ({
  props: { transparent, className } = {},
}: HeaderProps) => {
  const router = useRouter();
  const intl = useIntl();

  const { scrollY }: ReturnType<typeof useWindowScrollPosition> =
    // The `window` check is required because the hook is not SSR-ready yet:
    // https://github.com/imbhargav5/rooks/issues/559
    // eslint-disable-next-line react-hooks/rules-of-hooks
    typeof window === 'undefined' ? { scrollY: 0, scrollX: 0 } : useWindowScrollPosition();
  const showBackground = !transparent || scrollY > 0;

  const [menuOpen, setMenuOpen] = useState(false);

  const onClickMenuItem = useCallback(
    (key) => {
      switch (key) {
        case 'sign-in':
          // eslint-disable-next-line no-console
          console.warn('Sign in action not implemented yet!');
          break;
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
        <div className="flex items-center justify-between pt-3 pb-3 md:pt-6 md:pb-4 lg:justify-start lg:space-x-10">
          <Link href="/">
            <a className="font-semibold">HeCo Invest</a>
          </Link>
          <div className="flex items-center space-x-2 lg:hidden">
            <div className="shrink-0">
              <LanguageSelector />
            </div>
            <Menu
              className="shrink-0"
              Trigger={
                <Button
                  theme={showBackground ? 'primary-green' : 'primary-white'}
                  size="small"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen(true)}
                >
                  <FormattedMessage defaultMessage="Menu" id="tKMlOc" />
                </Button>
              }
              disabledKeys={['sign-in']}
              align="end"
              onAction={onClickMenuItem}
            >
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
              <MenuSection
                key="user-section"
                title={intl.formatMessage({ defaultMessage: 'User', id: 'EwRIOm' })}
              >
                <MenuItem key="sign-in">
                  <FormattedMessage defaultMessage="Sign in" id="SQJto2" />
                </MenuItem>
              </MenuSection>
            </Menu>
          </div>
          <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-end">
            <nav className="flex space-x-8">
              <ActiveLink href="/discover" activeClassName="font-semibold">
                <a title={intl.formatMessage({ defaultMessage: 'Search', id: 'xmcVZ0' })}>
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
            <div className="flex items-center space-x-6 md:ml-4">
              <div className="shrink-0">
                <LanguageSelector />
              </div>
              <Button
                theme={showBackground ? 'primary-green' : 'primary-white'}
                size="small"
                className="shrink-0"
                disabled
              >
                <FormattedMessage defaultMessage="Sign in" id="SQJto2" />
              </Button>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </header>
  );
};

export default Header;
