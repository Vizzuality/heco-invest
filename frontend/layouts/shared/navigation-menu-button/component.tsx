import { FC, useState, useCallback } from 'react';

import { Menu as MenuIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import useMe from 'hooks/me';

import Button from 'components/button';
import Menu, { MenuItem, MenuSection } from 'components/menu';
import { Paths } from 'enums';

import { useCurrentProjectDeveloper } from 'services/project-developers/projectDevelopersService';

import { NavigationMenuButtonProps } from './types';

export const NavigationMenuButton: FC<NavigationMenuButtonProps> = ({
  className,
  theme = 'primary-white',
}: NavigationMenuButtonProps) => {
  const router = useRouter();
  const intl = useIntl();
  const { user } = useMe();
  const { projectDeveloper } = useCurrentProjectDeveloper(user);
  const investor = undefined; // Important!!! Include the current investor when available

  const [menuOpen, setMenuOpen] = useState(false);

  const onClickMenuItem = useCallback(
    (key) => {
      switch (key) {
        default:
          router.push(key);
          break;
      }
    },
    [router]
  );

  const account = projectDeveloper || investor;

  return (
    <div className={className}>
      <div className="flex items-center">
        <Menu
          Trigger={
            <Button
              theme={theme}
              size="small"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="sm:py-2"
            >
              <span className="hidden sm:inline">
                <FormattedMessage defaultMessage="Menu" id="tKMlOc" />
              </span>
              <span className="inline sm:hidden">
                <MenuIcon height={20} />
              </span>
            </Button>
          }
          align="end"
          onAction={onClickMenuItem}
          hiddenSections={{ 'user-section': 'sm' }}
        >
          <MenuSection>
            <MenuItem key="/discover">
              <FormattedMessage defaultMessage="Search" id="xmcVZ0" />
            </MenuItem>
            <MenuItem key="/investors">
              <FormattedMessage defaultMessage="For investors" id="MfCYKW" />
            </MenuItem>
            <MenuItem key="/project-developers">
              <FormattedMessage defaultMessage="For project developers" id="F1+h/t" />
            </MenuItem>
            <MenuItem key="/about">
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
              <MenuItem key={Paths.SignIn}>
                <FormattedMessage defaultMessage="Sign in" id="SQJto2" />
              </MenuItem>
            </MenuSection>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default NavigationMenuButton;
