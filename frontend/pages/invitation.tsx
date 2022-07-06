import { useEffect } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import useMe from 'hooks/me';

import { loadI18nMessages } from 'helpers/i18n';

import Alert from 'components/alert';
import Button from 'components/button';
import Loading from 'components/loading';
import { Paths, UserRoles } from 'enums';
import { PageComponent } from 'types';

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
  const { push, query, replace } = useRouter();
  const {
    invitedUser,
    isError: invitedUserError,
    isLoading: invitedUserLoading,
  } = useInvitedUser(query.invitation_token as string);
  const { user, isError: userError, isLoading: userLoading } = useMe();
  const acceptInvitation = useAcceptInvitation();

  useEffect(() => {
    if (!!invitedUser && !!user && user.email !== invitedUser.email) {
      replace(Paths.Dashboard);
    }
    // If the user has an user account but is not signed in
    if (!!invitedUser && userError) {
      replace({
        pathname: invitedUser.requires_registration ? Paths.SignUp : Paths.SignIn,
        query: { invitation_token: query.invitation_token },
      });
      return null;
    }
  }, [invitedUser, query.invitation_token, replace, user, userError]);

  useEffect(() => {
    if (!!user && user?.role !== UserRoles.Light) {
      // If the user already has a PD or Investor account
      replace(Paths.Dashboard);
    }
  }, [replace, user]);

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
      {invitedUserLoading || userLoading ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <Loading visible iconClassName="w-16 h-16" />
        </div>
      ) : invitedUserError || !query.invitation_token ? (
        <div className="max-w-lg text-center mt-10">
          <Alert withLayoutContainer>
            <FormattedMessage defaultMessage="Invalid invitation token" id="XimHnV" />
          </Alert>
        </div>
      ) : (
        <div className="max-w-lg text-center">
          <h1 className="mb-6 font-serif text-3xl font-semibold mt-7 text-green-dark">
            <FormattedMessage
              defaultMessage="You have been invited to join the {accountName} account"
              id="MZI6bG"
              values={{
                accountName: invitedUser?.account_name,
              }}
            />
          </h1>
          <p className="max-w-md m-auto text-base">
            <FormattedMessage
              defaultMessage="By accepting this invitation you will belong to  {accountName} Project Developers’ account."
              id="OwLYPT"
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
          <Link href={`${Paths.FAQ}#accounts`} passHref>
            <a className="text-base text-gray-700 underline">
              <FormattedMessage defaultMessage="How do accounts work?" id="/ITXlB" />
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

Invitation.layout = {};

export default Invitation;
