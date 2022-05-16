import { FC } from 'react';

import Logo from 'containers/layouts/logo';
import NavigationMenuButton from 'containers/layouts/navigation-menu-button';
import UserMenu from 'containers/layouts/user-menu';

import LayoutContainer from 'components/layout-container';

import { HeaderProps } from './types';

export const Header: FC<HeaderProps> = ({}: HeaderProps) => {
  return (
    <>
      <header className="fixed top-0 z-10 w-full text-white border-b bg-green-dark backdrop-blur-sm">
        <LayoutContainer>
          <div className="flex items-center justify-between h-18">
            <Logo />
            {/* Making space for the Search container in the layout, just in case */}
            <span className="max-w-3xl" />
            <div className="flex items-center gap-2 lg:gap-4">
              <UserMenu />
              <NavigationMenuButton />
            </div>
          </div>
        </LayoutContainer>
      </header>
    </>
  );
};

export default Header;
