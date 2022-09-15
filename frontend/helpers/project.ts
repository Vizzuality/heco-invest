import { ImpactAreas, Impacts } from 'enums';
import type { Project as ProjectType } from 'types/project';

export const projectImpact = (project: ProjectType) => {
  if (!project) return null;

  return Object.values(ImpactAreas).reduce(
    (acc, impactArea) => ({
      ...acc,
      [impactArea]: Object.values(Impacts).reduce(
        (acc, impact) => ({
          ...acc,
          [impact]: project[`${impactArea}_${impact}_impact`] * 10 || null,
          total: project[`${impactArea}_total_impact`] * 10 || null,
        }),
        {}
      ),
    }),
    {}
  );
};

export const useProjectContacts = (project: ProjectType) => {
  if (!project) return null;

  return [project?.project_developer || [], ...(project?.involved_project_developers || [])]
    .map((developer) => {
      if (!developer.contact_email && !developer.contact_phone) return;

      return {
        name: developer.name,
        email: developer.contact_email,
        phone: developer.contact_phone,
        picture: developer.picture?.small,
      };
    })
    .filter((developer) => !!developer);
};
