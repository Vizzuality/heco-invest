import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import { useRouter } from 'next/router';

import { CategoryTagDot } from 'containers/category-tag';

import Button from 'components/button';
import Icon from 'components/icon';
import { Paths } from 'enums';

import ArrowIcon from 'svgs/project/project-card-arrow.svg';

import { ProjectCardProps } from './types';

export const ProjectCard: FC<ProjectCardProps> = ({
  id,
  name,
  description,
  projectsQuantity,
  category,
}) => {
  const { push } = useRouter();

  return (
    <div
      className="w-[80vw] h-full md:w-auto row-start-2 md:row-start-auto lg:max-w-full flex flex-col justify-between p-4 transition-all duration-500 bg-white rounded-lg shadow-sm group drop-shadow-none hover:drop-shadow-lg ease min-h-[290px]"
      key={id}
    >
      <div className="flex justify-between mb-2">
        <h3 className="font-serif text-xl font-bold xl:text-2xl max-w-[80%]">{name}</h3>
        {!!category && <CategoryTagDot category={category} size="large" />}
      </div>
      <div>
        <p className="mb-4 text-sm text-gray-800 transition-all duration-500 md:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 ease">
          {description}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-base text-gray-600">
          <span className="font-bold text-black">{projectsQuantity}</span>{' '}
          <FormattedMessage
            defaultMessage="{projectsQuantity, plural, one {project} other {projects}}"
            id="gbcj32"
            values={{ projectsQuantity }}
          />
        </p>
        <Button
          theme="naked"
          onClick={() =>
            push({
              pathname: Paths.Discover,
              // TODO: CHANGE TO FILTER BY PROIORITY LANDSCAPE
              query: !!category ? { 'filter[category]': id } : { search: name },
            })
          }
        >
          <span className="sr-only">
            <FormattedMessage defaultMessage="See projects" id="q6rG+e" />
          </span>
          <Icon
            icon={ArrowIcon}
            className="transition-all duration-500 md:opacity-0 w-15 group-hover:opacity-100 group-focus-within:opacity-100 ease"
          />
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
