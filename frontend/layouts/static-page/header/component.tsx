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
  props: { transparent, whiteLogo = false, className } = {},
}: HeaderProps) => {
  const { isScrolledY } = useScrollY();

  const showBackground = !transparent || isScrolledY;

  return (
    <>
      <BetaVersionDisclaimer className="sm:hidden" />
      <header
        className={cx({
          'sticky sm:fixed h-0 sm:h-auto top-0 w-full z-20 transition-colors': true,
          'text-white': !showBackground,
          [className]: !!className,
        })}
      >
        <BetaVersionDisclaimer className="hidden sm:flex" />
        <div
          className={cx({
            'transition-colors': true,
            'bg-background-light/90 backdrop-blur-sm': showBackground,
          })}
        >
          <LayoutContainer>
            <div className="flex items-center justify-between pt-3 pb-3 md:pt-6 md:pb-4 lg:space-x-10">
              <Logo defaultWĥite={whiteLogo} />
              <div className="flex">
                <Navigation className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-end lg:mr-4" />
                <div className="flex items-center gap-2 lg:gap-4">
                  <LanguageSelector />
                  <UserMenu
                    className="hidden lg:ml-4 sm:flex"
                    theme={showBackground ? 'primary-green' : 'primary-white'}
                  />
                  <NavigationMenuButton
                    className={cx({
                      'flex lg:hidden': true,
                      'text-white': !showBackground,
                      'text-green-dark': showBackground,
                    })}
                    theme="naked"
                  />
                </div>
              </div>
            </div>
          </LayoutContainer>
        </div>
      </header>
    </>
  );
};

export default Header;
