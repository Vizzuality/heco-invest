import { Mail as MailIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Button from 'components/button';
import Head from 'components/head';
import Icon from 'components/icon';
import { UserRoles } from 'enums';
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

type UsersPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const UsersPage: PageComponent<UsersPageProps, DashboardLayoutProps> = () => {
  const intl = useIntl();

  return (
    <ProtectedPage permissions={[UserRoles.ProjectDeveloper, UserRoles.Investor]}>
      <Head title={intl.formatMessage({ defaultMessage: 'My users', id: 'lda5xz' })} />
      <DashboardLayout
        buttons={
          <Button className="drop-shadow-xl" theme="primary-white">
            <Icon icon={MailIcon} className="w-4 h-4 mr-2" aria-hidden />
            <FormattedMessage defaultMessage="Invite user" id="/4GN+O" />
          </Button>
        }
      >
        Users page
      </DashboardLayout>
    </ProtectedPage>
  );
};

UsersPage.layout = {
  Component: NakedLayout,
};

export default UsersPage;
