import { FC, useState } from 'react';

import { Facebook, Link, Mail, Twitter } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import classNames from 'classnames';

import { useRouter } from 'next/router';

import Button from 'components/button';
import Icon from 'components/icon';
import Toast from 'components/toast';
import Tooltip from 'components/tooltip';

import { ShareIconsProps } from '.';

export const ShareIcons: FC<ShareIconsProps> = ({ title }) => {
  const [copied, setCopied] = useState(false);
  const { formatMessage } = useIntl();

  const { asPath } = useRouter();
  // Facebook don't support locales, so we use the staging url when in local
  const shareLinkUrl =
    process.env.NODE_ENV === 'production'
      ? `https://staging.hecoinvest.org${asPath}`
      : `${process.env.NEXT_PUBLIC_PROXY_BACKEND}${asPath}`;

  const isProjectPage = asPath.includes('/project/');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareLinkUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareLinkUrl}`,
    email: `mailto:?subject=${
      isProjectPage
        ? formatMessage({
            defaultMessage: 'Someone has shared a HeCo invest project with you',
            id: 'iAtu/T',
          })
        : formatMessage({
            defaultMessage: 'Someone has shared a HeCo invest contact with you',
            id: '6GktxW',
          })
    }&body=${formatMessage(
      {
        defaultMessage: 'Reach out {title} on HeCo Invest through the link',
        id: 'l+2DwB',
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
        <Tooltip
          content={
            <div className="max-w-xs p-2 font-sans text-sm font-normal text-white bg-black rounded-sm sm:max-w-md">
              <FormattedMessage defaultMessage="Share on Twitter" id="80Vefc" />
            </div>
          }
        >
          <Button
            to={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 px-0 py-0 transition-opacity rounded-full bg-beige text-beige hover:opacity-60 hover:text-beige"
          >
            <span className="sr-only">
              <FormattedMessage defaultMessage="Share on Twitter" id="80Vefc" />
            </span>
            <Icon fill="white" icon={Twitter} />
          </Button>
        </Tooltip>
        <Tooltip
          content={
            <div className="max-w-xs p-2 font-sans text-sm font-normal text-white bg-black rounded-sm sm:max-w-md">
              <FormattedMessage defaultMessage="Share on Facebook" id="06VF+w" />
            </div>
          }
        >
          <Button
            to={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 px-0 py-0 text-transparent transition-opacity rounded-full bg-beige hover:opacity-60 hover:text-transparent"
          >
            <span className="sr-only">
              <FormattedMessage defaultMessage="Share on Facebook" id="06VF+w" />
            </span>
            <Icon fill="white" icon={Facebook} />
          </Button>
        </Tooltip>
        <Tooltip
          content={
            <div className="max-w-xs p-2 font-sans text-sm font-normal text-white bg-black rounded-sm sm:max-w-md">
              <FormattedMessage defaultMessage="Share by email" id="O29TSs" />
            </div>
          }
        >
          <Button
            to={shareLinks.email}
            className="flex items-center justify-center w-8 h-8 px-0 py-0 transition-opacity rounded-full bg-beige text-beige hover:opacity-60 hover:text-beige"
          >
            <span className="sr-only">
              <FormattedMessage defaultMessage="Share by email" id="O29TSs" />
            </span>
            <Icon icon={Mail} fill="white" />
          </Button>
        </Tooltip>
        <Tooltip
          content={
            <div className="max-w-xs p-2 font-sans text-sm font-normal text-white bg-black rounded-sm sm:max-w-md">
              <FormattedMessage defaultMessage="Copy link to clipboard" id="EsZlwZ" />{' '}
            </div>
          }
        >
          <Button
            onClick={copyToClipboard}
            className="flex items-center justify-center w-8 h-8 px-0 py-0 text-white transition-opacity rounded-full bg-beige hover:opacity-60 hover:text-white"
          >
            <span className="sr-only">
              <FormattedMessage defaultMessage="Copy link to clipboard" id="EsZlwZ" />
            </span>
            <Icon icon={Link} />
          </Button>
        </Tooltip>
      </div>
      {copied && (
        <div className="-translate-x-10 translate-y-4 absolute min-w-fit">
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
