import { useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';

import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Button from 'components/button';
import ConfirmationPrompt from 'components/confirmation-prompt';
import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { Paths, UserRoles } from 'enums';
import NakedLayout from 'layouts/naked';
import ProtectedPage from 'layouts/protected-page';
import SettingsLayout, { SettingsLayoutProps } from 'layouts/settings';
import { PageComponent } from 'types';

import { useAccount, useDeleteUser } from 'services/account';

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
  const deleteUser = useDeleteUser();
  const [showConfirmation, setShowConfirmation] = useState(false);

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
        <LayoutContainer layout={'narrow'} className="flex flex-col gap-4">
          <div className="p-6 bg-white rounded-lg">
            <div className="flex text-sm">
              <div className="flex-grow font-semibold">
                <FormattedMessage defaultMessage="Update information" id="4iPaIz" />
              </div>
            </div>
          </div>
        </LayoutContainer>
        <LayoutContainer layout={'narrow'} className="flex flex-col gap-4 mt-6">
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
                <Button theme="primary-red" onClick={() => setShowConfirmation(true)}>
                  <FormattedMessage defaultMessage="Delete" id="K3r6DQ" />
                </Button>
              </div>
            </div>
          </div>
        </LayoutContainer>
        <ConfirmationPrompt
          onAccept={handleDeleteUser}
          onDismiss={() => setShowConfirmation(false)}
          onRefuse={() => setShowConfirmation(false)}
          open={showConfirmation}
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
