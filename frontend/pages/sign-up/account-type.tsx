import { FormattedMessage, useIntl } from 'react-intl';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { loadI18nMessages } from 'helpers/i18n';

import AccountTypeSelector from 'containers/account-type-selector';

import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { Paths } from 'enums';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { AccountType, PageComponent } from 'types';

export async function getServerSideProps(ctx) {
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
    },
  };
}

const SignUpAccountTypePage: PageComponent<{}, StaticPageLayoutProps> = () => {
  const intl = useIntl();
  const { push } = useRouter();

  const handleAccountTypeSelected = (accountType: AccountType) => {
    // TODO: Handle account type selected
    if (accountType === 'project-developer') push('/project-developers/new');
  };

  return (
    <>
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
            <div className="max-w-lg text-center">
              <h1 className="mb-6 font-serif text-3xl text-green-dark">
                <FormattedMessage defaultMessage="One more step to go" id="MZl85Y" />
              </h1>
              <p>
                <FormattedMessage
                  defaultMessage="To complete you registration and make full use of the platform, please select which account you would like to create."
                  id="eSLLyC"
                />
              </p>
            </div>
            <AccountTypeSelector
              className="max-w-3xl mt-6"
              onAccountTypeSelected={handleAccountTypeSelected}
            />
            <Link href={Paths.FAQ}>
              <a className="mt-6 text-gray-600 underline transition-colors hover:text-green-dark active:text-green-dark outline-green-dark outline-rounded">
                <FormattedMessage defaultMessage="How accounts work?" id="0hzVw6" />
              </a>
            </Link>
          </section>
        </LayoutContainer>
      </div>
    </>
  );
};

SignUpAccountTypePage.layout = {
  props: {
    mainProps: {
      topMargin: false,
    },
    footerProps: {
      hidden: true,
    },
  },
};

export default SignUpAccountTypePage;
