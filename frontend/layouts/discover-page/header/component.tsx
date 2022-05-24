import { FC } from 'react';

import DiscoverSearch from 'containers/layouts/discover-search';
import Logo from 'containers/layouts/logo';
import NavigationMenuButton from 'containers/layouts/navigation-menu-button';
import UserMenu from 'containers/layouts/user-menu';

import LayoutContainer from 'components/layout-container';

import { HeaderProps } from './types';

export const Header: FC<HeaderProps> = ({ ...discoverSearchProps }: HeaderProps) => {
  return (
    <>
      <header className="fixed top-0 z-20 w-full text-white border-b bg-green-dark backdrop-blur-sm">
        <LayoutContainer>
          <div className="flex items-center justify-between h-18">
            <span className="justify-start flex-1">
              <Logo />
            </span>
            <span className="justify-end hidden w-full max-w-3xl mt-10 xl:block">
              <DiscoverSearch {...discoverSearchProps} />
            </span>
            <span className="flex items-center justify-end flex-1 gap-2 lg:gap-4">
              <UserMenu className="hidden sm:flex" />
              <NavigationMenuButton />
            </span>
          </div>
        </LayoutContainer>
      </header>
    </>
  );
};

export default Header;
