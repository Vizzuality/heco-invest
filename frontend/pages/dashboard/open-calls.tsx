import { PlusCircle as PlusCircleIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Button from 'components/button';
import Head from 'components/head';
import Icon from 'components/icon';
import { UserRoles } from 'enums';
import { Paths } from 'enums';
import DashboardLayout, { DashboardLayoutProps } from 'layouts/dashboard';
import NakedLayout from 'layouts/naked';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';

import { useGetOpenCallList } from 'services/open-call/open-call-service';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type OpenCallsPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const OpenCallsPage: PageComponent<OpenCallsPageProps, DashboardLayoutProps> = () => {
  const intl = useIntl();

  const openCalls = useGetOpenCallList();

  return (
    <ProtectedPage permissions={[UserRoles.Investor]}>
      <Head title={intl.formatMessage({ defaultMessage: 'My open calls', id: '8Qmt9j' })} />
      <DashboardLayout
        buttons={
          <Button className="drop-shadow-xl" theme="primary-white" to={Paths.OpenCallCreation}>
            <Icon icon={PlusCircleIcon} className="w-4 h-4 mr-2" aria-hidden />
            <FormattedMessage defaultMessage="Create open call" id="DIA26W" />
          </Button>
        }
      >
        Open calls page
      </DashboardLayout>
    </ProtectedPage>
  );
};

OpenCallsPage.layout = {
  Component: NakedLayout,
};

export default OpenCallsPage;
