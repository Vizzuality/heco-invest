import { FC } from 'react';

import BetaVersionDisclaimer from 'containers/layouts/beta-version-disclaimer';
import LanguageSelector from 'containers/layouts/language-selector';
import Logo from 'containers/layouts/logo';
import NavigationMenuButton from 'containers/layouts/navigation-menu-button';
import UserMenu from 'containers/layouts/user-menu';

import LayoutContainer from 'components/layout-container';

import { HeaderProps } from './types';

export const Header: FC<HeaderProps> = () => {
  return (
    <>
      <header className="top-0 z-20 w-full text-white sm:border-b sm:bg-green-dark sm:backdrop-blur-sm">
        <BetaVersionDisclaimer />
        <LayoutContainer>
          <div className="flex items-center justify-between h-14 sm:h-18">
            <span className="justify-start flex-1">
              <Logo defaultWhite />
            </span>
            <div className="flex items-center justify-end flex-1 gap-2">
              <LanguageSelector />
              <UserMenu className="hidden sm:flex" />
              <NavigationMenuButton theme="naked" />
            </div>
          </div>
        </LayoutContainer>
      </header>
    </>
  );
};

export default Header;
