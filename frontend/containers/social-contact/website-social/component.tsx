import { FC, useMemo } from 'react';

import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import Link from 'next/link';

import Icon from 'components/icon';

import { SOCIAL_DATA } from '../constants';

import type { WebsiteSocialProps, SocialType } from './types';

export const WebsiteSocial: FC<WebsiteSocialProps> = ({
  className,
  website,
  social = [],
}: WebsiteSocialProps) => {
  const sortedSocialLinks = useMemo(
    () =>
      SOCIAL_DATA.map((item) => {
        const socialData = social.find((link) => link.id === item.id);

        if (!socialData) {
          return null;
        }

        return {
          ...socialData,
          ...item,
        };
      }).filter((item) => !!item),

    [social]
  );

  return (
    <div
      className={cx({
        'grid gap-y-0 sm:gap-y-3 gap-x-4 md:gap-x-12 break-word grid-cols-1 sm:grid-cols-1fr-auto md:grid-cols-auto-1fr':
          true,
        [className]: !!className,
      })}
    >
      {website && (
        <>
          <span className="mt-4 text-gray-800 sm:mt-0">
            <FormattedMessage defaultMessage="Website" id="JkLHGw" />
          </span>
          <span className="break-all md:break-normal">
            <Link href={website}>
              <a
                className="transition-all rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark"
                target="_blank"
                rel="noopener noreferrer"
              >
                {website}
              </a>
            </Link>
          </span>
        </>
      )}

      {social.length > 0 && (
        <>
          <span className="mt-4 text-gray-800 sm:mt-0">
            <FormattedMessage defaultMessage="Reach them in" id="G9iCfx" />
          </span>
          <span className="flex items-center gap-2">
            {sortedSocialLinks.map(({ id, url, icon, title }) => (
              <Link key={id} href={url}>
                <a
                  className="transition-all rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span
                    key={id}
                    className="block w-5 h-5 px-0.5 bg-black rounded"
                    aria-label={title}
                  >
                    <Icon
                      aria-hidden={true}
                      icon={icon}
                      className={cx({
                        'w-full h-full fill-white': true,
                        'stroke-0': id !== 'instagram',
                      })}
                    />
                  </span>
                </a>
              </Link>
            ))}
          </span>
        </>
      )}
    </div>
  );
};

export default WebsiteSocial;
