import { FC } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';

import WebsiteSocialContact from 'containers/website-social-contact';

import type { DeveloperAboutProps } from './types';

export const DeveloperAbout: FC<DeveloperAboutProps> = ({
  className,
  text,
  developerName,
  developerPhoto,
  website,
  social,
  buttons,
}: DeveloperAboutProps) => {
  const intl = useIntl();

  return (
    <div
      className={cx({
        'flex flex-col gap-8 md:flex-row': true,
        [className]: !!className,
      })}
    >
      <div className="flex items-center md:items-start">
        <div className="w-20 h-20">
          <Image
            className="mx-auto rounded-full w-28 h-28"
            src={developerPhoto ?? '/images/placeholders/profile-logo.png'}
            alt={intl.formatMessage(
              {
                defaultMessage: 'Profile picture of {name}',
                id: 'XkF/qg',
              },
              {
                name: developerName,
              }
            )}
            layout="responsive"
            width="100%"
            height="100%"
            objectFit="contain"
          />
        </div>
      </div>

      <div>
        <span className="mb-2 font-semibold">
          <FormattedMessage
            defaultMessage="About {name}"
            values={{ name: developerName }}
            id="+mzZak"
          />
        </span>
        <p>{text}</p>
        <Link href="/">
          <a className="block mt-6 underline text-green-dark">
            <FormattedMessage defaultMessage="See project developer profile" id="wkkhPR" />
          </a>
        </Link>
      </div>

      <div className="gap-2 min-w-fit">
        <WebsiteSocialContact website={website} social={social} />
        <div className="flex justify-start gap-4 mt-10 md:justify-end md:text-right">{buttons}</div>
      </div>
    </div>
  );
};

export default DeveloperAbout;
