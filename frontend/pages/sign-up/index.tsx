import { useCallback } from 'react';

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Alert from 'components/alert';
import Checkbox from 'components/forms/checkbox';
import FieldError from 'components/forms/field-error';
import Input from 'components/forms/input';
import Loading from 'components/loading';
import AuthPageLayout, { AuthPageLayoutProps } from 'layouts/auth-page';
import { PageComponent } from 'types';
import { SignupDto, SignupFormI } from 'types/signup';
import { useSignupResolver } from 'validations/signup';

import { useSignup } from 'services/users/userService';

export async function getStaticProps(ctx) {
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
    },
  };
}

type AboutPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const SignUp: PageComponent<AboutPageProps, AuthPageLayoutProps> = () => {
  const { locale } = useRouter();
  const intl = useIntl();
  const signUp = useSignup();
  const resolver = useSignupResolver();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupFormI>({ resolver, shouldUseNativeValidation: true });

  const handleSignUp = useCallback((data: SignupDto) => signUp.mutate(data), [signUp]);

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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {signUp.isError && (
          <Alert withLayoutContainer className="mt-6">
            {
              signUp.error.message
              // || (
              //   <ul>
              //     {signUp.error.map(() => (
              //       <li>{<FormattedMessage
              //         defaultMessage="Something went wrong while submitting your form."
              //         id="ylNQY0"
              //       />}</li>
              //     ))}
              //   </ul>

              // )
            }
          </Alert>
        )}
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
            {errors.first_name && (
              <FieldError id="first-name-error">{errors.first_name.message}</FieldError>
            )}
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
            {errors.last_name && (
              <FieldError id="last-name-error">{errors.last_name.message}</FieldError>
            )}
          </div>
        </div>
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
          {errors.email && <FieldError id="email-error">{errors.email.message}</FieldError>}
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
              <FieldError id="password-error">{errors.password.message}</FieldError>
            )}
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
            {errors.confirm_password && (
              <FieldError id="confirm-password-error">{errors.confirm_password.message}</FieldError>
            )}
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
          {errors.accept_terms && (
            <FieldError id="accept-terms-error">{errors.accept_terms.message}</FieldError>
          )}
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
