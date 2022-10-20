import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Button from 'components/button';
import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { Paths } from 'enums';
import NakedLayout, { NakedLayoutProps } from 'layouts/naked';
import Header from 'layouts/static-page/header';
import { PageComponent } from 'types';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type InternalErrorProps = InferGetStaticPropsType<typeof getStaticProps>;

const InternalError: PageComponent<InternalErrorProps, NakedLayoutProps> = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="h-screen">
      <Head title={formatMessage({ defaultMessage: 'Error 404', id: '1HohzV' })} />
      <Header />
      <LayoutContainer className="flex flex-col items-center justify-center h-full bg-background-light">
        <div className="mb-10 text-center">
          <Image
            src="/images/not-found.png"
            height={307}
            width={814}
            alt={formatMessage({ defaultMessage: 'Error 404', id: '1HohzV' })}
            objectFit="contain"
          />
          <h1 className="mt-10 mb-4 font-serif text-3xl text-green-dark">
            <FormattedMessage defaultMessage="Page not found" id="QRccCM" />
          </h1>
          <p>
            <FormattedMessage
              defaultMessage="It looks like the link is broken or the page has been removed."
              id="oD3qdW"
            />
          </p>
        </div>
        <Button to={Paths.Home}>
          <FormattedMessage defaultMessage="Go back" id="orvpWh" />
        </Button>
      </LayoutContainer>
    </div>
  );
};

InternalError.layout = {
  Component: NakedLayout,
  props: {},
};

export default InternalError;
