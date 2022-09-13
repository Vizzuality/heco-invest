import { FC, useState, useCallback } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { useRouter } from 'next/router';

import { getUserInitials } from 'helpers/user';

import Button from 'components/button';
import Menu, { MenuItem, MenuSection } from 'components/menu';
import { Paths } from 'enums';

import { useAccount } from 'services/account';
import { useSignOut } from 'services/authentication/authService';

import { UserMenuProps } from './types';

export const UserMenu: FC<UserMenuProps> = ({
  className,
  theme = 'primary-white',
}: UserMenuProps) => {
  const router = useRouter();
  const intl = useIntl();
  const { user, userAccount: account } = useAccount();
  const signOut = useSignOut();

  const showBackground = false;

  const [menuOpen, setMenuOpen] = useState(false);

  const onClickMenuItem = useCallback(
    (key) => {
      switch (key) {
        case Paths.SignOut:
          signOut.mutate(
            {},
            {
              onSuccess: () => {
                router.push(Paths.Home);
              },
            }
          );
          break;

        default:
          router.push(key);
          break;
      }
    },
    [router, signOut]
  );

  return (
    <div className={className}>
      <div className="items-center">
        {!!user ? (
          <Menu
            Trigger={
              <Button
                aria-label={intl.formatMessage({ defaultMessage: 'User menu', id: '6b2CRH' })}
                className="px-0 focus-visible:outline-green-dark"
                theme="naked"
                size="smallest"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
              >
                <span
                  className={cx('w-8 h-8 rounded-full flex justify-center items-center', {
                    'bg-green-dark text-white': showBackground,
                    'text-green-dark bg-white': !showBackground,
                  })}
                >
                  {getUserInitials(user)}
                </span>
              </Button>
            }
            onAction={onClickMenuItem}
            align="end"
            direction="bottom"
            header={
              <div className="flex">
                <div className="flex items-center justify-center w-12 h-12 mr-2 text-white rounded-full bg-green-dark">
                  {getUserInitials(user)}
                </div>
                <div className="pb-2 pl-2 pr-2 border-b border-bg-dark">
                  <span className="text-green-dark">
                    {user.first_name} {user.last_name}
                  </span>
                  <span className="block text-gray-400">{user.email}</span>
                </div>
              </div>
            }
          >
            <MenuSection>
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
                    values={{
                      accountName: account.name,
                    }}
                  />
                </MenuItem>
              )}
              <MenuItem key={Paths.Settings}>
                <FormattedMessage defaultMessage="My preferences" id="CEQo2w" />{' '}
              </MenuItem>
              <MenuItem key={Paths.SignOut}>
                <FormattedMessage defaultMessage="Sign out" id="xXbJso" />
              </MenuItem>
            </MenuSection>
          </Menu>
        ) : (
          <Button theme={theme} size="small" className="hidden lg:block" to={Paths.SignIn}>
            <FormattedMessage defaultMessage="Sign in" id="SQJto2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
