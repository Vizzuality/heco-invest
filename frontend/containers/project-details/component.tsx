import { FC, useMemo, useState, useEffect } from 'react';

import { CheckCircle as CheckCircleIcon, X as XIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';
import Link from 'next/link';

import dayjs from 'dayjs';
import { noop } from 'lodash-es';

import { projectImpact } from 'helpers/project';

import CategoryTag from 'containers/category-tag';
import ImpactChart from 'containers/impact-chart';
import ImpactText from 'containers/impact-text';
import SDGs from 'containers/sdgs';

import Button from 'components/button';
import Tag from 'components/tag';
import { ImpactAreas } from 'enums';
import { Paths } from 'enums';
import { CategoryType } from 'types/category';
import { Enum } from 'types/enums';

import { useEnums } from 'services/enums/enumService';
import { useFavoriteProject } from 'services/projects/projectService';

import FavoriteContact from './favorite-contact';
import type { ProjectDetailsProps } from './types';

export const ProjectDetails: FC<ProjectDetailsProps> = ({
  className,
  project,
  onClose = noop,
}: ProjectDetailsProps) => {
  const intl = useIntl();

  const [projectDeveloperImage, setProjectDeveloperImage] = useState<string>(
    project.project_developer?.picture?.small
  );

  useEffect(() => {
    setProjectDeveloperImage(project.project_developer?.picture?.small);
  }, [project]);

  const {
    data: {
      instrument_type: allInstrumentTypes,
      ticket_size: allTicketSizes,
      category: allCategories,
      sdg: allSdgs,
    },
  } = useEnums();

  const handleProjectDeveloperImageError = () => {
    setProjectDeveloperImage('/images/placeholders/profile-logo.png');
  };

  const impactArea = ImpactAreas.Municipality;

  const ticketSizeStr = useMemo(
    () => allTicketSizes?.find(({ id }) => project.ticket_size === id)?.description,
    [allTicketSizes, project.ticket_size]
  );

  const instrumentTypesStr = useMemo(
    () =>
      allInstrumentTypes
        ?.filter(({ id }) => project.instrument_types?.includes(id))
        .map(({ name }, idx) => (idx === 0 ? name : name.toLowerCase()))
        .join(', '),
    [allInstrumentTypes, project.instrument_types]
  );

  const projectDeveloper = project?.project_developer;
  const category = allCategories?.find(({ id }) => id === project.category);
  const link = `${Paths.Project}/${project.slug}`;
  const sdgs = allSdgs.filter(({ id }) => project.sdgs.includes(parseInt(id)));
  const impact = useMemo(() => projectImpact(project), [project])[impactArea];

  const favoriteProject = useFavoriteProject();

  const handleFavoriteClick = () => {
    // This mutation uses a 'DELETE' request when the isFavorite is true, and a 'POST' request when is false.
    favoriteProject.mutate(
      { id: project.id, isFavourite: project.favourite },
      {
        onSuccess: (data) => {
          project.favourite = data.favourite;
        },
      }
    );
  };

  return (
    <div className={className}>
      <div className="absolute top-0 right-0 z-20 w-full h-full overflow-hidden pointer-events-none">
        <Button
          size="smallest"
          theme="naked"
          className="absolute text-gray-400 pointer-events-auto right-4 top-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark"
          aria-label={intl.formatMessage({
            defaultMessage: 'Close project details card',
            id: 'hmK5Jb',
          })}
          onClick={onClose}
        >
          <XIcon className="w-6 h-6" aria-hidden={true} />
        </Button>
        {project.looking_for_funding && (
          <span className="absolute px-10 py-2 text-xs text-center origin-top-left rotate-45 w-60 -top-10 -right-28 bg-green-dark text-green-light">
            <FormattedMessage defaultMessage="Looking for funding" id="Czc5vB" />
          </span>
        )}
      </div>
      <div className="relative p-4 sm:p-10">
        <div className="flex gap-2 text-sm">
          {/* VERIFICATION PROJECTS: HIDDEN
          {project.trusted && (
            <>
              <span
                className="flex items-center text-green-dark"
                title={intl.formatMessage({
                  defaultMessage: 'Project verification',
                  id: 'E1kj21',
                })}
              >
                <Tag className="text-green-dark" size="smallest">
                  <CheckCircleIcon className="w-4 h-4 mr-1" aria-hidden={true} />
                  <FormattedMessage defaultMessage="Verified" id="Z8971h" />
                </Tag>
              </span>
            </>
          )}
          */}
          {category && (
            <div title={intl.formatMessage({ defaultMessage: 'Project category', id: '/plMvw' })}>
              <CategoryTag size="smallest" category={category.id as CategoryType}>
                {category.name}
              </CategoryTag>
            </div>
          )}
        </div>
        <h1 className="mt-6 mb-2 font-serif text-3xl">
          <Link href={link}>
            <a className="text-black transition-all duration-500 ease-in-out border-b-2 border-b-transparent hover:border-b-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark">
              {project.name}
            </a>
          </Link>
        </h1>
        {instrumentTypesStr && ticketSizeStr && (
          <div className="flex items-center h-5 my-2 text-gray-800 text-md min-h-fit">
            {instrumentTypesStr && (
              <div
                title={intl.formatMessage({
                  defaultMessage: 'Project financial instrument',
                  id: 'hLG9bm',
                })}
              >
                {instrumentTypesStr}
              </div>
            )}
            {instrumentTypesStr && ticketSizeStr && (
              <span className="mx-2" aria-hidden={true}>
                &bull;
              </span>
            )}
            {ticketSizeStr && (
              <div
                title={intl.formatMessage({
                  defaultMessage: 'Project ticket size',
                  id: 'x/AykP',
                })}
              >
                {ticketSizeStr}
              </div>
            )}
          </div>
        )}
        <div
          className="mt-4"
          aria-label={intl.formatMessage({ defaultMessage: 'Project description', id: 'Hb+Idf' })}
        >
          {project.description}
        </div>
        <p className="mt-2 text-xs text-gray-700">
          <FormattedMessage
            defaultMessage="Created on <b>{createdDate}</b> and updated on <b>{updatedDate}</b>"
            id="hwBx6v"
            values={{
              b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
              createdDate: dayjs(project.created_at).format('MMM DD, YYYY'),
              updatedDate: dayjs(project.updated_at).format('MMM DD, YYYY'),
            }}
          />
        </p>
        <div
          className="flex items-center mt-4 text-sm text-gray-900"
          aria-label={intl.formatMessage({ defaultMessage: 'Project developer', id: 'yF82he' })}
        >
          <span className="relative w-8 h-8 mr-2 rounded-full" aria-hidden={true}>
            <Image
              className="rounded-full"
              src={projectDeveloperImage}
              alt={intl.formatMessage({ defaultMessage: 'Project developer photo', id: 'BZkcBV' })}
              layout="fill"
              objectFit="contain"
              onError={handleProjectDeveloperImageError}
            />
          </span>
          <span>{projectDeveloper.name}</span>
        </div>
        <div className="my-2 text-gray-900" aria-describedby="estimated-impact">
          <h2 id="estimated-impact" className="text-xl font-semibold">
            <FormattedMessage defaultMessage="Estimated impact" id="Jl9QMO" />
          </h2>
          <ImpactText
            className="my-3"
            area={impactArea}
            impactCalculated={project.impact_calculated}
            impact={impact}
            linkToFAQ
          />
          <div className="flex justify-center">
            <ImpactChart
              className="max-w-[300px] max-h-[300px] my-4"
              category={category.id}
              impact={impact}
            />
          </div>
        </div>
        <div className="mt-4 text-gray-900" aria-describedby="sdgs">
          <h2 id="sdgs" className="text-xl font-semibold">
            <FormattedMessage defaultMessage="SDGs" id="JQjEP9" />
          </h2>
          <SDGs className="mt-3 lg:grid lg:grid-cols-4" size="large" sdgs={sdgs as Enum[]} />
        </div>
      </div>
      <FavoriteContact
        className="sticky bottom-0 w-full px-4 py-4 bg-white shadow-lg sm:px-8 drop-shadow"
        project={project}
        onFavoriteClick={handleFavoriteClick}
      />
    </div>
  );
};

export default ProjectDetails;
