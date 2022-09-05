import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { loadI18nMessages } from 'helpers/i18n';

import OpenCallDetailsTable from 'containers/dashboard/open-call-details/table';

import Head from 'components/head';
import { Paths, UserRoles } from 'enums';
import DashboardLayout, { DashboardLayoutProps } from 'layouts/dashboard';
import NakedLayout from 'layouts/naked';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';

import { useOpenCall } from 'services/open-call/open-call-service';

export const getServerSideProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type OpenCallApplicationsPageProps = {};

export const OpenCallApplicationsPage: PageComponent<
  OpenCallApplicationsPageProps,
  DashboardLayoutProps
> = () => {
  const intl = useIntl();
  const router = useRouter();

  const {
    data: openCall,
    isLoading,
    isLoadingError,
  } = useOpenCall(router.query.openCallId as string);

  const breadcrumbsProps = {
    substitutions: {
      'open-call': {
        name: intl.formatMessage({
          defaultMessage: 'Open calls',
          id: 'OBhULP',
        }),
        link: Paths.DashboardOpenCalls,
      },
      openCallId: { name: openCall?.name },
    },
    hidden: ['dashboard'],
  };

  // If we can't load the open call, it may have been removed or the user not have access to it. Let's
  // redirect the user to the Dashboard open call applications list.
  if (isLoadingError) {
    router.push(Paths.DashboardOpenCalls);
    return null;
  }

  return (
    <ProtectedPage permissions={[UserRoles.Investor]}>
      <Head
        title={intl.formatMessage(
          { defaultMessage: '{openCallName} applications', id: 'lMjl92' },
          {
            openCallName:
              openCall?.name || intl.formatMessage({ defaultMessage: 'Open call', id: 'FvveL5' }),
          }
        )}
      />
      <DashboardLayout
        isLoading={isLoading}
        header="breadcrumbs"
        breadcrumbsProps={breadcrumbsProps}
      >
        <OpenCallDetailsTable />
      </DashboardLayout>
    </ProtectedPage>
  );
};

OpenCallApplicationsPage.layout = {
  Component: NakedLayout,
};

export default OpenCallApplicationsPage;
