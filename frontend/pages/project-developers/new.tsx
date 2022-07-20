import { useIntl } from 'react-intl';
import { dehydrate, QueryClient } from 'react-query';

import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';
import { useQueryReturnPath } from 'helpers/pages';

import ProjectDeveloperForm from 'containers/project-developer-form';

import { Paths, Queries, UserRoles } from 'enums';
import FormPageLayout, { FormPageLayoutProps } from 'layouts/form-page';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';

import { useCreateProjectDeveloper } from 'services/account';
import { getEnums } from 'services/enums/enumService';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery(Queries.EnumList, getEnums);
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      dehydratedState: dehydrate(queryClient),
    },
  };
});

type ProjectDeveloperProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProjectDeveloper: PageComponent<ProjectDeveloperProps, FormPageLayoutProps> = () => {
  const router = useRouter();
  const { formatMessage } = useIntl();

  const createProjectDeveloper = useCreateProjectDeveloper();
  const queryReturnPath = useQueryReturnPath();

  const handleOnComplete = () => {
    router.push(queryReturnPath || Paths.Dashboard);
  };

  const handleOnLeave = (isOutroPage) => {
    router.push(queryReturnPath || (isOutroPage ? Paths.Discover : Paths.AccountType));
  };

  return (
    <ProtectedPage allowUnapproved permissions={[UserRoles.Light]}>
      <ProjectDeveloperForm
        title={formatMessage({ defaultMessage: 'Setup project developer’s account', id: 'bhxvPM' })}
        leaveMessage={formatMessage({
          defaultMessage: 'Leave create project develop?',
          id: 'NsIwKY',
        })}
        isCreateForm
        mutation={createProjectDeveloper}
        onComplete={handleOnComplete}
        onLeave={handleOnLeave}
      />
    </ProtectedPage>
  );
};

ProjectDeveloper.layout = {
  Component: FormPageLayout,
};

export default ProjectDeveloper;
