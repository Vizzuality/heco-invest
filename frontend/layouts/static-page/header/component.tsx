import React from 'react';

import cx from 'classnames';

import { useWindowScrollPosition } from 'rooks';

import LanguageSelector from 'containers/layouts/language-selector';
import Logo from 'containers/layouts/logo';
import Navigation from 'containers/layouts/navigation';
import NavigationMenuButton from 'containers/layouts/navigation-menu-button';
import UserMenu from 'containers/layouts/user-menu';

import LayoutContainer from 'components/layout-container';

import { HeaderProps } from './types';

export const Header: React.FC<HeaderProps> = ({
  props: { transparent, className } = {},
}: HeaderProps) => {
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
          <Logo />
          <div className="flex">
            <Navigation className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-end lg:mr-4" />
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
