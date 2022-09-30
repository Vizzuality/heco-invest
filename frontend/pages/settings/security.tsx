import { useIntl } from 'react-intl';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Settings2FA from 'containers/settings-security/2fa';
import SettingsChangePassword from 'containers/settings-security/change-password';

import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { UserRoles } from 'enums';
import NakedLayout from 'layouts/naked';
import ProtectedPage from 'layouts/protected-page';
import SettingsLayout, { SettingsLayoutProps } from 'layouts/settings';
import { PageComponent } from 'types';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type InformationPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Information: PageComponent<InformationPageProps, SettingsLayoutProps> = () => {
  const { formatMessage } = useIntl();

  return (
    <ProtectedPage permissions={[UserRoles.ProjectDeveloper, UserRoles.Investor, UserRoles.Light]}>
      <Head title={formatMessage({ defaultMessage: 'Account security', id: 'bALo1R' })} />
      <SettingsLayout>
        <LayoutContainer
          layout="narrow"
          className="flex flex-col gap-4 mt-6  md:!max-w-2xl xl:!max-w-3xl"
        >
          <SettingsChangePassword />
          <Settings2FA />
        </LayoutContainer>
      </SettingsLayout>
    </ProtectedPage>
  );
};

Information.layout = {
  Component: NakedLayout,
};

export default Information;
