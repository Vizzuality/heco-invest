import React from 'react';

import { useIntl } from 'react-intl';

import NextHead from 'next/head';
import { useRouter } from 'next/router';

import { FRONTEND_URL } from 'vars.config';

import { HeadProps } from './types';

export const Head: React.FC<HeadProps> = ({
  title: customTitle,
  description: customDescription,
  children,
}: HeadProps) => {
  const { locales, asPath } = useRouter();
  const intl = useIntl();

  const title = customTitle ? `${customTitle} | Heco Invest` : 'Heco Invest';
  const description =
    customDescription ||
    intl.formatMessage({
      defaultMessage:
        'HeCo Invest is a digital collaborative platform aimed to support filling the conservation financing gap in the Amazon Basin by optimizing project financing channels in this region.',
      id: 'HzKhBJ',
      description: 'Description shown in search engines',
    });
  // const imageUrl = ''; // A complete URL is required by at least Twitter

  return (
    <NextHead>
      <title key="title">{title}</title>
      <meta key="description" name="description" content={description} />
      {locales.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={`${FRONTEND_URL}/${locale}${asPath}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${FRONTEND_URL}${asPath}`} />

      {/* <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content="Heco Invest" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <link rel="manifest" href="manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <link rel="shortcut icon" href="/favicon.ico" /> */}
      {children}
    </NextHead>
  );
};

export default Head;
