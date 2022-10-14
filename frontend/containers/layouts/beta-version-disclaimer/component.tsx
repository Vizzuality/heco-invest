import { FC, useEffect, useState } from 'react';

import { X as CloseIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { useBreakpoint } from 'hooks/use-breakpoint';

import Button from 'components/button';

import { BetaVersionDisclaimerProps } from './types';

const BetaVersionDisclaimer: FC<BetaVersionDisclaimerProps> = ({ className }) => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const isClosed = localStorage.getItem('beta-version-disclaimer-closed');
    setHidden(!!isClosed);
  }, []);

  const handleClose = () => {
    setHidden(true);
    localStorage.setItem('beta-version-disclaimer-closed', 'true');
  };

  const isMobile = !useBreakpoint(true)('md');

  return (
    <div
      className={cx(
        'w-full z-50 flex bg-background-middle justify-center transform-all ease-in-out duration-300 overflow-hidden text-black static',
        {
          'h-0': hidden,
          'h-auto p-3': !hidden,
          [className]: !!className,
        }
      )}
    >
      <p className="mr-2 text-sm text-center">
        <FormattedMessage
          defaultMessage="HeCo Invest is currently on Beta version. We are still testing and making improvements and for that reason some features may not be fully functional. <mobile>You are seeing a mobile version of the platform which has limited functionality, please use the desktop version to see the complete version.</mobile>"
          id="8XtmJS"
          values={{
            mobile: (chunk: string) => isMobile && <span>{chunk}</span>,
          }}
        />
      </p>
      <Button theme="naked" size="smallest" onClick={handleClose}>
        <CloseIcon className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default BetaVersionDisclaimer;
