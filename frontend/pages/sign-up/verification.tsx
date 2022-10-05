import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { loadI18nMessages } from 'helpers/i18n';

import Button from 'components/button';
import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { UserRoles } from 'enums';
import ProtectedPage from 'layouts/protected-page';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';

import { useSendEmailConfirmation } from 'services/email-confirmation';
import Loading from 'components/loading';

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
    <ProtectedPage allowUnapproved permissions={[UserRoles.Light]}>
      <Head
        title={intl.formatMessage({
          defaultMessage: 'Choose your account type',
          id: 'oMC3r1',
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
                alt={intl.formatMessage({ defaultMessage: 'Mail box', id: 'KpDPYL' })}
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
    </ProtectedPage>
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
