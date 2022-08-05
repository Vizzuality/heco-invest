import { FC, useState } from 'react';

import { Facebook, Link, Mail, Twitter } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import classNames from 'classnames';

import { useRouter } from 'next/router';

import Button from 'components/button';
import Icon from 'components/icon';
import Toast from 'components/toast';

import { ShareIconsProps } from '.';

export const ShareIcons: FC<ShareIconsProps> = ({ title }) => {
  const [copied, setCopied] = useState(false);
  const { formatMessage } = useIntl();

  const { asPath } = useRouter();
  // Facebook don't support locales, so we use the staging url when in local
  const shareLinkUrl = process.env.NEXT_PUBLIC_PROXY_BACKEND
    ? `https://staging.hecoinvest.org${asPath}`
    : `${process.env.NEXT_PUBLIC_FRONTEND_URL}${asPath}`;

  const isProjectPage = asPath.includes('/project/');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareLinkUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareLinkUrl}`,
    email: `mailto:?subject=${formatMessage(
      {
        defaultMessage: 'Someone has shared a HeCo invest {shared} with you',
        id: 'wD2sM8',
      },
      { shared: isProjectPage ? 'project' : 'contact' }
    )}&body=${formatMessage(
      {
        defaultMessage: 'Reach out {title} on the HeCo Invest through the link',
        id: '1AM5V6',
      },
      {
        title,
      }
    )} ${shareLinkUrl}%0D%0A%0D%0A${formatMessage({
      defaultMessage:
        'HeCo Invest is a digital collaborative platform aimed to support filling the conservation financing gap in the Amazon Basin by optimizing project financing channels in this region.',
      id: 'Lw4PWP',
    })}`,
  };

  const copyToClipboard = () => {
    navigator?.clipboard?.writeText(shareLinkUrl)?.then(() => {
      setCopied(true);
    });
  };

  return (
    <div
      className={classNames('self-center h-0', {
        'translate-y-12': !isProjectPage,
        'lg:translate-y-12': isProjectPage,
      })}
    >
      <div className="flex items-center gap-2">
        <span className="mr-2 text-sm leading-6 text-gray-600">
          <FormattedMessage defaultMessage="Share" id="OKhRC6" />
        </span>
        <Button
          to={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 px-0 py-0 transition-opacity rounded-full bg-beige text-beige hover:opacity-60 hover:text-beige"
        >
          <Icon fill="white" icon={Twitter} />
        </Button>
        <Button
          to={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 px-0 py-0 text-transparent transition-opacity rounded-full bg-beige hover:opacity-60 hover:text-transparent"
        >
          <Icon fill="white" icon={Facebook} />
        </Button>
        <Button
          to={shareLinks.email}
          className="flex items-center justify-center w-8 h-8 px-0 py-0 transition-opacity rounded-full bg-beige text-beige hover:opacity-60 hover:text-beige"
        >
          <Icon icon={Mail} fill="white" />
        </Button>
        <Button
          onClick={copyToClipboard}
          className="flex items-center justify-center w-8 h-8 px-0 py-0 text-white transition-opacity rounded-full bg-beige hover:opacity-60 hover:text-white"
        >
          <Icon icon={Link} />
        </Button>
      </div>
      {copied && (
        <div className="-translate-x-10 translate-y-4 lg:absolute min-w-fit">
          <Toast
            id="copied-success"
            level="success"
            autoDismiss={true}
            content={
              <p className="whitespace-nowrap">
                <FormattedMessage defaultMessage="Link copied to clipboard" id="2yCGR2" />
              </p>
            }
            size="small"
            onDismiss={() => setCopied(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ShareIcons;
