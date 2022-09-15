import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';
import { useQueryReturnPath } from 'helpers/pages';

import OpenCallForm from 'containers/open-call-form';

import { Paths, UserRoles } from 'enums';
import FormPageLayout, { FormPageLayoutProps } from 'layouts/form-page';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';
import { GroupedEnums } from 'types/enums';
import { Investor } from 'types/investor';
import { User } from 'types/user';

import { getEnums } from 'services/enums/enumService';
import { getOpenCall, useOpenCall, useUpdateOpenCall } from 'services/open-call/open-call-service';

const OPEN_CALL_QUERY_PARAMS = {
  includes: ['country', 'municipality', 'department', 'investor'],
  // We set the `locale` as `null` so that we get the open call in the account's language instead of
  // the UI language
  locale: null,
};

export const getServerSideProps = withLocalizedRequests(async ({ params: { id }, locale }) => {
  let openCall;
  let enums;

  try {
    openCall = await getOpenCall(id as string, OPEN_CALL_QUERY_PARAMS);
    enums = await getEnums();
  } catch (e) {
    // The user may be attempting to preview a drafted open call, which the endpoint won't return
    // unless the ownership can be verified. We'll be loading it client side and redirect the user
    // to the dashboard if the open call really doesn't exist or the user doesn't have permissions
    openCall = null;
  }

  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      openCall,
      enums: groupBy(enums, 'type'),
    },
  };
});

type EditOpenCallProps = ReturnType<typeof getServerSideProps> extends Promise<{ props: infer T }>
  ? T
  : never;

const EditOpenCall: PageComponent<EditOpenCallProps, FormPageLayoutProps> = ({
  openCall: initialOpenCall,
  enums,
}) => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const queryReturnPath = useQueryReturnPath();

  const { data: openCall, isFetching: isFetchingProject } = useOpenCall(
    router.query.id as string,
    OPEN_CALL_QUERY_PARAMS,
    initialOpenCall
  );

  const updateOpenCall = useUpdateOpenCall({ locale: openCall?.language });

  const getIsOwner = (_user: User, userAccount: Investor) => {
    // The user must be a the creator of the open call to be allowed to edit it.
    if (openCall?.investor?.id && userAccount?.id) {
      return openCall.investor.id === userAccount.id;
    }
  };

  const handleOnComplete = () => {
    router.push(queryReturnPath || Paths.DashboardOpenCalls);
  };

  return (
    <ProtectedPage
      ownership={{
        allowOwner: true,
        getIsOwner,
      }}
      permissions={[UserRoles.Investor]}
    >
      <OpenCallForm
        title={formatMessage({ defaultMessage: 'Edit Open Call', id: 'kHpaMt' })}
        leaveMessage={formatMessage({
          defaultMessage: 'Leave open call edition form',
          id: 'sVpJRp',
        })}
        mutation={updateOpenCall}
        onComplete={handleOnComplete}
        initialValues={openCall}
        isLoading={!openCall && isFetchingProject}
        enums={enums as GroupedEnums}
      />
    </ProtectedPage>
  );
};

EditOpenCall.layout = {
  Component: FormPageLayout,
};

export default EditOpenCall;
