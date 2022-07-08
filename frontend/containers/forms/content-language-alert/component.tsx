import { FC, useState } from 'react';

import { X as XIcon } from 'react-feather';

import { useLanguageNames } from 'helpers/pages';

import Alert from 'components/alert';
import Icon from 'components/icon';

import type { ContentLanguageAlertProps } from './types';

export const ContentLanguageAlert: FC<ContentLanguageAlertProps> = ({
  className,
  locale,
}: ContentLanguageAlertProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const languageNames = useLanguageNames();

  if (!isOpen || !locale) return null;

  return (
    <Alert className={className}>
      <div className="flex items-center w-full">
        <span className="flex-1">
          <span className="mr-2 font-semibold">Note:</span>The content of this project should be
          written in {languageNames[locale]}
        </span>
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
