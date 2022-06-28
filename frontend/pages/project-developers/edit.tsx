import { useIntl } from 'react-intl';
import { dehydrate, useQueryClient } from 'react-query';

import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import ProjectDeveloperForm from 'containers/project-developer-form';

import { Paths, Queries, UserRoles } from 'enums';
import FormPageLayout, { FormPageLayoutProps } from 'layouts/form-page';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';

import { useUpdateProjectDeveloper } from 'services/account';
import { getEnums } from 'services/enums/enumService';
import { useCurrentProjectDeveloper } from 'services/project-developers/projectDevelopersService';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  const queryClient = useQueryClient();
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
  const updateProjectDeveloper = useUpdateProjectDeveloper();
  const { projectDeveloper } = useCurrentProjectDeveloper();

  const handleOnComplete = () => {
    router.push(decodeURIComponent(router.query?.returnPath as string) || Paths.Dashboard);
  };

  return (
    <ProtectedPage permissions={[UserRoles.ProjectDeveloper]}>
      <ProjectDeveloperForm
        initialValues={projectDeveloper}
        title={formatMessage({ defaultMessage: 'Edit project developer’s account', id: '2JJSDv' })}
        leaveMessage={formatMessage({
          defaultMessage: 'Leave project developer edition?',
          id: 'LFDgTb',
        })}
        mutation={updateProjectDeveloper}
        onComplete={handleOnComplete}
      />
    </ProtectedPage>
  );
};

ProjectDeveloper.layout = {
  Component: FormPageLayout,
};

export default ProjectDeveloper;
