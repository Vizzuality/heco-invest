import { FC, useState } from 'react';

import { Facebook, Link, Mail, Twitter } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import classNames from 'classnames';

import { useRouter } from 'next/router';

import Button from 'components/button';
import Icon from 'components/icon';
import Toast from 'components/toast';

import { ShareIconsProps } from '.';

export const ShareIcons: FC<ShareIconsProps> = ({ title }) => {
  const [copied, setCopied] = useState(false);

  const { asPath } = useRouter();
  const shareLinkUrl = `https://staging.hecoinvest.org${asPath}`;
  // const shareLinkUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}${asPath}`;
  const isProjectPage = asPath.includes('/project/');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareLinkUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareLinkUrl}`,
    email: `mailto:?subject=${title}&body=${shareLinkUrl}`,
  };

  const copyToCkipboard = () => {
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
        <span className="text-sm leading-6 text-gray-600 mr-2">
          <FormattedMessage defaultMessage="Share" id="OKhRC6" />
        </span>
        <Button
          to={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="py-0 px-0 w-8 h-8 flex transition-opacity items-center justify-center bg-beige rounded-full text-beige hover:opacity-60 hover:text-beige"
        >
          <Icon fill="white" icon={Twitter} />
        </Button>
        <Button
          to={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="py-0 px-0 w-8 h-8 flex transition-opacity items-center justify-center bg-beige rounded-full text-transparent hover:opacity-60 hover:text-transparent"
        >
          <Icon fill="white" icon={Facebook} />
        </Button>
        <Button
          to={shareLinks.email}
          className="py-0 px-0 w-8 h-8 flex transition-opacity items-center justify-center bg-beige text-beige rounded-full hover:opacity-60 hover:text-beige"
        >
          <Icon icon={Mail} fill="white" />
        </Button>
        <Button
          onClick={copyToCkipboard}
          className="py-0 px-0 w-8 h-8 flex transition-opacity items-center justify-center bg-beige text-white rounded-full hover:opacity-60 hover:text-white"
        >
          <Icon icon={Link} />
        </Button>
      </div>
      {copied && (
        <div className="lg:absolute translate-y-4 -translate-x-10 min-w-fit">
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
