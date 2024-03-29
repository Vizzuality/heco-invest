import { useState } from 'react';

import { Mail as MailIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import UsersTable from 'containers/dashboard/users/table';
import InviteUsersModal from 'containers/users/invite-users-modal';

import Button from 'components/button';
import Head from 'components/head';
import Icon from 'components/icon';
import { UserRoles } from 'enums';
import DashboardLayout, { DashboardLayoutProps } from 'layouts/dashboard';
import NakedLayout from 'layouts/naked';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';

import { useAccount } from 'services/account';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type UsersPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const UsersPage: PageComponent<UsersPageProps, DashboardLayoutProps> = () => {
  const [openInvitationModal, setOpenInvitationModal] = useState(false);
  const intl = useIntl();
  const { user, userAccount } = useAccount();

  return (
    <ProtectedPage permissions={[UserRoles.ProjectDeveloper, UserRoles.Investor]}>
      <Head title={intl.formatMessage({ defaultMessage: 'My users', id: 'lda5xz' })} />
      <DashboardLayout
        buttons={
          user?.owner && (
            <Button
              className="drop-shadow-xl"
              theme="primary-white"
              onClick={() => setOpenInvitationModal(true)}
            >
              <Icon icon={MailIcon} className="w-4 h-4 mr-2" aria-hidden />
              <FormattedMessage defaultMessage="Invite user" id="/4GN+O" />
            </Button>
          )
        }
      >
        <div className="pt-4">
          <UsersTable accountName={userAccount?.name} isOwner={user?.owner} />
        </div>
      </DashboardLayout>
      <InviteUsersModal
        openInvitationModal={openInvitationModal}
        setOpenInvitationModal={setOpenInvitationModal}
      />
    </ProtectedPage>
  );
};

UsersPage.layout = {
  Component: NakedLayout,
};

export default UsersPage;
