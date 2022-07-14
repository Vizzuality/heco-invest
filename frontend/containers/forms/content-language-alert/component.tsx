import { FC, useState } from 'react';

import { X as XIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import Alert from 'components/alert';
import Button from 'components/button';
import Icon from 'components/icon';

import type { ContentLanguageAlertProps } from './types';

export const ContentLanguageAlert: FC<ContentLanguageAlertProps> = ({
  className,
  children,
}: ContentLanguageAlertProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  if (!isOpen) return null;

  return (
    <Alert className={className}>
      <div className="flex items-center w-full">
        <span className="flex-1">{children}</span>
        <Button
          className="ml-2 focus-visible:outline-green-dark"
          theme="naked"
          size="smallest"
          onClick={() => setIsOpen(false)}
        >
          <span className="sr-only">
            <FormattedMessage defaultMessage="Dismiss" id="TDaF6J" />
          </span>
          <Icon className="w-5 h-5" icon={XIcon} />
        </Button>
      </div>
    </Alert>
  );
};

export default ContentLanguageAlert;
