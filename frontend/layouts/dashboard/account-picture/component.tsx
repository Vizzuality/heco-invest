import { FC, useState, useEffect } from 'react';

import { useIntl } from 'react-intl';

import Image from 'next/image';

import { AccountPictureProps } from './types';

export const AccountPicture: FC<AccountPictureProps> = ({
  name,
  picture: pictureSrc,
}: AccountPictureProps) => {
  const intl = useIntl();

  const placeholderPictureSrc = '/images/placeholders/profile-logo.png';
  const [picture, setPicture] = useState<string>(pictureSrc || placeholderPictureSrc);

  useEffect(() => {
    setPicture(pictureSrc || placeholderPictureSrc);
  }, [pictureSrc]);

  return (
    <div className="w-20 h-20 overflow-hidden bg-white rounded-lg drop-shadow-xl">
      <Image
        className="rounded-lg"
        src={picture}
        alt={intl.formatMessage({ defaultMessage: '{name} picture', id: 'rLzWx9' }, { name: name })}
        layout="fill"
        objectFit="contain"
        onError={() => setPicture(placeholderPictureSrc)}
      />
    </div>
  );
};

export default AccountPicture;
