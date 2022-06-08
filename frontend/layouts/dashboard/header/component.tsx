import { FC } from 'react';

import cx from 'classnames';

import { useScrollY } from 'hooks/use-scroll-y';

import LanguageSelector from 'containers/layouts/language-selector';
import Logo from 'containers/layouts/logo';
import Navigation from 'containers/layouts/navigation';
import NavigationMenuButton from 'containers/layouts/navigation-menu-button';
import UserMenu from 'containers/layouts/user-menu';

import LayoutContainer from 'components/layout-container';

import { HeaderProps } from './types';

export const Header: FC<HeaderProps> = ({}: HeaderProps) => {
  const { isScrolledY } = useScrollY();

  return (
    <>
      <header
        className={cx({
          'top-0 w-full lg:relative transition-colors fixed z-20': true,
          'text-white': !isScrolledY,
          'bg-background-light/90 backdrop-blur-sm': isScrolledY,
        })}
      >
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
