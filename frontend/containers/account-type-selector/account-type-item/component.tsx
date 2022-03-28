import { FC, useState } from 'react';

import { useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';

import { usePress, useFocusWithin } from '@react-aria/interactions';
import noop from 'lodash-es';

import { AccountTypeItemProps } from './types';

export const AccountTypeItem: FC<AccountTypeItemProps> = ({
  accountTypeId,
  name,
  description,
  imageSrc,
  imageTitle,
  onClick = noop,
}: AccountTypeItemProps) => {
  const [isFocusWithin, setIsFocusWithin] = useState<boolean>(false);

  const intl = useIntl();

  const { pressProps } = usePress({
    onPress: () => onClick(accountTypeId),
  });

  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setIsFocusWithin,
  });

  return (
    <div
      className={cx({
        'flex flex-col items-center gap-3 px-12 py-8 text-center bg-white border rounded-xl': true,
        'cursor-pointer hover:ring-1 hover:ring-green-dark transition-all': true,
        'ring-2 ring-green-dark': isFocusWithin,
      })}
      role="group"
      aria-label={intl.formatMessage({ defaultMessage: '{name} account', id: 'Vxcu91' }, { name })}
      {...pressProps}
      {...focusWithinProps}
    >
      <div className="mb-3">
        <Image src={imageSrc} alt={imageTitle} width={192} height={204} title={imageTitle} />
      </div>
      <button
        className="font-semibold outline-none text-green-dark"
        aria-label={intl.formatMessage(
          {
            defaultMessage: 'Select the {name} account',
            id: 'Swj4mJ',
          },
          {
            name,
          }
        )}
      >
        {name}
      </button>
      <div>{description}</div>
    </div>
  );
};

export default AccountTypeItem;
