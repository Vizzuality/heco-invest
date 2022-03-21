import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { InferGetStaticPropsType } from 'next';
import validate from 'validate.js';

import { loadI18nMessages } from 'helpers/i18n';

import Input from 'components/forms/input';
import Icon from 'components/icon';
import Loading from 'components/loading';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';
import { SignupDto, SignupFormI } from 'types/signup';

import { useSignup } from 'services/users/userService';

import WARNING_SGV from '../svgs/notifications/warning-outlined.svg';

export async function getStaticProps(ctx) {
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
    },
  };
}

type AboutPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const SignUp: PageComponent<AboutPageProps, StaticPageLayoutProps> = () => {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
    setFocus,
  } = useForm<SignupFormI>();

  const intl = useIntl();
  const { mutateAsync, isSuccess, error, isLoading } = useSignup();

  const onSubmit: SubmitHandler<SignupFormI> = async (values) => {
    const { firstName, lastName, email, password } = values;
    const newUser: SignupDto = {
      firstName,
      lastName,
      email,
      password,
      locale: 'ES',
    };
    await mutateAsync(newUser);
    if (isSuccess) {
      reset();
      console.log('sucess');
    }
  };

  const onError: SubmitErrorHandler<SignupFormI> = (error) => {
    console.log('error', error);
    const firstError = Object.keys(error)[0] as keyof SignupFormI;
    setFocus(firstError);
  };

  return (
    <div className="w-full">
      <h1 className="mb-2.5 font-serif text-4xl font-semibold text-green-dark">
        <FormattedMessage defaultMessage="Sign up" id="8HJxXG" />
      </h1>
      <p className="mb-1.5 font-sans text-base text-gray-600">
        <FormattedMessage defaultMessage="Please enter your details below." id="rfVDxL" />
      </p>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {error && (
          <div className="flex mt-6 p-4.5 rounded-lg bg-background-error" role="alert">
            <Icon icon={WARNING_SGV} className="w-5 h-5 text-red" />
            <p className="ml-2 font-sans text-sm leading-normal text-black">Server error message</p>
          </div>
        )}
        <div className="flex gap-4">
          <div className="w-full">
            <label htmlFor="first-name">
              <p className="mb-2.5 mt-4.5 font-sans text-sm font-semibold text-gray-800">
                <FormattedMessage defaultMessage="First name" id="pONqz8" />
              </p>
              <Input
                type="text"
                name="firstName"
                id="first-name"
                placeholder="Insert your name"
                aria-describedby="first-name-error"
                register={register}
                registerOptions={{
                  required: intl.formatMessage({
                    defaultMessage: 'You need to enter a name.',
                    id: 'Pl5xI4',
                  }),
                }}
              />
            </label>
            {errors.firstName && (
              <p
                id="first-name-error"
                className="mt-1 ml-2 font-sans text-xs text-red font-regular"
              >
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="last-name">
              <p className="mb-2.5 mt-4.5 font-sans text-sm font-semibold text-gray-800">
                <FormattedMessage defaultMessage="Last name" id="txUL0F" />
              </p>
              <Input
                type="text"
                name="lastName"
                id="last-name"
                placeholder="Insert your last name"
                aria-describedby="last-name-error"
                register={register}
                registerOptions={{
                  required: intl.formatMessage({
                    defaultMessage: 'You need to enter a last name.',
                    id: 'zPMPr9',
                  }),
                }}
              />
            </label>
            {errors.lastName && (
              <p id="last-name-error" className="mt-1 ml-2 font-sans text-xs text-red font-regular">
                {errors.lastName.message}
              </p>
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
              placeholder="Insert your email"
              aria-describedby="email-error"
              register={register}
              registerOptions={{
                required: intl.formatMessage({
                  defaultMessage: 'You need to enter your email',
                  id: 'NioTuC',
                }),
                validate: (value) =>
                  validate(
                    { from: value },
                    {
                      from: {
                        email: true,
                      },
                    }
                  ),
              }}
            />
          </label>
          {errors.email && (
            <p id="email-error" className="mt-1 ml-2 font-sans text-xs text-red font-regular">
              {errors.email.message || (
                <FormattedMessage defaultMessage="Invalid email format" id="nc1IrM" />
              )}
            </p>
          )}
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <label htmlFor="password">
              <p className="mb-2.5 mt-4.5 font-sans text-sm font-semibold text-gray-800">
                <FormattedMessage defaultMessage="Password" id="5sg7KC" />
              </p>
              <Input
                type="password"
                placeholder="insert password"
                name="password"
                id="password"
                aria-describedby="password-description password-error"
                register={register}
                registerOptions={{
                  required: intl.formatMessage({
                    defaultMessage: 'You need to enter a password.',
                    id: 'zeCjLr',
                  }),
                  minLength: {
                    value: 8,
                    message: intl.formatMessage({
                      defaultMessage: 'The password must have at least 8 characters.',
                      id: 'TiXJ+4',
                    }),
                  },
                }}
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
          <div className="w-full">
            <label htmlFor="confirm-password">
              <p className="mb-2.5 mt-4.5 font-sans text-sm font-semibold text-gray-800">
                <FormattedMessage defaultMessage="Confirm password" id="8HimVK" />
              </p>
              <Input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                placeholder="insert password"
                aria-describedby="confirm-password-error"
                register={register}
                registerOptions={{
                  required: intl.formatMessage({
                    defaultMessage: 'You need to confirm the password',
                    id: 'pPBoUU',
                  }),
                  validate: (value) => value === getValues('password'),
                }}
              />
            </label>
            {errors.confirmPassword && (
              <p
                id="confirm-password-error"
                className="mt-1 ml-2 font-sans text-xs text-red font-regular"
              >
                {errors.confirmPassword.message || (
                  <FormattedMessage defaultMessage="The passwords don't match" id="eo4bnL" />
                )}
              </p>
            )}
          </div>
        </div>
        <div className="w-full mt-8">
          <label htmlFor="accept-terms">
            <Input
              name="acceptTerms"
              id="accept-terms"
              aria-describedby="accept-terms-error"
              type="checkbox"
              register={register}
              registerOptions={{
                required: intl.formatMessage({
                  defaultMessage: 'You need to accept the Terms and Privacy Policy.',
                  id: 'tkP6dd',
                }),
              }}
            />
            <span className="ml-2 font-sans text-sm text-gray-800 font-regular">
              <FormattedMessage
                defaultMessage="I agree with the Terms and Privacy Policy."
                id="X0E3iC"
              />
            </span>
          </label>
          {errors.acceptTerms && (
            <p
              id="accept-terms-error"
              className="mt-1 ml-2 font-sans text-xs text-red font-regular"
            >
              {errors.acceptTerms.message}
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            className="flex px-5 py-2 font-sans text-sm text-white opacity-75 font-regular rounded-5xl leadign-6 bg-green-dark"
            type="submit"
            disabled={isLoading}
          >
            <Loading visible={isLoading} className="mr-2.5" />
            <FormattedMessage defaultMessage="Sign up" id="8HJxXG" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
