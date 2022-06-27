import { useIntl } from 'react-intl';

import { withLocalizedRequests } from 'hoc/locale';

import { groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';

import ProjectForm from 'containers/project-form';

import { UserRoles } from 'enums';
import FormPageLayout from 'layouts/form-page';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';
import { GroupedEnums } from 'types/enums';

import { useCreateProject } from 'services/account';
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

type CreateProjectProps = {
  enums: GroupedEnums;
};

const CreateProject: PageComponent<CreateProjectProps> = ({ enums }) => {
  const { formatMessage } = useIntl();
  const createProject = useCreateProject();

  return (
    <ProtectedPage permissions={[UserRoles.ProjectDeveloper]}>
      <ProjectForm
        title={formatMessage({ defaultMessage: 'Create project', id: 'VUN1K7' })}
        leaveMessage={formatMessage({
          defaultMessage: 'Leave project creation form',
          id: 'vygPIS',
        })}
        mutation={createProject}
        enums={enums}
        isCreateForm
      />
    </ProtectedPage>
  );
};

CreateProject.layout = {
  Component: FormPageLayout,
};

export default CreateProject;
