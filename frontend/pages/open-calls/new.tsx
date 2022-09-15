import { useState } from 'react';

import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { groupBy } from 'lodash-es';
import { InferGetServerSidePropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';
import { useQueryReturnPath } from 'helpers/pages';

import OpenCallForm from 'containers/open-call-form';

import { Languages, Paths, UserRoles } from 'enums';
import FormPageLayout from 'layouts/form-page';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';
import { GroupedEnums } from 'types/enums';
import { Investor } from 'types/investor';
import { ProjectDeveloper } from 'types/projectDeveloper';
import { User } from 'types/user';

import { getEnums } from 'services/enums/enumService';
import { useCreateOpenCall } from 'services/open-call/open-call-service';

export const getServerSideProps = withLocalizedRequests(async ({ locale }) => {
  const enums = await getEnums();
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      enums: groupBy(enums, 'type'),
    },
  };
});

const CreateOpenCallPage: PageComponent<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  enums,
}) => {
  const { formatMessage } = useIntl();
  const { push } = useRouter();
  const [language, setLanguage] = useState<Languages>();
  const queryReturnPath = useQueryReturnPath();

  const handleComplete = () => {
    push(queryReturnPath || Paths.DashboardOpenCalls);
  };

  const createOpenCall = useCreateOpenCall({ locale: language });

  const getIsOwner = (_user: User, userAccount: Investor | ProjectDeveloper) => {
    setLanguage(userAccount?.language);
    return true;
  };

  return (
    <ProtectedPage permissions={[UserRoles.Investor]} ownership={{ getIsOwner, allowOwner: false }}>
      <OpenCallForm
        onComplete={handleComplete}
        title={formatMessage({ defaultMessage: 'Create Open Call', id: '7xC2j0' })}
        mutation={createOpenCall}
        enums={enums as GroupedEnums}
        locale={language}
        leaveMessage={formatMessage({
          defaultMessage: 'Leave open call creation form',
          id: '6FQ0Y8',
        })}
      />
    </ProtectedPage>
  );
};

CreateOpenCallPage.layout = {
  Component: FormPageLayout,
};

export default CreateOpenCallPage;
