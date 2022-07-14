import { useEffect, useState } from 'react';

import { X as CloseIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import Button from 'components/button';
import { Paths } from 'enums';

const BetaVersionDisclaimer = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const isClosed = sessionStorage.getItem('beta-version-discalimer-closed');
    if (isClosed) {
      setHidden(true);
    }
  }, []);

  const handleClose = () => {
    setHidden(true);
    sessionStorage.setItem('beta-version-discalimer-closed', 'true');
  };

  return (
    <div
      className={cx(
        'w-full z-50 flex bg-background-middle justify-center transform-all ease-in-out duration-300 overflow-hidden text-black',
        {
          'h-0': hidden,
          'h-auto p-3': !hidden,
        }
      )}
    >
      <p className="text-sm mr-2">
        <FormattedMessage
          defaultMessage="HeCo Invest is currently on Beta version. We still testing and making improvements and for that reason some features may not be fully functional. <a>About the Beta version</a>"
          id="Qnrkzi"
          values={{
            a: (chunk: string) => (
              <a className="underline" href={`${Paths.FAQ}#beta`}>
                {chunk}
              </a>
            ),
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
