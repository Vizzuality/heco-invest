import { FC } from 'react';

import Script from 'next/script';

import { AnalyticsProps } from './types';

const Analytics: FC<AnalyticsProps> = () => {
  const GAKey = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
  const hotjarKey = process.env.NEXT_PUBLIC_HOTJAR_SITE_ID;

  return (
    <>
      {!!GAKey && (
        <>
          <Script
            id="google-tag-manager"
            src={`https://www.googletagmanager.com/gtag/js?id=${GAKey}`}
          />
          <Script
            id="google-tag-manager-init"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GAKey}');
              `,
            }}
          />
        </>
      )}
      {!!hotjarKey && (
        <Script
          id="hotjar-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){ h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)}; h._hjSettings={hjid:${hotjarKey},hjsv:6}; a=o.getElementsByTagName('head')[0]; r=o.createElement('script');r.async=1; r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv; a.appendChild(r); })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      )}
    </>
  );
};

export default Analytics;
