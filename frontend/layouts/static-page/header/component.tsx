import React, { useState, useCallback } from 'react';

import cx from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { T, useT } from '@transifex/react';
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
  const t = useT();

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
                  <T _str="Menu" />
                </Button>
              }
              disabledKeys={['sign-in']}
              align="end"
              onAction={onClickMenuItem}
            >
              <MenuItem key="/discover">
                <T _str="Search" />
              </MenuItem>
              <MenuItem key="/investors">
                <T _str="For investors" />
              </MenuItem>
              <MenuItem key="/project-developers">
                <T _str="For project developers" />
              </MenuItem>
              <MenuItem key="/about">
                <T _str="About" />
              </MenuItem>
              <MenuSection key="user-section" title={t('User')}>
                <MenuItem key="sign-in">
                  <T _str="Sign in" />
                </MenuItem>
              </MenuSection>
            </Menu>
          </div>
          <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-end">
            <nav className="flex space-x-8">
              <ActiveLink href="/discover" activeClassName="font-semibold">
                <a title={t('Search')}>
                  <Icon icon={SearchIcon} />
                </a>
              </ActiveLink>
              <ActiveLink href="/investors" activeClassName="font-semibold">
                <a>
                  <T _str="For investors" />
                </a>
              </ActiveLink>
              <ActiveLink href="/project-developers" activeClassName="font-semibold">
                <a>
                  <T _str="For project developers" />
                </a>
              </ActiveLink>
              <ActiveLink href="/about" activeClassName="font-semibold">
                <a>
                  <T _str="About" />
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
                <T _str="Sign in" />
              </Button>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </header>
  );
};

export default Header;
