import { FC } from 'react';

import BetaVersionDisclaimer from 'containers/layouts/beta-version-disclaimer';
import DiscoverSearch from 'containers/layouts/discover-search';
import LanguageSelector from 'containers/layouts/language-selector';
import Logo from 'containers/layouts/logo';
import NavigationMenuButton from 'containers/layouts/navigation-menu-button';
import UserMenu from 'containers/layouts/user-menu';

import LayoutContainer from 'components/layout-container';

import { HeaderProps } from './types';

export const Header: FC<HeaderProps> = () => {
  return (
    <>
      <header className="top-0 z-20 w-full text-white border-b bg-green-dark backdrop-blur-sm">
        <BetaVersionDisclaimer />
        <LayoutContainer>
          <div className="flex items-center justify-between h-18">
            <span className="justify-start flex-1">
              <Logo />
            </span>
            <div className="justify-end hidden w-full max-w-3xl mt-10 xl:block">
              <DiscoverSearch />
            </div>
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
