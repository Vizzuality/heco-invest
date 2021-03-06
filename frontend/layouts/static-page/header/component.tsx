import React from 'react';

import cx from 'classnames';

import { useScrollY } from 'hooks/use-scroll-y';

import BetaVersionDisclaimer from 'containers/layouts/beta-version-disclaimer';
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
  const { isScrolledY } = useScrollY();

  const showBackground = !transparent || isScrolledY;

  return (
    <header
      className={cx({
        'fixed top-0 w-full z-20 transition-colors': true,
        'text-white': !showBackground,
        'bg-background-light/90 backdrop-blur-sm': showBackground,
        [className]: !!className,
      })}
    >
      <BetaVersionDisclaimer />
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
