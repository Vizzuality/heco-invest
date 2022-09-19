import { ImpactAreas, Impacts } from 'enums';
import type { Project as ProjectType, ProjectImpactAreasScores } from 'types/project';

/** Function to extract the project impacts for each area ( municipality, hydrobasin, priority_landscape) with they scope (biodiversity, climate, water, community, total). */
export const projectImpact = (project: ProjectType): Partial<ProjectImpactAreasScores> => {
  if (!project) return null;
  return Object.values(ImpactAreas).reduce(
    (acc, impactArea) => ({
      ...acc,
      [impactArea]: Object.values(Impacts).reduce((acc, impact) => {
        const impactScore = project[`${impactArea}_${impact}_impact`];
        const totalImpactScore = project[`${impactArea}_total_impact`];
        // if the impact score is null it will return null, so we can know that it does not exist
        return {
          ...acc,
          [impact]: impactScore !== null ? impactScore * 10 : null,
          total: totalImpactScore !== null ? totalImpactScore * 10 : null,
        };
      }, {}),
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
