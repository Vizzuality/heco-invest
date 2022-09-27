import { FC, useState, useEffect } from 'react';

import { OverlayContainer } from '@react-aria/overlays';

import { useCookiesConsent } from 'hooks/use-cookies-consent';

import NoticeContent from './notice-content';
import { PrivacyNoticeProps } from './types';

export const PrivacyNotice: FC<PrivacyNoticeProps> = ({}: PrivacyNoticeProps) => {
  const [mounted, setMounted] = useState(false);

  const { consentDate } = useCookiesConsent();

  // When the component is mounted, we store that information
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  // We avoid a flash of the privacy notice by not displaying it  until the component has mounted
  if (!mounted) {
    return null;
  }

  // Whether the user has allowed the cookies or not, the notice should not be displayed again
  if (consentDate) {
    return null;
  }

  return (
    <OverlayContainer>
      <NoticeContent />
    </OverlayContainer>
  );
};

export default PrivacyNotice;
