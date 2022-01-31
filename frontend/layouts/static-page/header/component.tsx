import React, { useState, useCallback } from 'react';

import cx from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useWindowScrollPosition } from 'rooks';

import Button from 'components/button';
import Icon from 'components/icon';
import LanguageSelector from 'components/language-selector-no-ssr';
import LayoutContainer from 'components/layout-container';
import Menu, { MenuItem, MenuSection } from 'components/menu';

import SearchIcon from 'svgs/search.svg?sprite';

import { HeaderProps } from './types';

export const Header: React.FC<HeaderProps> = ({
  props: { transparent, className } = {},
}: HeaderProps) => {
  const router = useRouter();

  const { scrollY }: ReturnType<typeof useWindowScrollPosition> =
    // The `window` check is required because the hook is not SSR-ready yet:
    // https://github.com/imbhargav5/rooks/issues/559
    typeof window === 'undefined' ? { scrollY: 0, scrollX: 0 } : useWindowScrollPosition();
  const showBackground = !transparent || scrollY > 0;

  const [menuOpen, setMenuOpen] = useState(false);

  const onClickMenuItem = useCallback(
    (key) => {
      switch (key) {
        case 'sign-in':
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
        <div className="flex justify-between items-center pt-3 pb-3 md:pt-6 md:pb-4 lg:justify-start lg:space-x-10">
          <Link href="/">
            <a className="font-semibold">HeCo Invest</a>
          </Link>
          <div className="flex items-center lg:hidden space-x-2">
            <div className="shrink-0">
              <LanguageSelector />
            </div>
            <Menu
              className="notranslate shrink-0"
              Trigger={
                <Button
                  theme={showBackground ? 'primary-green' : 'primary-white'}
                  size="small"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen(true)}
                >
                  Menu
                </Button>
              }
              disabledKeys={['sign-in']}
              align="end"
              onAction={onClickMenuItem}
            >
              <MenuItem key="/discover">Search</MenuItem>
              <MenuItem key="/investors">For investors</MenuItem>
              <MenuItem key="/project-developers">For project developers</MenuItem>
              <MenuItem key="/about">About</MenuItem>
              <MenuSection key="user-section" title="User">
                <MenuItem key="sign-in">Sign in</MenuItem>
              </MenuSection>
            </Menu>
          </div>
          <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-end">
            <nav className="flex space-x-8">
              <Link href="/discover">
                <a title="Search">
                  <Icon icon={SearchIcon} />
                </a>
              </Link>
              <Link href="/investors">
                <a>For investors</a>
              </Link>
              <Link href="/project-developers">
                <a>For project developers</a>
              </Link>
              <Link href="/about">
                <a>About</a>
              </Link>
            </nav>
            <div className="flex items-center md:ml-4 space-x-6">
              <div className="shrink-0">
                <LanguageSelector />
              </div>
              <Button
                theme={showBackground ? 'primary-green' : 'primary-white'}
                size="small"
                className="shrink-0"
                disabled
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </header>
  );
};

export default Header;
