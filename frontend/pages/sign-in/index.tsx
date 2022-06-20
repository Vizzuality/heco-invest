import { useCallback, useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import Link from 'next/link';
import { useRouter } from 'next/router';

import useMe from 'hooks/me';

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
import { InvitedUser } from 'types/user';
import { useSignInResolver } from 'validations/sign-in';

import { useSignIn } from 'services/authentication/authService';
import { getInvitedUser } from 'services/users/userService';

export const getServerSideProps = async ({ locale, query }) => {
  let invitedUser = null;

  // If it is an invitation redirect
  if (query?.token) {
    try {
      invitedUser = await getInvitedUser(query.token as string);
    } catch (e) {
      return { notFound: true };
    }
  }

  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      invitedUser,
    },
  };
};

type SignInPageProps = {
  invitedUser: InvitedUser;
};

const SignIn: PageComponent<SignInPageProps, AuthPageLayoutProps> = ({ invitedUser }) => {
  const { push, query } = useRouter();
  const intl = useIntl();
  const signIn = useSignIn();
  const resolver = useSignInResolver();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignIn>({
    resolver,
    shouldUseNativeValidation: true,
    defaultValues: { email: invitedUser?.email },
  });
  const { user } = useMe();

  useEffect(() => {
    if (user) {
      if (user?.role === UserRoles.Light) {
        push(Paths.AccountType);
      } else {
        push(Paths.Dashboard);
      }
    }
  }, [push, query.callbackUrl, user]);

  const handleSignIn = useCallback((data: SignIn) => signIn.mutate(data), [signIn]);

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
        <div className="w-full bg-background-middle">
          <FormattedMessage
            defaultMessage="By signing up you will be automatically added to {accountName} account. How account’s work?"
            id="ZgpBay"
            values={{ accountName: invitedUser.account_name }}
          />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {signIn.error?.message && (
          <Alert className="mb-4.5" withLayoutContainer>
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
