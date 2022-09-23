import { FC, useState, useEffect } from 'react';

import { useIntl } from 'react-intl';

import Image from 'next/image';
import Link from 'next/link';

import Icon from 'components/icon';

import ContactEmailSVG from 'svgs/contact/email.svg';
import ContactPhoneSVG from 'svgs/contact/phone.svg';

import type { ContactItemProps } from './types';

export const ContactItem: FC<ContactItemProps> = ({
  name,
  email,
  phone,
  picture: pictureProp,
}: ContactItemProps) => {
  const placeholderPicture = '/images/placeholders/profile-logo.png';

  const intl = useIntl();
  const [picture, setPicture] = useState<string>(pictureProp || placeholderPicture);

  useEffect(() => {
    setPicture(pictureProp || placeholderPicture);
  }, [pictureProp]);

  return (
    <div className="flex flex-col justify-center gap-8 py-6 my-6 sm:flex-row">
      {picture && (
        <div className="flex items-center justify-center w-3/12 mx-auto sm:mx-0">
          <div className="relative w-20 max-w-full p-8 overflow-hidden rounded-full drop-shadow-lg aspect-square">
            <Image
              src={picture}
              alt={intl.formatMessage({ defaultMessage: '{name} picture', id: 'rLzWx9' }, { name })}
              layout="fill"
              objectFit="contain"
              onError={() => setPicture(placeholderPicture)}
            />
          </div>
        </div>
      )}
      <div className="flex flex-col items-start w-full max-w-md gap-5 break-all">
        {email && (
          <span
            className="flex items-center"
            aria-label={intl.formatMessage({
              defaultMessage: 'Contact email',
              id: 'DR+23P',
            })}
          >
            <Icon icon={ContactEmailSVG} className="w-12 h-12 mr-5" aria-hidden={true} />
            <Link href={`mailto:${email}`}>
              <a
                className="underline transition-all rounded text-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark"
                target="_blank"
                rel="noopener noreferrer"
              >
                {email}
              </a>
            </Link>
          </span>
        )}
        {phone && (
          <span
            className="flex items-center"
            aria-label={intl.formatMessage({
              defaultMessage: 'Contact phone',
              id: '2CtPQ/',
            })}
          >
            <Icon icon={ContactPhoneSVG} className="w-12 h-12 mr-5" aria-hidden={true} />
            <Link href={`tel:${phone}`}>
              <a className="underline transition-all rounded text-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark">
                {phone}
              </a>
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default ContactItem;
