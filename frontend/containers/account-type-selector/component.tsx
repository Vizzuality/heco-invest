import { FC, useMemo } from 'react';

import { useIntl } from 'react-intl';

import cx from 'classnames';

import noop from 'lodash-es';

import AccountTypeItem, { AccountTypeItemProps } from './account-type-item';
import { AccountTypeSelectorProps } from './types';

export const AccountTypeSelector: FC<AccountTypeSelectorProps> = ({
  className,
  onAccountTypeSelected = noop,
}: AccountTypeSelectorProps) => {
  const intl = useIntl();

  const ACCOUNT_TYPES: AccountTypeItemProps[] = useMemo(
    () => [
      {
        accountTypeId: 'investor',
        name: intl.formatMessage({ defaultMessage: 'Investor / Funder', id: 'OChccW' }),
        description: intl.formatMessage({
          defaultMessage: 'I want to find opportunities to invest / donate',
          id: 'nhAnF3',
        }),
        imageSrc: '/images/account-types/investor.svg',
        imageTitle: intl.formatMessage({
          defaultMessage: 'Drawing of a person looking at a list of card',
          id: 'vqeK8j',
        }),
      },
      {
        accountTypeId: 'project-developer',
        name: intl.formatMessage({ defaultMessage: 'Project developer', id: 'yF82he' }),
        description: intl.formatMessage({
          defaultMessage: 'I want to find the right investment for my projects',
          id: 'Ow9MS8',
        }),
        imageSrc: '/images/account-types/project-developer.svg',
        imageTitle: intl.formatMessage({
          defaultMessage: 'Drawing of a person looking at tree',
          id: 'QTsX3C',
        }),
      },
    ],
    [intl]
  );

  return (
    <div
      className={cx({
        'grid grid-cols-1 md:grid-cols-2 gap-6': true,
        [className]: !!className,
      })}
    >
      {ACCOUNT_TYPES.map((accountTypeInfo) => (
        <AccountTypeItem
          key={accountTypeInfo.accountTypeId}
          onClick={onAccountTypeSelected}
          {...accountTypeInfo}
        />
      ))}
    </div>
  );
};

export default AccountTypeSelector;
