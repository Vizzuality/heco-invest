import { FC, useState } from 'react';

import { X as XIcon } from 'react-feather';

import Alert from 'components/alert';
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
        <Icon
          className="w-5 h-5 ml-2 cursor-pointer"
          icon={XIcon}
          onClick={() => setIsOpen(false)}
        />
      </div>
    </Alert>
  );
};

export default ContentLanguageAlert;
