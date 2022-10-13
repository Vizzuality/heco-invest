import { FormattedMessage, useIntl } from 'react-intl';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type TermsConditionsProps = InferGetStaticPropsType<typeof getStaticProps>;

const TermsConditions: PageComponent<TermsConditionsProps, StaticPageLayoutProps> = () => {
  const { formatMessage } = useIntl();
  return (
    <div>
      <Head title={formatMessage({ defaultMessage: 'Terms & Conditions', id: 'arPp4e' })} />
      <LayoutContainer className="bg-background-light">
        <div>
          <h1 className="mb-6 font-serif text-4xl text-center md:text-6xl text-green-dark sm:mb-0">
            <FormattedMessage defaultMessage="This page is coming soon" id="2ffyX7" />
          </h1>
        </div>
      </LayoutContainer>
    </div>
  );
};

TermsConditions.layout = {
  props: {
    footerProps: {
      className: 'mt-0 sm:absolute bottom-0 left-0 right-0',
    },
  },
};

export default TermsConditions;
