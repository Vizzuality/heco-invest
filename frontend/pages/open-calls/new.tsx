import { withLocalizedRequests } from 'hoc/locale';

import { InferGetServerSidePropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import OpenCallCalendar from 'containers/open-call-form/open-call-calendar';

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
  return (
    // <ProtectedPage permissions={[UserRoles.Investor]}>
    <OpenCallCalendar />
    // </ProtectedPage>
  );
};

CreateOpenCallPage.layout = {
  Component: FormPageLayout,
};

export default CreateOpenCallPage;
