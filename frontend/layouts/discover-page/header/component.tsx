import { FC } from 'react';

import Link from 'next/link';

import LayoutContainer from 'components/layout-container';
import NavigationMenuButton from 'layouts/shared/navigation-menu-button';
import UserMenu from 'layouts/shared/user-menu';

import { HeaderProps } from './types';

export const Header: FC<HeaderProps> = ({}: HeaderProps) => {
  return (
    <>
      <header className="fixed top-0 z-10 w-full text-white border-b bg-green-dark backdrop-blur-sm">
        <LayoutContainer>
          <div className="flex items-center justify-between h-18">
            <Link href="/">
              <a className="font-semibold">HeCo Invest</a>
            </Link>
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
