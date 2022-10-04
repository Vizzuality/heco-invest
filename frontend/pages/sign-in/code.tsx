import { ChangeEvent, ClipboardEvent, useCallback, useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { useAppSelector } from 'store/hooks';
import { session } from 'store/session';

import { InferGetStaticPropsType } from 'next';

import useMe from 'hooks/me';

import { loadI18nMessages } from 'helpers/i18n';

import Alert from 'components/alert';
import Button from 'components/button';
import ErrorMessage from 'components/forms/error-message';
import Input from 'components/forms/input';
import Loading from 'components/loading';
import { Paths, UserRoles } from 'enums';
import NakedLayout, { NakedLayoutProps } from 'layouts/naked';
import { PageComponent } from 'types';
import { SignIn, SignInCodeForm } from 'types/sign-in';

import { useSignIn } from 'services/authentication/authService';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type ProjectDeveloperProps = InferGetStaticPropsType<typeof getStaticProps>;

const CODE_LENGTH = 5;

const SignInCode: PageComponent<ProjectDeveloperProps, NakedLayoutProps> = () => {
  const { formatMessage } = useIntl();
  const { replace } = useRouter();
  const signIn = useSignIn();
  const { user, isLoading: isUserLoading } = useMe();

  // Email and password got from login page
  const sessionData = useAppSelector(session);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
    setValue,
  } = useForm<SignInCodeForm>({
    shouldUseNativeValidation: true,
    reValidateMode: 'onChange',
  });

  // Redirect if user is signed in
  useEffect(() => {
    // Wait until user and inviteUser are loaded to be able to compare them
    if (!isUserLoading && !!user) {
      if (user?.role === UserRoles.Light) {
        // If the user don't have an account go to the 'choose account type' page
        replace(Paths.AccountType);
      } else {
        // If the user has an account go to the dashboard
        replace(Paths.Dashboard);
      }
    }
  }, [isUserLoading, replace, user]);

  // Create an array of numbers from 0 to the code's length
  const code = Array.from({ length: CODE_LENGTH }, (_, i) => i);

  useEffect(() => {
    // Set focus at the first input box
    setFocus('otp_attempt.0');
  }, [setFocus]);

  const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const currentInputIndex = Number(name.split('.')[1]);
    let nextInput = currentInputIndex + 1;
    if (!value || currentInputIndex === 4) return;
    setFocus(`otp_attempt.${nextInput}`);
  };

  const handleSignIn = useCallback(
    (data: SignIn) => {
      signIn.mutate(data, {
        onSuccess: () => {
          replace(Paths.Dashboard);
        },
      });
    },
    [signIn, replace]
  );

  const handlePasteCode = (ev: ClipboardEvent<HTMLInputElement>) => {
    const text = ev.clipboardData.getData('text');
    text
      .split('')
      .slice(0, CODE_LENGTH)
      .forEach((char, index) => setValue(`otp_attempt.${index}`, char));
  };

  const onSubmit: SubmitHandler<SignInCodeForm> = (code) => {
    const otp_attempt = Object.values(code.otp_attempt).join('');
    handleSignIn({ ...sessionData, otp_attempt });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen max-w-xl m-auto">
      <div>
        <div className="mb-6 text-center">
          <p className="mb-6 font-semibold">HeCo invest</p>
          <h1 className="font-serif text-3xl font-semibold text-green-dark">
            <FormattedMessage defaultMessage="Insert your code" id="Nn0ig7" />
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="w-full max-w-md text-center">
            <fieldset>
              <legend className="mb-6 text-gray-800">
                <FormattedMessage
                  defaultMessage="To help keep your account secure, we sent a security code to your email. "
                  id="/vHsVH"
                />
              </legend>
              <div className="flex justify-center gap-2.5">
                {code.map((digit) => (
                  <Input
                    key={digit}
                    type="text"
                    name={`otp_attempt.${digit}`}
                    registerOptions={{
                      onChange: handleChangeCode,
                      maxLength: 1,
                      required: true,
                    }}
                    aria-describedby="code-error"
                    register={register}
                    className="text-center"
                    onPaste={handlePasteCode}
                  />
                ))}
              </div>
            </fieldset>
            <ErrorMessage
              id="code-error"
              errorText={
                !!Object(errors)?.length &&
                formatMessage({
                  defaultMessage: 'You need to enter the security code.',
                  id: 'f1XmxW',
                })
              }
            />
          </div>

          {signIn.error?.message && (
            <Alert type="warning" className="my-4.5" withLayoutContainer>
              {Array.isArray(signIn.error?.message)
                ? signIn.error.message[0].title
                : signIn.error.message}
            </Alert>
          )}

          <div className="flex justify-center mt-10">
            <Button type="submit" disabled={signIn.isLoading}>
              <Loading visible={signIn.isLoading} className="mr-2.5" />
              <FormattedMessage defaultMessage="Confirm" id="N2IrpM" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

SignInCode.layout = {
  Component: NakedLayout,
  props: {},
};

export default SignInCode;
