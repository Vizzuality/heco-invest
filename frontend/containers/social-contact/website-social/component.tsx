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
        [className]: !!className,
      })}
    >
      {website && (
        <div className="flex flex-wrap justify-between gap-2">
          <span className="text-gray-800">
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
        </div>
      )}

      {sortedSocialLinks.length > 0 && (
        <div className="flex flex-wrap justify-between gap-2 mt-3">
          <span className="text-gray-800">
            <FormattedMessage defaultMessage="Reach them in" id="G9iCfx" />
          </span>
          <div className="flex items-center gap-2">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteSocial;
