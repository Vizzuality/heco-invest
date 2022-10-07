import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Button from 'components/button';
import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
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
  const { back } = useRouter();

  return (
    <div className="h-screen">
      <Head title={formatMessage({ defaultMessage: 'Coming soon', id: 'e61Jf3' })} />
      <Header />
      <LayoutContainer className="flex flex-col items-center justify-center h-full bg-background-light">
        <div className="mb-10 text-center">
          <Image
            src="/images/internal-error.png"
            height={307}
            width={814}
            alt="500"
            objectFit="contain"
          />
          <h1 className="mt-10 mb-4 font-serif text-3xl text-green-dark">
            <FormattedMessage defaultMessage="Internal server error" id="XBoahx" />
          </h1>
          <p className="underline">
            <FormattedMessage
              defaultMessage="Something went wrong. We are working on to fix the problem"
              id="pNT23f"
            />
          </p>
        </div>
        <Button onClick={() => back()}>
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
