import { useCallback } from 'react';

import { AlertTriangle } from 'react-feather';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Input from 'components/forms/input';
import Loading from 'components/loading';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';
import { SignInDto, SignInFormI } from 'types/sign-in';
import { useSignInResolver } from 'validations/sign-in';

import { useSignIn } from 'services/authentication/authService';

export async function getStaticProps(ctx) {
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
    },
  };
}

type SignInPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const SignIn: PageComponent<SignInPageProps, StaticPageLayoutProps> = () => {
  const intl = useIntl();
  const signIn = useSignIn();
  const resolver = useSignInResolver();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormI>({ resolver, shouldUseNativeValidation: true });

  const handleSignIn = useCallback((data: SignInDto) => signIn.mutate(data), [signIn]);

  const onSubmit: SubmitHandler<SignInFormI> = handleSignIn;

  return (
    <div className="w-full h-screen max-w-xl px-4 m-auto">
      <h1 className="mb-2.5 font-serif text-4xl font-semibold text-green-dark">
        <FormattedMessage defaultMessage="Sign in" id="SQJto2" />
      </h1>
      <p className="mb-1.5 font-sans text-base text-gray-600">
        <FormattedMessage defaultMessage="Please enter your details below." id="rfVDxL" />
      </p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {signIn.isError && (
          <div className="flex mt-6 p-4.5 rounded-lg bg-red/10" role="alert">
            <AlertTriangle className="w-5 h-5 text-red" aria-hidden="true" />
            <p className="ml-2 font-sans text-sm leading-normal text-black">
              {signIn.error.message || (
                <FormattedMessage
                  defaultMessage="Something went wrong while submitting your form."
                  id="ylNQY0"
                />
              )}
            </p>
          </div>
        )}
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
          {errors.email && (
            <p id="email-error" className="mt-1 ml-2 font-sans text-xs text-red font-regular">
              {errors.email.message}
            </p>
          )}
        </div>
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
              <FormattedMessage defaultMessage="Use at least 8 characters." id="BvrO01" />
            </p>
            {errors.password && (
              <p id="password-error" className="mt-1 ml-2 font-sans text-xs text-red font-regular">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-14">
          <button
            className="flex px-5 py-2 font-sans text-sm text-white opacity-75 font-regular rounded-5xl leadign-6 bg-green-dark"
            type="submit"
            disabled={signIn.isLoading}
          >
            <Loading visible={signIn.isLoading} className="mr-2.5" />
            <FormattedMessage defaultMessage="Sign in" id="SQJto2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
