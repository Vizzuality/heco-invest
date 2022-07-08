import { useCallback } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Alert from 'components/alert';
import Button from 'components/button';
import ErrorMessage from 'components/forms/error-message';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import Loading from 'components/loading';
import AuthPageLayout, { AuthPageLayoutProps } from 'layouts/auth-page';
import { PageComponent } from 'types';
import { ResetPassword } from 'types/sign-in';
import { useForgotPasswordResolver } from 'validations/sign-in';

import { useResetPassword } from 'services/users/userService';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type ForgotPasswordPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ForgotPassword: PageComponent<ForgotPasswordPageProps, AuthPageLayoutProps> = () => {
  const intl = useIntl();
  const resetPassword = useResetPassword();
  const resolver = useForgotPasswordResolver();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ResetPassword>({ resolver, shouldUseNativeValidation: true });
  const { push } = useRouter();

  const handleResetPassword = useCallback(
    (data: ResetPassword) =>
      resetPassword.mutate(data, {
        onSuccess: () => {
          push('/sign-in');
        },
      }),
    [resetPassword, push]
  );

  const onSubmit: SubmitHandler<ResetPassword> = handleResetPassword;

  return (
    <div className="flex flex-col justify-center w-full h-full max-w-xl m-auto">
      <h1 className="mb-2.5 font-serif text-4xl font-semibold text-green-dark">
        <FormattedMessage defaultMessage="Forgot your password?" id="cyRU1N" />
      </h1>
      <p className="mb-6.5 font-sans text-base text-gray-600">
        <FormattedMessage
          defaultMessage="We’ll help you reset it and get back on track."
          id="P+9ug1"
        />
      </p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {resetPassword.isError && (
          <Alert type="warning" className="mb-4.5" withLayoutContainer>
            {Array.isArray(resetPassword.error.message)
              ? resetPassword.error.message[0].title
              : resetPassword.error.message}
          </Alert>
        )}
        <div className="w-full">
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
              className="mt-2.5 mb-4.5"
            />
          </Label>
          <ErrorMessage id="email-error" errorText={errors.email?.message} />
        </div>

        <div className="flex justify-center mt-15">
          <Button type="submit" disabled={resetPassword.isLoading}>
            <Loading visible={resetPassword.isLoading} className="mr-2.5" />
            <FormattedMessage defaultMessage="Send email" id="sZIoMy" />
          </Button>
        </div>
      </form>
    </div>
  );
};

ForgotPassword.layout = {
  Component: AuthPageLayout,
  props: {
    headerProps: {
      pageType: 'forgot-password',
    },
    asideProps: {
      photo: 'side-02',
    },
  },
};

export default ForgotPassword;
