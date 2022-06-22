import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';

import InvestorForm from 'containers/investor-form';

import { Paths } from 'enums';
import { UserRoles } from 'enums';
import FormPageLayout, { FormPageLayoutProps } from 'layouts/form-page';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';
import { GroupedEnums } from 'types/enums';

import { useInvestor, useUpdateInvestor } from 'services/account';
import { getEnums } from 'services/enums/enumService';

export async function getServerSideProps(ctx) {
  const enums = await getEnums();
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
      enums: groupBy(enums, 'type'),
    },
  };
}

type EditInvestorServerSideProps = {
  enums: GroupedEnums;
};

const EditInvestorPage: PageComponent<EditInvestorServerSideProps, FormPageLayoutProps> = ({
  enums,
}) => {
  const { formatMessage } = useIntl();
  const { push } = useRouter();

  const updateInvestor = useUpdateInvestor();

  const handleOnComplete = () => {
    push(Paths.Dashboard);
  };

  const { investor } = useInvestor({});

  return (
    <ProtectedPage permissions={[UserRoles.Investor]}>
      <InvestorForm
        title={formatMessage({ defaultMessage: 'Setup investor profile', id: '7Rh11y' })}
        leaveMessage={formatMessage({
          defaultMessage: 'Leave investor creation form',
          id: 'QqpgJo',
        })}
        enums={enums}
        mutation={updateInvestor}
        onComplete={handleOnComplete}
        initialValues={investor}
      />
    </ProtectedPage>
  );
};

EditInvestorPage.layout = {
  Component: FormPageLayout,
};

export default EditInvestorPage;
