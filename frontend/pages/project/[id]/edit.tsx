import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';

import ProjectForm from 'containers/project-form';

import { Paths, UserRoles } from 'enums';
import FormPageLayout, { FormPageLayoutProps } from 'layouts/form-page';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';
import { GroupedEnums as GroupedEnumsType } from 'types/enums';
import { Investor } from 'types/investor';
import { Project as ProjectType } from 'types/project';
import { ProjectDeveloper } from 'types/projectDeveloper';
import { User } from 'types/user';

import { useUpdateProject } from 'services/account';
import { getEnums } from 'services/enums/enumService';
import { getProject } from 'services/projects/projectService';

export const getServerSideProps = withLocalizedRequests(async ({ params: { id }, locale }) => {
  let project;
  let enums;

  try {
    ({ data: project } = await getProject(id as string, {
      includes: [
        'project_images',
        'country',
        'municipality',
        'department',
        'involved_project_developers',
      ],
      // The 'locale' setted to undefined, for this endpoint, returns the project data with the project default language
      locale: undefined,
    }));
    enums = await getEnums();
  } catch (e) {
    return { notFound: true };
  }

  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      enums: groupBy(enums, 'type'),
      project: project,
    },
  };
});

type EditProjectProps = {
  project: ProjectType;
  enums: GroupedEnumsType;
};

const EditProject: PageComponent<EditProjectProps, FormPageLayoutProps> = ({ project, enums }) => {
  const { formatMessage } = useIntl();
  const updateProject = useUpdateProject();
  const router = useRouter();

  const getIsOwner = (_user: User, userAccount: ProjectDeveloper | Investor) => {
    // The project developer must be a the owner of the project to be allowed to edit it.
    return (
      project?.project_developer?.id &&
      userAccount?.id &&
      project.project_developer.id === userAccount.id
    );
  };

  const onComplete = () => {
    router.push(
      router.query?.returnPath
        ? decodeURIComponent(router.query?.returnPath as string)
        : Paths.DashboardProjects
    );
  };

  return (
    <ProtectedPage
      allowConfirmed
      ownership={{
        allowOwner: true,
        getIsOwner,
      }}
      permissions={[UserRoles.ProjectDeveloper]}
    >
      <ProjectForm
        title={formatMessage({ defaultMessage: 'Edit project', id: 'qwCflo' })}
        leaveMessage={formatMessage({
          defaultMessage: 'Leave project creation form',
          id: 'vygPIS',
        })}
        mutation={updateProject}
        onComplete={onComplete}
        initialValues={project}
        enums={enums}
      />
    </ProtectedPage>
  );
};

EditProject.layout = {
  Component: FormPageLayout,
};

export default EditProject;
