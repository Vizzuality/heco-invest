import { FC } from 'react';

import { FormattedMessage, FormattedDate, useIntl } from 'react-intl';

import { translatedLanguageNameForLocale } from 'helpers/intl';

import Loading from 'components/loading';

import { useAccount } from 'services/account';

import { AccountBasicInfoProps } from './types';

export const AccountBasicInfo: FC<AccountBasicInfoProps> = ({}: AccountBasicInfoProps) => {
  const intl = useIntl();

  const { userAccount, userAccountLoading } = useAccount({ includes: ['owner'] });

  return (
    <div className="relative p-6 bg-white rounded-lg">
      <div className="flex text-sm">
        <div className="flex-grow font-semibold">
          <FormattedMessage defaultMessage="Basic info" id="Py+eVV" />
        </div>
      </div>
      {userAccountLoading ? (
        <div className="flex items-center justify-center w-full h-10">
          <Loading visible={true} iconClassName="w-10 h-10" />
        </div>
      ) : (
        <>
          <div className="text-sm gap-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] mt-8 text-gray-900">
            <span className="text-gray-600">
              <FormattedMessage defaultMessage="Date of creation" id="KxPY7j" />
            </span>
            <span>
              {!!userAccount?.created_at && FormattedDate({ value: userAccount.created_at })}
            </span>

            <span className="text-gray-600">
              <FormattedMessage defaultMessage="Language" id="y1Z3or" />
            </span>
            <span>{translatedLanguageNameForLocale(intl, userAccount?.language)}</span>
            <span className="text-gray-600">
              <FormattedMessage defaultMessage="Owner" id="zINlao" />
            </span>
            <span>
              {userAccount?.owner.first_name} {userAccount?.owner.last_name}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountBasicInfo;
