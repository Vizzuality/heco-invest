import { useIntl } from 'react-intl';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetServerSidePropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import OpenCallForm from 'containers/open-call-form';

import { UserRoles } from 'enums';
import FormPageLayout from 'layouts/form-page';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';

export const getServerSideProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

const CreateOpenCallPage: PageComponent<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { formatMessage } = useIntl();
  const handleNextClick = () => {};
  const handleLeave = () => {};
  const mutation = {};

  return (
    // <ProtectedPage permissions={[UserRoles.Investor]}>
    <OpenCallForm
      handleNextClick={handleNextClick}
      onLeave={handleLeave}
      title={formatMessage({ defaultMessage: 'Create Open Call', id: '7xC2j0' })}
      mutation={mutation}
    />
    // </ProtectedPage>
  );
};

CreateOpenCallPage.layout = {
  Component: FormPageLayout,
};

export default CreateOpenCallPage;
