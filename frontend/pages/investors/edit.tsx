import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

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

import { useInvestor, useUpdateInvestor } from 'services/account';
import { getEnums } from 'services/enums/enumService';

const INVESTOR_QUERY_PARAMS = {
  // We set the `locale` as `null` so that we get the project in the account's language instead of the UI language
  locale: null,
};

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
  const router = useRouter();
  const { formatMessage } = useIntl();

  const queryReturnPath = useQueryReturnPath();
  const updateInvestor = useUpdateInvestor(INVESTOR_QUERY_PARAMS);

  const { data: investor } = useInvestor(INVESTOR_QUERY_PARAMS);

  const handleOnComplete = () => {
    router.push(queryReturnPath || Paths.Dashboard);
  };

  const handleOnLeave = (isOutroPage) => {
    router.push(queryReturnPath || (isOutroPage ? Paths.Discover : Paths.Dashboard));
  };

  return (
    <ProtectedPage permissions={[UserRoles.Investor]}>
      <InvestorForm
        title={formatMessage({ defaultMessage: 'Edit investor profile', id: 'JnwEP6' })}
        leaveMessage={formatMessage({
          defaultMessage: 'Leave investor edition form',
          id: 'lmxGNp',
        })}
        enums={enums}
        mutation={updateInvestor}
        onComplete={handleOnComplete}
        onLeave={handleOnLeave}
        initialValues={investor}
      />
    </ProtectedPage>
  );
};

EditInvestorPage.layout = {
  Component: FormPageLayout,
};

export default EditInvestorPage;
