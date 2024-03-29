import { useEffect } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import useMe from 'hooks/me';
import { FaqPaths, FaqQuestions } from 'hooks/useFaq';

import { loadI18nMessages } from 'helpers/i18n';

import Alert from 'components/alert';
import Button from 'components/button';
import Loading from 'components/loading';
import { Paths } from 'enums';
import { PageComponent } from 'types';

import { useSignOut } from 'services/authentication/authService';
import { useAcceptInvitation, useInvitedUser } from 'services/invitation/invitationService';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type InvitationProps = InferGetStaticPropsType<typeof getStaticProps>;

const Invitation: PageComponent<InvitationProps> = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();
  const {
    invitedUser,
    isError: invitedUserError,
    isLoading: invitedUserLoading,
  } = useInvitedUser((query.invitation_token as string) || 'INVALID_INVITATION_TOKEN');
  //The useInvitedUser is only enabled when the query.invitation_token is not null, so we set it to any string to show an error if the query.invitation_token is null
  const { user, isError: userError, isLoading: userLoading } = useMe();
  const acceptInvitation = useAcceptInvitation();
  const signOut = useSignOut();
  const queryClient = useQueryClient();

  useEffect(() => {
    // The conditions will only be tested if the user and invited user are already fetched
    if (!userLoading && !invitedUserLoading) {
      if (!!invitedUser && !!user && user.email !== invitedUser.email) {
        // The invited user and the signed in user are different we sign out the user to start the invitation flow again
        signOut.mutate({});
      } else if (!!invitedUser && userError) {
        // The user is not signed in
        push({
          pathname: invitedUser.requires_registration
            ? // The invited user needs sign-up before accept invitation
              Paths.SignUp
            : // If the user has a ligth user account but is not signed in
              Paths.SignIn,
          query: { invitation_token: query.invitation_token },
        });
      }
    }
  }, [
    invitedUser,
    invitedUserLoading,
    query.invitation_token,
    queryClient,
    push,
    signOut,
    user,
    userError,
    userLoading,
  ]);

  const handleAccept = () => {
    acceptInvitation.mutate(query.invitation_token as string, {
      onSuccess: async () => {
        push(Paths.Dashboard);
      },
    });
  };

  const InvitationContent = () => {
    if (invitedUserError) {
      return (
        <div className="max-w-lg mt-20 overflow-hidden text-center rounded-lg">
          <Alert withLayoutContainer>
            <p className="text-lg">
              <FormattedMessage defaultMessage="Invalid invitation token" id="XimHnV" />
            </p>
          </Alert>
        </div>
      );
    }

    if (!!invitedUser && !!user) {
      return (
        <div className="max-w-lg text-center">
          <h1 className="mb-6 font-serif text-3xl font-semibold mt-7 text-green-dark">
            <FormattedMessage
              defaultMessage="You have been invited to join the {accountName} account"
              id="zxHx8B"
              values={{
                accountName: invitedUser?.account_name,
              }}
            />
          </h1>
          <p className="max-w-md m-auto text-base">
            <FormattedMessage
              defaultMessage="By accepting this invitation you will belong to the {accountName} account."
              id="jvHO6d"
              values={{
                accountName: invitedUser?.account_name,
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
          <Link href={FaqPaths[FaqQuestions.HowDoAccountsWork]} passHref>
            <a className="text-base text-gray-700 underline">
              <FormattedMessage defaultMessage="How do accounts work?" id="/ITXlB" />
            </a>
          </Link>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <Loading visible iconClassName="w-16 h-16" />
      </div>
    );
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
      <InvitationContent />
    </div>
  );
};

Invitation.layout = {};

export default Invitation;
