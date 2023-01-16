import { FC, useState, useCallback } from 'react';

import { Menu as MenuIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { useBreakpoint } from 'hooks/use-breakpoint';

import Button from 'components/button';
import Menu, { MenuItem, MenuSection } from 'components/menu';
import { Paths } from 'enums';

import { useAccount } from 'services/account';
import { useSignOut } from 'services/authentication/authService';

import { NavigationMenuButtonProps } from './types';

export const NavigationMenuButton: FC<NavigationMenuButtonProps> = ({
  className,
  theme = 'primary-white',
}: NavigationMenuButtonProps) => {
  const { pathname, push } = useRouter();
  const isSearchPage = pathname.includes(Paths.Discover);
  const intl = useIntl();
  const { user, userAccount: account } = useAccount();
  const signOut = useSignOut();
  const breakpoint = useBreakpoint();
  const isLg = breakpoint('lg');

  const [menuOpen, setMenuOpen] = useState(false);

  const onClickMenuItem = useCallback(
    (key) => {
      switch (key) {
        case Paths.SignOut:
          signOut.mutate(
            {},
            {
              onSuccess: () => {
                push(Paths.Home);
              },
            }
          );
          break;

        default:
          push(key);
          break;
      }
    },
    [push, signOut]
  );

  return (
    <div className={className}>
      <div className="flex items-center">
        <Menu
          Trigger={
            <Button
              theme={theme}
              size="smallest"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="pt-2 pb-2 pl-2 pr-2"
            >
              <span className="sr-only">
                <FormattedMessage defaultMessage="Menu" id="tKMlOc" />
              </span>
              <span className="inline">
                <MenuIcon className="h-5" />
              </span>
            </Button>
          }
          align="end"
          onAction={onClickMenuItem}
          hiddenSections={{ 'user-section': 'sm' }}
        >
          <MenuSection>
            {!isSearchPage && (
              <MenuItem key={Paths.Projects}>
                <FormattedMessage defaultMessage="Catalog" id="GOdq5V" />
              </MenuItem>
            )}
            <MenuItem key={Paths.ForInvestors}>
              <FormattedMessage defaultMessage="For investors" id="MfCYKW" />
            </MenuItem>
            <MenuItem key={Paths.ForProjectDevelopers}>
              <FormattedMessage defaultMessage="For project developers" id="F1+h/t" />
            </MenuItem>
            <MenuItem key={Paths.About}>
              <FormattedMessage defaultMessage="About" id="g5pX+a" />
            </MenuItem>
          </MenuSection>
          {!!user ? (
            <MenuSection key="user-section">
              {!!account && (
                <MenuItem
                  key={Paths.Dashboard}
                  textValue={intl.formatMessage(
                    {
                      defaultMessage: '{accountName} account',
                      id: 'YE6fVO',
                    },
                    { accountName: account.name }
                  )}
                >
                  <FormattedMessage
                    defaultMessage="{accountName} account"
                    id="YE6fVO"
                    values={{ accountName: account.name }}
                  />
                </MenuItem>
              )}
              <MenuItem key={Paths.Settings}>
                <FormattedMessage defaultMessage="My preferences" id="CEQo2w" />
              </MenuItem>
              <MenuItem key={Paths.SignOut}>
                <FormattedMessage defaultMessage="Sign out" id="xXbJso" />
              </MenuItem>
            </MenuSection>
          ) : (
            <MenuSection
              key="user-section-sign-in"
              title={intl.formatMessage({ defaultMessage: 'User', id: 'EwRIOm' })}
            >
              {(!isSearchPage || !isLg) && (
                <MenuItem key={Paths.SignIn}>
                  <FormattedMessage defaultMessage="Sign in" id="SQJto2" />
                </MenuItem>
              )}
              <MenuItem key={Paths.SignUp}>
                <FormattedMessage defaultMessage="Sign up" id="8HJxXG" />
              </MenuItem>
            </MenuSection>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default NavigationMenuButton;
