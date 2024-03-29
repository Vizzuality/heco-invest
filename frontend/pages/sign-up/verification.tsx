import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { loadI18nMessages } from 'helpers/i18n';

import Button from 'components/button';
import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import Loading from 'components/loading';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';

import { useSendEmailConfirmation } from 'services/email-confirmation';

export const getServerSideProps = withLocalizedRequests(async ({ locale }) => ({
  props: {
    intlMessages: await loadI18nMessages({ locale }),
  },
}));

const SignUpVerification: PageComponent<{}, StaticPageLayoutProps> = () => {
  const intl = useIntl();
  const { query } = useRouter();
  const sendEmailConfirmation = useSendEmailConfirmation();

  const handleResendEmail = () => {
    sendEmailConfirmation.mutate(query.email as string);
  };

  return (
    <div>
      <Head
        title={intl.formatMessage({
          defaultMessage: 'Verification link sent',
          id: 'kY/+zt',
        })}
      />

      <div className="flex justify-center min-h-screen">
        <LayoutContainer
          layout="narrow"
          className="flex items-center justify-center mt-24 md:mt-36 pb-[10%]"
        >
          <section className="flex flex-col items-center justify-center">
            <div className="flex items-center w-44 h-44 justify-center pl-2.5 pt-10 pb-[1px] mb-6 rounded-full bg-background-middle">
              <Image
                src="/images/sign-up-code.png"
                width={104}
                height={133}
                alt={intl.formatMessage({ defaultMessage: 'Mailbox', id: '2/NFiJ' })}
                objectFit="contain"
                aria-hidden
              />
            </div>
            <div className="max-w-lg text-center">
              <h1 className="mb-6 font-serif text-3xl text-green-dark">
                <FormattedMessage defaultMessage="Verification link sent" id="kY/+zt" />
              </h1>
              <p>
                <FormattedMessage
                  defaultMessage="We emailed a confirmation link to <email></email>. Please confirm your email to sign in."
                  values={{
                    email: () => <span className="font-semibold">{query.email}</span>,
                  }}
                  id="TLmQPG"
                />
              </p>
              <p className="mt-4 text-sm">
                <FormattedMessage
                  defaultMessage="Use the ‘Resend email’ button below to resend the verification email in case you don’t receive it. Note that you must wait 30 seconds before resending."
                  id="hwNIf9"
                />
              </p>
            </div>
            <Button
              className="mt-6"
              disabled={sendEmailConfirmation.isLoading}
              onClick={handleResendEmail}
            >
              <Loading visible={sendEmailConfirmation.isLoading} className="block" />
              <FormattedMessage defaultMessage="Resend email" id="5q4xKF" />
            </Button>
          </section>
        </LayoutContainer>
      </div>
    </div>
  );
};

SignUpVerification.layout = {
  props: {
    mainProps: {
      topMargin: false,
    },
    footerProps: {
      hidden: true,
    },
  },
};

export default SignUpVerification;
