import { useState } from 'react';

import { Mail as MailIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Button from 'components/button';
import Label from 'components/forms/label';
import Textarea from 'components/forms/textarea';
import Head from 'components/head';
import Icon from 'components/icon';
import Modal from 'components/modal';
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
  const [openInvitationModal, setOpenInvitationModal] = useState(false);
  const intl = useIntl();

  return (
    <ProtectedPage permissions={[UserRoles.ProjectDeveloper, UserRoles.Investor]}>
      <Head title={intl.formatMessage({ defaultMessage: 'My users', id: 'lda5xz' })} />
      <DashboardLayout
        buttons={
          <Button
            className="drop-shadow-xl"
            theme="primary-white"
            onClick={() => setOpenInvitationModal(true)}
          >
            <Icon icon={MailIcon} className="w-4 h-4 mr-2" aria-hidden />
            <FormattedMessage defaultMessage="Invite user" id="/4GN+O" />
          </Button>
        }
      >
        Users page
      </DashboardLayout>
      <Modal
        onDismiss={() => setOpenInvitationModal(false)}
        title={intl.formatMessage({ defaultMessage: 'Invite users', id: 'R+1DVQ' })}
        open={openInvitationModal}
        dismissable={true}
        size="default"
        scrollable={false}
      >
        <p>
          <FormattedMessage defaultMessage="Invite users" id="R+1DVQ" />
        </p>

        <p>
          <FormattedMessage
            defaultMessage="Users will receive an email to sign up into the platform and join NEEsT’s account."
            id="hbFTZN"
          />
        </p>

        <Label
          htmlFor="emails-users-invitation"
          className="block mb-2 text-base font-normal text-gray-600"
        >
          <FormattedMessage defaultMessage="Emails" id="AdAi3x" />
        </Label>
        {/* <Textarea
          id="prioritized-projects-description"
          name="prioritized_projects_description"
          aria-describedby="prioritized-projects-description-error"
          register={register}
          placeholder={intl.formatMessage({
            defaultMessage: 'separate emails by comma',
            id: 'UQMsiR',
          })}
          className="min-h-[240px]"
        /> */}
        <div className="flex justify-end">
          <Button
            theme="secondary-green"
            size="small"
            className="flex-shrink-0 mr-5"
            onClick={() => console.log('Cancel')}
          >
            <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
          </Button>
          <Button
            theme="primary-green"
            size="small"
            className="flex-shrink-0 mr-5"
            onClick={() => console.log('Invite')}
          >
            <FormattedMessage defaultMessage="Send invite" id="oBB4L4" />
          </Button>
        </div>
      </Modal>
    </ProtectedPage>
  );
};

UsersPage.layout = {
  Component: NakedLayout,
};

export default UsersPage;
