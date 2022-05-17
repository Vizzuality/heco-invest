import { FC } from 'react';

import { useIntl } from 'react-intl';

import NextHead from 'next/head';
import Link from 'next/link';

import Button from 'components/button';
import LayoutContainer from 'components/layout-container';
import Menu, { MenuItem } from 'components/menu';

import { HeaderProps } from './types';

export const Header: FC<HeaderProps> = ({}: HeaderProps) => {
  const intl = useIntl();

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
            <Menu
              Trigger={
                <Button
                  type="button"
                  size="small"
                  theme="primary-white"
                  aria-label={intl.formatMessage({ defaultMessage: 'Menu', id: 'tKMlOc' })}
                >
                  Menu
                </Button>
              }
              align="end"
              direction="bottom"
              onAction={() => {}}
            >
              <MenuItem key="menu-item-1">Item 1</MenuItem>
              <MenuItem key="menu-item-2">Item 2</MenuItem>
              <MenuItem key="menu-item-3">Item 3</MenuItem>
            </Menu>
          </div>
        </LayoutContainer>
      </header>
    </>
  );
};

export default Header;
