import { FC, useRef, useCallback } from 'react';

import { FormattedMessage } from 'react-intl';

import Link from 'next/link';

import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { useModal } from '@react-aria/overlays';

import { useCookiesConsent } from 'hooks/use-cookies-consent';

import Button from 'components/button';
import LayoutContainer from 'components/layout-container';
import { Paths } from 'enums';

import { NoticeContentProps } from './types';

// This is the actual content of the notice. It needs to be in a separate component because
// `useModal` uses the context API provided by `OverlayContainer` to properly hide the rest of the
// content of the page from the screen reader.
const NoticeContent: FC<NoticeContentProps> = ({}: NoticeContentProps) => {
  const { updateConsent } = useCookiesConsent();

  const dialogRef = useRef(null);
  const { modalProps } = useModal();
  const { dialogProps, titleProps } = useDialog({ 'aria-labelledby': 'privacy-notice' }, dialogRef);

  const onAcceptCookies = useCallback(() => updateConsent(true, +new Date()), [updateConsent]);

  const onRefuseCookies = useCallback(() => updateConsent(false, +new Date()), [updateConsent]);

  return (
    <div className="fixed bottom-0 left-0 z-10 w-full bg-beige">
      <LayoutContainer>
        <FocusScope
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          restoreFocus
        >
          <div
            {...modalProps}
            {...dialogProps}
            ref={dialogRef}
            className="py-3 text-sm sm:py-6 sm:flex"
          >
            <div>
              <h1 {...titleProps} id="privacy-notice" className="sr-only">
                <FormattedMessage defaultMessage="Privacy notice" id="b8sVDI" />
              </h1>
              <p>
                <FormattedMessage
                  defaultMessage="We use cookies for analytics, personalization, and marketing purposes. Only essential cookies are active by default to ensure you get the best experience. Please read our <a>Cookie Policy</a> to learn more."
                  id="RrcFtD"
                  values={{
                    a: (chunks) => (
                      <Link href={Paths.TermsConditions}>
                        <a
                          className="underline focus-visible:outline focus-visible:outline-green-dark focus-visible:outline-2 focus-visible:outline-offset-2"
                          target="_blank"
                        >
                          {chunks}
                        </a>
                      </Link>
                    ),
                  }}
                />
              </p>
            </div>
            <div className="flex flex-col items-stretch mt-4 gap-y-2 sm:mt-0 sm:ml-4 lg:ml-6 sm:flex-shrink-0 lg:flex-row-reverse lg:items-start lg:gap-x-6">
              <Button type="button" className="justify-center" onClick={onAcceptCookies}>
                <FormattedMessage defaultMessage="Accept all cookies" id="jvP3C2" />
              </Button>
              <Button
                type="button"
                theme="secondary-green"
                className="justify-center"
                onClick={onRefuseCookies}
              >
                <FormattedMessage defaultMessage="Reject non-essential cookies" id="UH7Vx0" />
              </Button>
            </div>
          </div>
        </FocusScope>
      </LayoutContainer>
    </div>
  );
};

export default NoticeContent;
