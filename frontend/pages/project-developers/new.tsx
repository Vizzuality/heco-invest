import { useIntl } from 'react-intl';
import { dehydrate, QueryClient } from 'react-query';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import ProjectDeveloperForm from 'containers/project-developer-form';

import { Queries, UserRoles } from 'enums';
import FormPageLayout, { FormPageLayoutProps } from 'layouts/form-page';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';

import { useCreateProjectDeveloper } from 'services/account';
import { getEnums } from 'services/enums/enumService';

export async function getStaticProps(ctx) {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery(Queries.EnumList, getEnums);
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
      dehydratedState: dehydrate(queryClient),
    },
  };
}

type ProjectDeveloperProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProjectDeveloper: PageComponent<ProjectDeveloperProps, FormPageLayoutProps> = () => {
  const { formatMessage } = useIntl();

  const createProjectDeveloper = useCreateProjectDeveloper();

  return (
    <ProtectedPage permissions={[UserRoles.Light]}>
      <ProjectDeveloperForm
        title={formatMessage({ defaultMessage: 'Setup project developer’s account', id: 'bhxvPM' })}
        leaveMessage={formatMessage({
          defaultMessage: 'Leave create project develop?',
          id: 'NsIwKY',
        })}
        isCreateForm
        mutation={createProjectDeveloper}
      />
    </ProtectedPage>
  );
};

ProjectDeveloper.layout = {
  Component: FormPageLayout,
};

export default ProjectDeveloper;
