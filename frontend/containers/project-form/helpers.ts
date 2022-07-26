import { useMemo } from 'react';

import { useIntl } from 'react-intl';

import { pickBy } from 'lodash-es';

import { Project, ProjectForm } from 'types/project';
import { formPageInputs } from 'validations/project';

const projectFormKeys = formPageInputs.flat();

export const useDefaultValues = (project: Project): Partial<ProjectForm> => {
  const { formatMessage } = useIntl();
  return useMemo(() => {
    if (!project) return null;
    const general = pickBy(project, (value, key: any) => projectFormKeys.includes(key));
    return {
      ...general,
      status: project.status,
      language: project.language,
      municipality_id: project.municipality?.id,
      department_id: project.municipality.parent.id,
      country_id: project.country?.id,
      project_images_attributes: project.project_images?.map(({ cover, file, id }, index) => {
        const imageId = file.original.split('redirect/')[1].split('/')[0];
        return {
          file: imageId,
          cover,
          id,
          title: formatMessage(
            { defaultMessage: 'Project image {index}.', id: 'jj4ae3' },
            { index: index }
          ),
          src: file.original,
        };
      }),
      involved_project_developer: !!project.involved_project_developers?.length ? 1 : 0,
      involved_project_developer_ids: project.involved_project_developers?.map(({ id }) => id),
      involved_project_developer_not_listed: project.involved_project_developer_not_listed,
    };
  }, [formatMessage, project]);
};
