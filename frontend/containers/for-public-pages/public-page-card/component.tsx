import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { CategoryTagDot } from 'containers/category-tag';

import Button from 'components/button';
import Icon from 'components/icon';
import { Paths } from 'enums';
import { CategoryType } from 'types/category';

import ArrowIcon from 'svgs/project/project-card-arrow.svg';

import { PublicPageCardProps } from './types';

export const PublicPageCard: FC<PublicPageCardProps> = ({
  id,
  name,
  description,
  quantity,
  enumType,
  cardType,
  filterName,
}) => {
  return (
    <div
      className="w-[75vw] sm:w-[60vw] md:w-auto flex flex-col justify-between p-4 transition-all duration-500 bg-white rounded-lg shadow-sm group drop-shadow-none hover:drop-shadow-lg ease min-h-[290px]"
      key={id}
    >
      <div className="flex justify-between mb-2">
        <h3 className="font-serif text-xl font-bold xl:text-2xl max-w-[80%]">{name}</h3>
        {enumType === 'category' && <CategoryTagDot category={id as CategoryType} size="large" />}
      </div>
      <div>
        <p className="mb-4 text-sm text-gray-800 transition-all duration-500 md:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 ease">
          {description}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-base text-gray-600">
          <span className="font-bold text-black">{quantity}</span>{' '}
          {cardType === 'projects' ? (
            <FormattedMessage
              defaultMessage="{quantity, plural, one {project} other {projects}}"
              id="KYymTZ"
              values={{ quantity }}
            />
          ) : (
            <FormattedMessage
              defaultMessage="{quantity, plural, one {investor} other {investors}}"
              id="q7I+Bg"
              values={{ quantity }}
            />
          )}
        </p>
        {!!filterName && (
          <Button theme="naked" to={`${Paths.Discover}/${cardType}/?filter[${filterName}]=${id}`}>
            <span className="sr-only">
              <FormattedMessage defaultMessage="See projects" id="q6rG+e" />
            </span>
            <Icon
              icon={ArrowIcon}
              className="transition-all duration-500 md:opacity-0 w-15 group-hover:opacity-100 group-focus-within:opacity-100 ease"
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PublicPageCard;
