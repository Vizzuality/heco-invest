import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';
import { useQueryReturnPath } from 'helpers/pages';

import ProjectForm from 'containers/project-form';

import { EnumTypes, Paths, UserRoles } from 'enums';
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
import { getProject, useProject } from 'services/projects/projectService';

const PROJECT_QUERY_PARAMS = {
  includes: [
    'project_images',
    'country',
    'municipality',
    'department',
    'project_developer',
    'involved_project_developers',
    'project_developer',
  ],
  // We set the `locale` as `null` so that we get the project in the account's language instead of the UI language
  locale: null,
};

export const getServerSideProps = withLocalizedRequests(async ({ params: { id }, locale }) => {
  let project;
  let enums;

  try {
    ({ data: project } = await getProject(id as string, PROJECT_QUERY_PARAMS));
    enums = await getEnums();
  } catch (e) {
    // The user may be attempting to preview a drafted project, which the endpoint won't return
    // unless the ownership can be verified. We'll be loading it client side and redirect the user
    // to the dashboard if the project really doesn't exist or the user doesn't have permissions
    project = null;
  }

  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      project,
      enums: groupBy(enums, 'type'),
    },
  };
});

type EditProjectProps = {
  project: ProjectType;
  enums: GroupedEnumsType;
};

const EditProject: PageComponent<EditProjectProps, FormPageLayoutProps> = ({
  project: projectProp,
  enums,
}) => {
  const { formatMessage } = useIntl();
  const router = useRouter();

  const updateProject = useUpdateProject();
  const queryReturnPath = useQueryReturnPath();

  const {
    data: { data: project },
    isFetching: isFetchingProject,
  } = useProject(router.query.id as string, PROJECT_QUERY_PARAMS, projectProp);

  const getIsOwner = (_user: User, userAccount: ProjectDeveloper | Investor) => {
    // The user must be a the creator of the project to be allowed to edit it.
    return (
      project?.project_developer?.id &&
      userAccount?.id &&
      project.project_developer.id === userAccount.id
    );
  };

  const onComplete = () => {
    router.push(queryReturnPath || Paths.DashboardProjects);
  };

  return (
    <ProtectedPage
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
        isLoading={isFetchingProject}
        enums={enums}
      />
    </ProtectedPage>
  );
};

EditProject.layout = {
  Component: FormPageLayout,
};

export default EditProject;
