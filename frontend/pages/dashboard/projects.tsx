import { PlusCircle as PlusCircleIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

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

export async function getStaticProps(ctx) {
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
    },
  };
}

type ProjectsPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const ProjectsPage: PageComponent<ProjectsPageProps, DashboardLayoutProps> = () => {
  const intl = useIntl();

  return (
    <ProtectedPage permissions={[UserRoles.ProjectDeveloper]}>
      <Head title={intl.formatMessage({ defaultMessage: 'My projects', id: 'qFZuSl' })} />
      <DashboardLayout
        buttons={
          <Button className="drop-shadow-xl" theme="primary-white" to={Paths.ProjectCreation}>
            <Icon icon={PlusCircleIcon} className="w-4 h-4 mr-2" aria-hidden />
            <FormattedMessage defaultMessage="Create project" id="VUN1K7" />
          </Button>
        }
      >
        Projects page
      </DashboardLayout>
    </ProtectedPage>
  );
};

ProjectsPage.layout = {
  Component: NakedLayout,
};

export default ProjectsPage;