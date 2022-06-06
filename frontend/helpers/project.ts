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
