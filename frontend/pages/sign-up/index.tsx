import { useCallback, useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';

import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import useMe from 'hooks/me';

import { loadI18nMessages } from 'helpers/i18n';

import Alert from 'components/alert';
import Checkbox from 'components/forms/checkbox';
import ErrorMessage from 'components/forms/error-message';
import Input from 'components/forms/input';
import Loading from 'components/loading';
import { Paths, Queries, UserRoles } from 'enums';
import AuthPageLayout, { AuthPageLayoutProps } from 'layouts/auth-page';
import { PageComponent } from 'types';
import { SignupDto, SignupFormI } from 'types/user';
import { useSignupResolver } from 'validations/signup';

import { useAcceptInvitation, useInvitedUser } from 'services/invitation/invitationService';
import { useSignup } from 'services/users/userService';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type SignUpPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const SignUp: PageComponent<SignUpPageProps, AuthPageLayoutProps> = () => {
  const { locale, query, replace } = useRouter();
  const intl = useIntl();
  const signUp = useSignup();
  const { invitedUser } = useInvitedUser(query.invitation_token as string);
  const acceptInvitation = useAcceptInvitation();
  const resolver = useSignupResolver();
  const { user } = useMe();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<SignupFormI>({
    resolver,
    shouldUseNativeValidation: true,
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!!user) {
      if (user.role === UserRoles.Light) {
        if (!invitedUser) {
          // If the user exists and is not an invited user, redirect to the account type page
          replace(Paths.AccountType);
        } else {
          replace(Paths.Invitation);
        }
      } else {
        // If the user has a role other than light, redirect to the dashboard
        replace(Paths.Dashboard);
      }
    }
    if (!!invitedUser) {
      setValue('email', invitedUser.email);
    }
  }, [invitedUser, replace, setValue, user]);

  const handleSignUp = useCallback(
    (data: SignupDto) => {
      signUp.mutate(
        { ...data, invitation_token: query.invitation_token as string },
        {
          onSuccess: () => {
            if (!!invitedUser) {
              acceptInvitation.mutate(query.invitation_token as string);
            } else {
              replace(Paths.AccountType);
            }
            queryClient.invalidateQueries([Queries.User]);
          },
        }
      );
    },
    [invitedUser, signUp, query.invitation_token, queryClient, acceptInvitation, replace]
  );

  const onSubmit: SubmitHandler<SignupFormI> = async (values) => {
    const { confirm_password, accept_terms, ...rest } = values;
    const newUser: SignupDto = {
      ...rest,
      ui_language: locale,
    };
    handleSignUp(newUser);
  };

  return (
    <div>
      <h1 className="mb-2.5 font-serif text-4xl font-semibold text-green-dark">
        <FormattedMessage defaultMessage="Sign up" id="8HJxXG" />
      </h1>
      <p className="mb-1.5 font-sans text-base text-gray-600">
        <FormattedMessage defaultMessage="Please enter your details below." id="rfVDxL" />
      </p>

      {!!invitedUser && (
        <div className="w-full p-4 mt-6 rounded-lg bg-beige">
          <FormattedMessage
            defaultMessage="By signing up you will be automatically added to the {accountName} account. <a>How accounts work?</a>"
            id="DHLi++"
            values={{
              accountName: invitedUser.account_name,
              a: (chunks: string) => (
                <a className="underline" href={`${Paths.FAQ}#accounts`}>
                  {chunks}
                </a>
              ),
            }}
          />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {signUp.isError && signUp.error.message ? (
          Array.isArray(signUp.error.message) ? (
            <ul>
              {signUp.error.message.map((err: any) => (
                <Alert key={err.title} withLayoutContainer className="mt-6">
                  <li key={err.title}>{err.title}</li>
                </Alert>
              ))}
            </ul>
          ) : (
            <Alert withLayoutContainer className="mt-6">
              {signUp.error.message}
            </Alert>
          )
        ) : null}
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
        <div className="md:flex md:gap-4">
          <div className="w-full">
            <label htmlFor="first-name">
              <p className="mb-2.5 mt-4.5 font-sans text-sm font-semibold text-gray-800">
                <FormattedMessage defaultMessage="First name" id="pONqz8" />
              </p>
              <Input
                type="text"
                name="first_name"
                id="first-name"
                placeholder={intl.formatMessage({
                  defaultMessage: 'Insert your name',
                  id: 'Q1Q4rT',
                })}
                aria-describedby="first-name-error"
                register={register}
              />
            </label>
            <ErrorMessage id="first-name-error" errorText={errors.first_name?.message} />
          </div>
          <div className="w-full">
            <label htmlFor="last-name">
              <p className="mb-2.5 mt-4.5 font-sans text-sm font-semibold text-gray-800">
                <FormattedMessage defaultMessage="Last name" id="txUL0F" />
              </p>
              <Input
                type="text"
                name="last_name"
                id="last-name"
                placeholder={intl.formatMessage({
                  defaultMessage: 'Insert your last name',
                  id: 'GYkIYE',
                })}
                aria-describedby="last-name-error"
                register={register}
              />
            </label>
            <ErrorMessage id="last-name-error" errorText={errors.last_name?.message} />
          </div>
        </div>
        {!invitedUser && (
          <div className="w-full">
            <label htmlFor="email">
              <p className="mb-2.5 mt-4.5 font-sans text-sm font-semibold text-gray-800">
                <FormattedMessage defaultMessage="Email" id="sy+pv5" />
              </p>
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
              />
            </label>
            <ErrorMessage id="email-error" errorText={errors.email?.message} />
          </div>
        )}
        <div className="md:gap-4 md:flex">
          <div className="w-full">
            <label htmlFor="password">
              <p className="mb-2.5 mt-4.5 font-sans text-sm font-semibold text-gray-800">
                <FormattedMessage defaultMessage="Password" id="5sg7KC" />
              </p>
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
            </label>
            <p
              className="mt-1 font-sans text-xs text-gray-400 font-regular"
              id="password-description"
            >
              <FormattedMessage
                defaultMessage="Use at least 12 characters, one uppercase letter, one lowercase letter and one number."
                id="MF4b8Z"
              />
            </p>
            <ErrorMessage id="password-error" errorText={errors.password?.message} />
          </div>
          <div className="w-full">
            <label htmlFor="confirm-password">
              <p className="mb-2.5 mt-4.5 font-sans text-sm font-semibold text-gray-800">
                <FormattedMessage defaultMessage="Confirm password" id="8HimVK" />
              </p>
              <Input
                type="password"
                id="confirm-password"
                name="confirm_password"
                placeholder={intl.formatMessage({
                  defaultMessage: 'Insert password',
                  id: 'HnG9/3',
                })}
                aria-describedby="confirm-password-error"
                register={register}
              />
            </label>
            <ErrorMessage
              id="confirm-password-error"
              errorText={errors.confirm_password?.message}
            />
          </div>
        </div>
        <div className="w-full mt-8">
          <label htmlFor="accept-terms">
            <Checkbox
              name="accept_terms"
              id="accept-terms"
              aria-describedby="accept-terms-error"
              register={register}
            />
            <span className="ml-2 font-sans text-sm text-gray-800 font-regular">
              <FormattedMessage
                defaultMessage="I agree with the Terms and Privacy Policy."
                id="X0E3iC"
              />
            </span>
          </label>
          <ErrorMessage id="accept-terms-error" errorText={errors.accept_terms?.message} />
        </div>
        <div className="flex justify-center mt-14">
          <button
            className="flex px-5 py-2 font-sans text-sm text-white opacity-75 font-regular rounded-5xl leadign-6 bg-green-dark"
            type="submit"
            disabled={signUp.isLoading}
          >
            <Loading visible={signUp.isLoading} className="mr-2.5" />
            <FormattedMessage defaultMessage="Sign up" id="8HJxXG" />
          </button>
        </div>
      </form>
    </div>
  );
};

SignUp.layout = {
  Component: AuthPageLayout,
  props: {
    headerProps: {
      pageType: 'sign-up',
    },
    asideProps: {
      photo: 'side-02',
    },
  },
};

export default SignUp;
