import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';
import { useQueryReturnPath } from 'helpers/pages';

import InvestorForm from 'containers/investor-form';

import { Paths } from 'enums';
import { UserRoles } from 'enums';
import FormPageLayout, { FormPageLayoutProps } from 'layouts/form-page';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';
import { GroupedEnums } from 'types/enums';

import { useCreateInvestor } from 'services/account';
import { getEnums } from 'services/enums/enumService';

export const getServerSideProps = withLocalizedRequests(async ({ locale }) => {
  const enums = await getEnums();
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      enums: groupBy(enums, 'type'),
    },
  };
});

type NewInvestorServerSideProps = {
  enums: GroupedEnums;
};

const NewInvestorPage: PageComponent<NewInvestorServerSideProps, FormPageLayoutProps> = ({
  enums,
}) => {
  const router = useRouter();
  const { formatMessage } = useIntl();

  const createInvestor = useCreateInvestor();
  const queryReturnPath = useQueryReturnPath();

  const handleOnComplete = () => {
    router.push(queryReturnPath || Paths.Dashboard);
  };

  return (
    <ProtectedPage permissions={[UserRoles.Light]}>
      <InvestorForm
        title={formatMessage({ defaultMessage: 'Setup investor profile', id: '7Rh11y' })}
        leaveMessage={formatMessage({
          defaultMessage: 'Leave investor creation form',
          id: 'QqpgJo',
        })}
        enums={enums}
        mutation={createInvestor}
        onComplete={handleOnComplete}
        isCreateForm
      />
    </ProtectedPage>
  );
};

NewInvestorPage.layout = {
  Component: FormPageLayout,
};

export default NewInvestorPage;
