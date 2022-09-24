import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';

// import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { isEmpty } from 'lodash-es';
import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';
import { getServiceErrors } from 'helpers/pages';

import Alert from 'components/alert';
import Button from 'components/button';
import ConfirmationPrompt from 'components/confirmation-prompt';
import ErrorMessage from 'components/forms/error-message';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { Paths, UserRoles } from 'enums';
// import AccountPicture from 'layouts/dashboard/account-picture';
import NakedLayout from 'layouts/naked';
import ProtectedPage from 'layouts/protected-page';
import SettingsLayout, { SettingsLayoutProps } from 'layouts/settings';
import { PageComponent } from 'types';
import { UpdateUserDto } from 'types/user';

import { useAccount, useDeleteUser } from 'services/account';
import { useUpdateUser } from 'services/users/userService';

// const ImageUploader = dynamic(() => import('components/forms/image-uploader'), { ssr: false });

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type InformationPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Information: PageComponent<InformationPageProps, SettingsLayoutProps> = () => {
  const { formatMessage } = useIntl();
  const { push } = useRouter();
  const { user, userAccount } = useAccount();
  const queryClient = useQueryClient();

  const updateUser = useUpdateUser();
  const [showConfirmUpdate, setShowConfirmUpdate] = useState(false);

  const deleteUser = useDeleteUser();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const { control, clearErrors, setError, setValue, register, reset, handleSubmit, formState } =
    useForm<UpdateUserDto>({
      shouldUseNativeValidation: true,
      shouldFocusError: true,
      reValidateMode: 'onChange',
    });

  useEffect(() => {
    setValue('first_name', user?.first_name);
    setValue('last_name', user?.last_name);
  }, [user?.first_name, user?.last_name, setValue]);

  const handleClickUpdate = (e) => {
    e.preventDefault();
    if (isEmpty(formState.errors)) {
      setShowConfirmUpdate(true);
    }
  };

  const handleDismissConfirmUpdate = () => {
    reset();
    setShowConfirmUpdate(false);
  };

  const onSubmit = (data: UpdateUserDto) => {
    updateUser.mutate(data, {
      onError: (error) => {
        const { fieldErrors } = getServiceErrors<UpdateUserDto>(error, [
          ['first_name', 'last_name'],
        ]);
        fieldErrors?.forEach(({ fieldName, message }, index) => {
          [
            setError(
              fieldName,
              { message },
              {
                shouldFocus: index === 0,
              }
            ),
          ];
        });
      },
      onSettled: () => {
        setShowConfirmUpdate(false);
      },
    });
  };

  const handleDeleteUser = () => {
    if (user && !user.owner) {
      deleteUser.mutate(user.id, {
        onSuccess: async () => {
          queryClient.removeQueries();
          push(Paths.Home);
        },
      });
    }
  };

  return (
    <ProtectedPage permissions={[UserRoles.ProjectDeveloper, UserRoles.Investor, UserRoles.Light]}>
      <Head title={formatMessage({ defaultMessage: 'Account information', id: 'CzsYIe' })} />
      <SettingsLayout>
        <LayoutContainer
          layout={'narrow'}
          className="flex flex-col gap-4 md:!max-w-2xl xl:!max-w-3xl"
        >
          <div className="p-6 bg-white rounded-lg">
            <form noValidate>
              <div className="flex-grow text-xl font-semibold">
                <FormattedMessage defaultMessage="Update information" id="4iPaIz" />
              </div>
              {/* We don't have the picture on the update user dto, so I will leave it commented for now
              <div className="mt-5">
                <label htmlFor="picture-uploader" className="text-sm font-semibold text-gray-800">
                  <FormattedMessage defaultMessage="Your avatar" id="JhuBos" />
                </label>
                <div className="flex mt-4 gap-x-5">
                  <AccountPicture name={user?.first_name} picture={user?.avatar.medium} />
                  <ImageUploader
                    clearErrors={clearErrors}
                    control={control}
                    id="picture-uploader"
                    name="picture"
                    setError={setError}
                    setValue={setValue}
                    theme="secondary-green"
                  />
                </div>
              </div> */}
              <div className="mt-6">
                <Label
                  htmlFor="first-name"
                  className="block mb-2 text-sm font-semibold text-gray-800"
                >
                  <FormattedMessage defaultMessage="First name" id="pONqz8" />
                </Label>
                <Input
                  name="first_name"
                  id="first-name"
                  register={register}
                  registerOptions={{
                    required: formatMessage({
                      defaultMessage: 'The first name is required',
                      id: 'BfXxmC',
                    }),
                  }}
                  type="text"
                  aria-describedby="first-name-error"
                  aria-required
                />
                <ErrorMessage
                  id="first-name-error"
                  errorText={formState.errors?.first_name?.message}
                />
              </div>
              <div className="mt-6">
                <Label
                  htmlFor="last-name"
                  className="block mb-2 text-sm font-semibold text-gray-800"
                >
                  <FormattedMessage defaultMessage="Last name" id="txUL0F" />
                </Label>
                <Input
                  name="last_name"
                  aria-required
                  id="last-name"
                  register={register}
                  registerOptions={{
                    required: formatMessage({
                      defaultMessage: 'The last name is required',
                      id: 'lewlDm',
                    }),
                  }}
                  type="text"
                  aria-describedby="last-name-error"
                />
                <ErrorMessage
                  id="last-name-error"
                  errorText={formState.errors?.last_name?.message}
                />
              </div>
              <div className="mt-6">
                <Label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-800">
                  <FormattedMessage defaultMessage="Email" id="sy+pv5" />
                </Label>
                <input
                  className="block w-full px-4 py-2 text-base text-gray-900 bg-white border border-solid rounded-lg outline-none border-beige disabled:opacity-60"
                  name="email"
                  disabled
                  id="email"
                  type="text"
                  value={user?.email}
                />
              </div>
              {updateUser.isError && (
                <div className="mt-6">
                  <Alert type="warning" withLayoutContainer>
                    {Array.isArray(updateUser.error.message) &&
                      updateUser.error.message.map((message) => (
                        <span key="message">{message.title}</span>
                      ))}
                  </Alert>
                </div>
              )}
              <div className="flex justify-end mt-12">
                <Button onClick={handleClickUpdate}>
                  <FormattedMessage defaultMessage="Update information" id="4iPaIz" />
                </Button>
              </div>
            </form>
          </div>
          <ConfirmationPrompt
            onAccept={handleSubmit(onSubmit)}
            onRefuse={handleDismissConfirmUpdate}
            onDismiss={() => setShowConfirmUpdate(false)}
            open={showConfirmUpdate}
            title={formatMessage({ defaultMessage: 'Update user information?', id: 'w5UvPh' })}
            onConfirmText={formatMessage({ defaultMessage: 'Confirm', id: 'N2IrpM' })}
            confirmButtonTheme="primary-green"
            onAcceptLoading={updateUser.isLoading}
          />
        </LayoutContainer>
        <LayoutContainer
          layout={'narrow'}
          className="flex flex-col gap-4 mt-6 md:!max-w-2xl xl:!max-w-3xl"
        >
          <div className="p-6 bg-white rounded-lg">
            <div className="">
              <div className="flex-grow text-xl font-semibold text-red-700">
                <FormattedMessage defaultMessage="Delete my user" id="fZpvTQ" />
              </div>
              <div className="p-4 mt-6 rounded-lg bg-red-50">
                <p>
                  <FormattedMessage
                    defaultMessage="By deleting your user, you will be removed from the account <n>accountName</n> and you no longer will have access to HeCo Invest Platform."
                    id="rPwLb7"
                    values={{
                      n: () => <span className="font-semibold">{userAccount?.name}</span>,
                    }}
                  />
                </p>
                <p className="mt-4 font-semibold">
                  <FormattedMessage
                    defaultMessage="If you are the owner of the account, please transfer the ownership before continuing."
                    id="3T3umg"
                  />
                </p>
              </div>
              <div className="flex justify-end mt-6">
                <Button theme="primary-red" onClick={() => setShowConfirmDelete(true)}>
                  <FormattedMessage defaultMessage="Delete" id="K3r6DQ" />
                </Button>
              </div>
            </div>
          </div>
        </LayoutContainer>
        <ConfirmationPrompt
          onAccept={handleDeleteUser}
          onDismiss={() => setShowConfirmDelete(false)}
          onRefuse={() => setShowConfirmDelete(false)}
          open={showConfirmDelete}
          onConfirmDisabled={!user || user.owner}
          title={formatMessage({ defaultMessage: 'Delete my user', id: 'fZpvTQ' })}
          description={
            user?.owner
              ? formatMessage({
                  defaultMessage:
                    'You are currently the account owner. Please transfer the ownership before continuing.',
                  id: 'A775MJ',
                })
              : formatMessage({
                  defaultMessage:
                    "Are you sure you want to delete your user? You can't undo this action and you will lose your access to the platform.",
                  id: 's63oNj',
                })
          }
        />
      </SettingsLayout>
    </ProtectedPage>
  );
};

Information.layout = {
  Component: NakedLayout,
};

export default Information;
