import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { GetServerSideProps } from 'next';

import useMe from 'hooks/me';

import { loadI18nMessages } from 'helpers/i18n';

import Alert from 'components/alert';
import Button from 'components/button';
import { Paths, UserRoles } from 'enums';
import { PageComponent } from 'types';
import { InvitedUserInfo } from 'types/invitation';

import { getInvitedUser, useAcceptInvitation } from 'services/invitation/invitationService';

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  let invitedUser: InvitedUserInfo = null;

  try {
    const { invitation_token } = query;
    invitedUser = await getInvitedUser(invitation_token as string);
  } catch (e) {
    return { notFound: true };
  }

  if (invitedUser.requires_registration) {
    return {
      redirect: {
        destination: `${Paths.SignUp}?invitation_token=${query?.invitation_token}`,
        permanent: true,
      },
    };
  }

  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      invitedUser,
    },
  };
};

type InvitationServerSideProps = {
  invitedUser: InvitedUserInfo;
};

const Invitation: PageComponent<InvitationServerSideProps> = ({ invitedUser }) => {
  const { formatMessage } = useIntl();
  const { user, isError } = useMe();
  const acceptInvitation = useAcceptInvitation();
  const { push, query } = useRouter();

  // If the user has an user account but is not signed in
  if (isError) {
    push({ pathname: Paths.SignIn, query: { invitation_token: query.invitation_token } });
    return null;
  }

  // If the user already has a PD or Investor account
  if (!!user && user?.role !== UserRoles.Light) {
    push(Paths.Dashboard);
    return null;
  }

  const handleAccept = () => {
    acceptInvitation.mutate(query.invitation_token as string, {
      onSuccess: () => push(Paths.Dashboard),
    });
  };

  return (
    <div className="flex flex-col items-center w-full min-h-[calc(100vh-100px)] lg:min-h-[calc(100vh-176px)]">
      <div className="flex items-center justify-center rounded-full w-44 h-44 bg-background-middle">
        <Image
          src="/images/invitation.svg"
          width={112}
          height={97}
          alt={formatMessage({ defaultMessage: 'Invitation mail', id: 'a+vAPa' })}
        />
      </div>
      <div className="max-w-lg text-center">
        <h1 className="mb-6 font-serif text-3xl font-semibold mt-7 text-green-dark">
          <FormattedMessage
            defaultMessage="You have been invited to join {accountName} account"
            id="MZI6bG"
            values={{
              accountName: invitedUser.account_name,
            }}
          />
        </h1>
        <p className="max-w-md m-auto text-base">
          <FormattedMessage
            defaultMessage="By accepting this invitation you will belong to  {accountName} Project Developers’ account."
            id="OwLYPT"
            values={{
              accountName: invitedUser.account_name,
            }}
          />
        </p>
        <div className="flex justify-center gap-4 mb-8 mt-14">
          <Button onClick={() => push(Paths.Home)} theme="secondary-green">
            <FormattedMessage defaultMessage="Ignore" id="paBpxN" />
            {/* <FormattedMessage defaultMessage="Discard" id="nmpevl" /> */}
          </Button>
          <Button onClick={handleAccept}>
            <FormattedMessage defaultMessage="Accept" id="sjzLbX" />
          </Button>
        </div>
        {acceptInvitation.isError && (
          <Alert className="my-4">
            {Array.isArray(acceptInvitation.error?.message)
              ? acceptInvitation.error.message.map(({ title }) => title).join('\n')
              : acceptInvitation.error?.message}
          </Alert>
        )}
        <Link href={`${Paths.FAQ}#accounts`} passHref>
          <a className="text-base text-gray-700 underline">
            <FormattedMessage defaultMessage="How do accounts work?" id="/ITXlB" />
          </a>
        </Link>
      </div>
    </div>
  );
};

Invitation.layout = {};

export default Invitation;
