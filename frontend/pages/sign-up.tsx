import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Icon from 'components/icon';
import Loading from 'components/loading';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';
import { SignupDto, SignupFormI } from 'types/signup';

import { useSignup } from 'services/users/userService';

import { validateEmail } from '../components/forms/rhf-validations';
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
        {!error && (
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
              <input
                className={cx('w-full', { 'border-red': errors.firstName })}
                type="text"
                name="first-name"
                placeholder="Insert your name"
                aria-describedby="first-name-error"
                {...register('firstName', { required: 'Please insert your first name' })}
              />
            </label>
            {errors.firstName && (
              <p
                id="first-name-error"
                className="mt-1 ml-2 font-sans text-xs text-red font-regular"
              >
                <FormattedMessage defaultMessage="You need to enter a name." id="Pl5xI4" />
              </p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="last-name">
              <p className="mb-2.5 mt-4.5 font-sans text-sm font-semibold text-gray-800">
                <FormattedMessage defaultMessage="Last name" id="txUL0F" />
              </p>
              <input
                className={cx('w-full', { 'border-red': errors.lastName })}
                type="text"
                name="last-name"
                placeholder="Insert your last name"
                aria-describedby="last-name-error"
                {...register('lastName', { required: true })}
              />
            </label>
            {errors.lastName && (
              <p id="last-name-error" className="mt-1 ml-2 font-sans text-xs text-red font-regular">
                <FormattedMessage defaultMessage="You need to enter a last name." id="zPMPr9" />
              </p>
            )}
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="email">
            <p className="mb-2.5 mt-4.5 font-sans text-sm font-semibold text-gray-800">
              <FormattedMessage defaultMessage="Email" id="sy+pv5" />
            </p>
            <input
              className={cx('w-full', { 'border-red': errors.email })}
              type="email"
              name="email"
              placeholder="Insert your email"
              aria-describedby="email-error"
              {...register('email', {
                required: {
                  value: true,
                  message: 'Please insert your email',
                },
                validate: (value) => value && validateEmail(value),
              })}
            />
          </label>
          {errors.email && (
            <p id="email-error" className="mt-1 ml-2 font-sans text-xs text-red font-regular">
              {errors.email.type === 'validate' ? (
                <FormattedMessage defaultMessage="Invalid email" id="ByuOj8" />
              ) : (
                <FormattedMessage defaultMessage="You need to enter your email" id="NioTuC" />
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
              <input
                className={cx('w-full', { 'border-red': errors.password })}
                type="password"
                placeholder="insert password"
                name="password"
                aria-describedby="password-description password-error"
                {...register('password', {
                  required: true,
                  minLength: 8,
                })}
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
                {errors.password.type === 'minLenth' ? (
                  <FormattedMessage
                    defaultMessage="The passwor must be at least 8 characters."
                    id="PnUTcF"
                  />
                ) : (
                  <FormattedMessage defaultMessage="You need to enter a password." id="zeCjLr" />
                )}
              </p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="confirm-password">
              <p className="mb-2.5 mt-4.5 font-sans text-sm font-semibold text-gray-800">
                <FormattedMessage defaultMessage="Confirm password" id="8HimVK" />
              </p>
              <input
                type="password"
                className={cx('w-full', { 'border-red': errors.confirmPassword })}
                name="confirm-password"
                placeholder="insert password"
                aria-describedby="confirm-password-error"
                {...register('confirmPassword', {
                  required: true,
                  validate: (value) => value === getValues('password'),
                })}
              />
            </label>
            {errors.confirmPassword && (
              <p
                id="confirm-password-error"
                className="mt-1 ml-2 font-sans text-xs text-red font-regular"
              >
                {errors.confirmPassword.type === 'validate' ? (
                  <FormattedMessage defaultMessage="The passwords don't match" id="eo4bnL" />
                ) : (
                  <FormattedMessage defaultMessage="You need to confirm the password" id="pPBoUU" />
                )}
              </p>
            )}
          </div>
        </div>
        <div className="w-full mt-8">
          <label htmlFor="acceptTerms">
            <input
              className={cx({ 'border-red': errors.acceptTerms })}
              aria-describedby="accept-terms-error"
              type="checkbox"
              {...register('acceptTerms', { required: true })}
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
              <FormattedMessage
                defaultMessage="You need to accept the Terms and Privacy Policy."
                id="tkP6dd"
              />
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
