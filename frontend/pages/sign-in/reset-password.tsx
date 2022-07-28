import { useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetServerSidePropsType } from 'next';

import useMe from 'hooks/me';

import { loadI18nMessages } from 'helpers/i18n';

import Alert from 'components/alert';
import Button from 'components/button';
import ErrorMessage from 'components/forms/error-message';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import Loading from 'components/loading';
import { Paths, Queries } from 'enums';
import AuthPageLayout, { AuthPageLayoutProps } from 'layouts/auth-page';
import { PageComponent } from 'types';
import { ResetPassword } from 'types/sign-in';
import { useResetPasswordResolver } from 'validations/sign-in';

import { useResetPassword } from 'services/reset-password/reset-password-service';

export const getServerSideProps = withLocalizedRequests(async ({ locale, query }: any) => {
  if (!query.reset_password_token) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type ResetPasswordPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const ResetPasswordPage: PageComponent<ResetPasswordPageProps, AuthPageLayoutProps> = () => {
  const { query, push } = useRouter();
  const intl = useIntl();
  const resetPassword = useResetPassword();
  const { user } = useMe();
  const queryClient = useQueryClient();
  const resolver = useResetPasswordResolver();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPassword>({
    resolver,
    shouldUseNativeValidation: true,
    defaultValues: { reset_password_token: query.reset_password_token as string },
  });

  const onSubmit: SubmitHandler<ResetPassword> = (values) => {
    resetPassword.mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries(Queries.User);
      },
    });
  };

  useEffect(() => {
    if (user) {
      push(Paths.Dashboard);
    }
  }, [user, push]);

  return (
    <div className="flex flex-col justify-center w-full h-full max-w-xl m-auto">
      <h1 className="mb-2.5 font-serif text-4xl font-semibold text-green-dark">
        <FormattedMessage defaultMessage="Reset password" id="Yy/yDL" />
      </h1>
      <p className="mb-6.5 font-sans text-base text-gray-600">
        <FormattedMessage defaultMessage="Please insert your new password." id="EGMX38" />
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
            <FormattedMessage defaultMessage="New password" id="fTHhSB" />
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder={intl.formatMessage({
              defaultMessage: 'insert new passowrd',
              id: 'n4Y/RH',
            })}
            aria-describedby="email-error"
            register={register}
            className="mt-2.5 mb-2"
          />
          <ErrorMessage id="email-error" errorText={errors.password?.message} />
        </div>
        <div className="w-full mt-4.5">
          <Label htmlFor="password_confirmation">
            <FormattedMessage defaultMessage="Confirm password" id="8HimVK" />
          </Label>
          <Input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            placeholder={intl.formatMessage({
              defaultMessage: 'confirm password',
              id: 'GhrkT+',
            })}
            aria-describedby="email-error"
            register={register}
            className="mt-2.5 mb-2"
          />
          <ErrorMessage id="email-error" errorText={errors.password_confirmation?.message} />
        </div>

        <div className="flex flex-col items-center justify-center mt-15">
          <Button type="submit" disabled={resetPassword.isLoading}>
            <Loading visible={resetPassword.isLoading} className="mr-2.5" />
            <FormattedMessage defaultMessage="Reset password" id="Yy/yDL" />
          </Button>
          <Link href={Paths.SignIn} passHref>
            <a className="mt-5 text-sm text-green-dark">
              <FormattedMessage defaultMessage="Back to Sign in" id="D7hbFB" />
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
};

ResetPasswordPage.layout = {
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

export default ResetPasswordPage;
