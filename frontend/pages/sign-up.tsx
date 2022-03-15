import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';
import { SignupDto, SignupFormI } from 'types/signup';

import { useSignup } from 'services/users/userService';

import { validateEmail } from '../components/forms/rhf-validations';

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
    console.log(isSuccess, isLoading);
    if (isSuccess) {
      reset();
      console.log('sucess');
    }
  };

  const onError: SubmitErrorHandler<SignupFormI> = (error) => {
    console.log(error);
    const firstError = Object.keys(error)[0] as keyof SignupFormI;
    setFocus(firstError);
  };

  console.log(error);

  return (
    <div className="w-full">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {!!error && (
          <div>
            <p>Form Global Error</p>
          </div>
        )}
        <div className="flex gap-4">
          <div className="w-full">
            <input
              className="w-full"
              type="text"
              name="first-name"
              placeholder="Insert your name"
              aria-describedby="first-name-error"
              {...register('firstName', { required: 'Please insert your first name' })}
            />
            {errors.firstName && <p id="first-name-error">You need to enter a name.</p>}
          </div>
          <div className="w-full">
            <input
              className="w-full"
              type="text"
              name="last-name"
              placeholder="Insert your last name"
              aria-describedby="last-name-error"
              {...register('lastName', { required: true })}
            />
            {errors.lastName && <p id="last-name-error">You need to enter a last name.</p>}
          </div>
        </div>
        <div className="w-full">
          <input
            className="w-full"
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
          {errors.email && (
            <p id="email-error">
              {errors.email.type === 'validate' ? 'Invalid email' : errors.email.message}
            </p>
          )}
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <input
              className="w-full"
              type="password"
              placeholder="insert password"
              name="password"
              aria-describedby="password-description password-error"
              {...register('password', {
                required: true,
                minLength: 8,
              })}
            />
            <p id="password-description">Use at least 8 characters.</p>
            {errors.password && <p id="password-error">You need to enter a first name.</p>}
          </div>
          <div className="w-full">
            <input
              type="password"
              className="w-full"
              name="confirm-password"
              placeholder="insert password"
              aria-describedby="confirm-password-error"
              {...register('confirmPassword', {
                required: 'You need to confirm the password',
                validate: (value) => value === getValues('password'),
              })}
            />
            {errors.confirmPassword && (
              <p id="confirm-password-error">
                {errors.confirmPassword.type === 'validate'
                  ? "The passwords don't match"
                  : errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="acceptTerms">
            <input
              aria-describedby="accept-terms-error"
              type="checkbox"
              {...register('acceptTerms', { required: true })}
            />
            I agree with the Terms and Privacy Policy.
          </label>
          {errors.acceptTerms && (
            <p id="accept-terms-error">You need to accepts the Terms and Privacy Policy.</p>
          )}
        </div>
        <div className="flex justify-center">
          <button type="submit">{isLoading ? 'loading' : 'Sign up'}</button>
        </div>
      </form>
    </div>
  );
};

SignUp.layout = {
  props: {
    footerProps: {
      className: 'mt-24 lg:mt-32',
    },
  },
};

export default SignUp;
