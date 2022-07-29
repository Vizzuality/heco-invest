import { useCallback, useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import useMe from 'hooks/me';
import { FaqPaths, FaqQuestions } from 'hooks/useFaq';

import { loadI18nMessages } from 'helpers/i18n';

import Alert from 'components/alert';
import Button from 'components/button';
import ErrorMessage from 'components/forms/error-message';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import Loading from 'components/loading';
import { Paths, UserRoles } from 'enums';
import AuthPageLayout, { AuthPageLayoutProps } from 'layouts/auth-page';
import { PageComponent } from 'types';
import { SignIn } from 'types/sign-in';
import { useSignInResolver } from 'validations/sign-in';

import { useSignIn } from 'services/authentication/authService';
import { useAcceptInvitation, useInvitedUser } from 'services/invitation/invitationService';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type ProjectDeveloperProps = InferGetStaticPropsType<typeof getStaticProps>;

const SignIn: PageComponent<ProjectDeveloperProps, AuthPageLayoutProps> = () => {
  const { query, replace } = useRouter();
  const intl = useIntl();
  const signIn = useSignIn();
  const acceptInvitation = useAcceptInvitation();
  const resolver = useSignInResolver();
  const { user, isLoading: isUserLoading } = useMe();
  const { invitedUser, isLoading: isInvitedUserLoading } = useInvitedUser(
    query.invitation_token as string
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<SignIn>({
    resolver,
    shouldUseNativeValidation: true,
    defaultValues: { email: invitedUser?.email },
  });

  useEffect(() => {
    // Wait until user and inviteUser are loaded to be able to compare them
    if (!isUserLoading && !isInvitedUserLoading) {
      if (!!invitedUser) {
        // If the user has an invitation and is signed in go to invitation page
        if (!!user && user?.role === UserRoles.Light) {
          replace({
            pathname: Paths.Invitation,
            query: { invitation_token: query.invitation_token },
          });
        }
        setValue('email', invitedUser.email);
      } else if (!!user) {
        // If is not a invited user and is already signed in
        if (user?.role === UserRoles.Light) {
          // If the user don't have an account go to the 'choose account type' page
          replace(Paths.AccountType);
        } else {
          // If the user has an account go to the dashboard
          replace(Paths.Dashboard);
        }
      }
    }
  }, [
    invitedUser,
    isInvitedUserLoading,
    isUserLoading,
    query.invitation_token,
    replace,
    setValue,
    user,
  ]);

  const handleSignIn = useCallback(
    (data: SignIn) => {
      signIn.mutate(data, {
        onSuccess: () => {
          if (!!invitedUser) {
            acceptInvitation.mutate(query.invitation_token as string, {
              onSuccess: () => replace(Paths.Dashboard),
            });
          } else {
            replace(Paths.Dashboard);
          }
        },
      });
    },
    [signIn, invitedUser, acceptInvitation, query.invitation_token, replace]
  );

  const onSubmit: SubmitHandler<SignIn> = handleSignIn;

  return (
    <div className="flex flex-col justify-center w-full h-full max-w-xl m-auto">
      <h1 className="mb-2.5 font-serif text-4xl font-semibold text-green-dark">
        <FormattedMessage defaultMessage="Sign in" id="SQJto2" />
      </h1>
      <p className="mb-6.5 font-sans text-base text-gray-600">
        <FormattedMessage
          defaultMessage="Welcome to HeCo Invest. Please enter your details below."
          id="ZjA6uH"
        />
      </p>

      {!!invitedUser && (
        <div className="w-full p-4 mb-6 rounded-lg bg-beige">
          <FormattedMessage
            defaultMessage="By signing in you will be automatically added to the {accountName} account. <a>How accounts work?</a>"
            id="RUzNGu"
            values={{
              accountName: invitedUser.account_name,
              a: (chunks: string) => (
                <a className="underline" href={FaqPaths[FaqQuestions.HowDoAccountsWork]}>
                  {chunks}
                </a>
              ),
            }}
          />
        </div>
      )}

      {acceptInvitation.isError && acceptInvitation.error.message ? (
        Array.isArray(acceptInvitation.error.message) ? (
          <ul>
            {acceptInvitation.error.message.map((err: any) => (
              <Alert key={err.title} withLayoutContainer className="mt-6">
                <li key={err.title}>{err.title}</li>
              </Alert>
            ))}
          </ul>
        ) : (
          <Alert withLayoutContainer className="mt-6">
            {acceptInvitation.error.message}
          </Alert>
        )
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {signIn.error?.message && (
          <Alert type="warning" className="mb-4.5" withLayoutContainer>
            {Array.isArray(signIn.error?.message)
              ? signIn.error.message[0].title
              : signIn.error.message}
          </Alert>
        )}
        <div className="w-full mb-4.5">
          <Label htmlFor="email">
            <FormattedMessage defaultMessage="Email" id="sy+pv5" />
            <Input
              type="email"
              name="email"
              id="email"
              placeholder={intl.formatMessage({
                defaultMessage: 'Insert your email',
                id: 'ErIkUS',
              })}
              aria-describedby="email-error"
              register={register}
              className="mt-2.5"
            />
          </Label>
          <ErrorMessage id="email-error" errorText={errors.email?.message} />
        </div>
        <div className="md:gap-4 md:flex mt-2.5">
          <div className="w-full">
            <div className="flex justify-between mb-2.5">
              <Label htmlFor="password">
                <FormattedMessage defaultMessage="Password" id="5sg7KC" />
              </Label>
              <Link href={Paths.ForgotPassword}>
                <a
                  id="password-description"
                  className="font-sans text-sm font-normal cursor-pointer text-green-dark"
                >
                  <FormattedMessage defaultMessage="Forgot password?" id="V/JHlm" />
                </a>
              </Link>
            </div>
            <Input
              type="password"
              placeholder={intl.formatMessage({
                defaultMessage: 'Insert password',
                id: 'HnG9/3',
              })}
              name="password"
              id="password"
              aria-describedby="password-description password-error"
              register={register}
            />
            <ErrorMessage id="password-error" errorText={errors.password?.message} />
          </div>
        </div>
        <div className="flex justify-center mt-15">
          <Button type="submit" disabled={signIn.isLoading}>
            <Loading visible={signIn.isLoading} className="mr-2.5" />
            <FormattedMessage defaultMessage="Sign in" id="SQJto2" />
          </Button>
        </div>
      </form>
    </div>
  );
};

SignIn.layout = {
  Component: AuthPageLayout,
  props: {
    headerProps: {
      pageType: 'sign-in',
    },
    asideProps: {
      photo: 'side-02',
    },
  },
};

export default SignIn;
