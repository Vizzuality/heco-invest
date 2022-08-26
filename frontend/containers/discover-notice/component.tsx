import { FC } from 'react';

import { X as XIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import Alert from 'components/alert';
import Button from 'components/button';

import { DiscoverNoticeProps } from './types';

export const DiscoverNotice: FC<DiscoverNoticeProps> = ({
  className,
  isVisible,
  children,
  onClose,
}) => {
  if (!isVisible) return null;
  return (
    <div>
      <Alert className={className}>
        <div className="flex items-center">
          <div className="text-base">{children}</div>
          <div className="flex items-center justify-center">
            <Button
              className="ml-2 focus-visible:outline-green-dark"
              theme="naked"
              size="smallest"
              onClick={onClose}
            >
              <span className="sr-only">
                <FormattedMessage defaultMessage="Dismiss" id="TDaF6J" />
              </span>
              <XIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default DiscoverNotice;
