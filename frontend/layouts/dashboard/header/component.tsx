import { FC } from 'react';

import LanguageSelector from 'containers/layouts/language-selector';
import Logo from 'containers/layouts/logo';
import Navigation from 'containers/layouts/navigation';
import NavigationMenuButton from 'containers/layouts/navigation-menu-button';
import UserMenu from 'containers/layouts/user-menu';

import LayoutContainer from 'components/layout-container';

import { HeaderProps } from './types';

export const Header: FC<HeaderProps> = ({}: HeaderProps) => {
  return (
    <>
      <header className="w-full text-white">
        <LayoutContainer>
          <div className="flex items-center justify-between h-18">
            <span className="justify-start">
              <Logo />
            </span>
            <span className="flex items-center justify-end flex-grow gap-2">
              <Navigation className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-end lg:mr-4" />
              <LanguageSelector />
              <UserMenu className="hidden sm:flex" />
              <NavigationMenuButton className="sm:hidden" />
            </span>
          </div>
        </LayoutContainer>
      </header>
    </>
  );
};

export default Header;
