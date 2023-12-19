import { FC, useRef } from 'react';

import { useButton } from 'react-aria';
import { FormattedMessage, useIntl } from 'react-intl';

import Link from 'next/link';

import { CategoryTagDot } from 'containers/category-tag';

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
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const { formatMessage } = useIntl();
  const triggerRef = useRef<HTMLAnchorElement>(null);

  const { buttonProps } = useButton(
    {
      onPress: onClick,
      elementType: 'a',
    },
    triggerRef
  );

  return (
    <Link href={`${Paths.Discover}/${cardType}/?filter[${filterName}]=${id}`} passHref>
      <a
        {...buttonProps}
        ref={triggerRef}
        className="focus-visible:outline-green-dark"
        aria-label={
          cardType === 'projects'
            ? formatMessage({ defaultMessage: 'See projects', id: 'q6rG+e' })
            : formatMessage({ defaultMessage: 'See investors', id: 'ctc1sP' })
        }
      >
        <div
          className="w-[75vw] sm:w-[60vw] md:w-auto flex flex-col p-4 transition-all duration-500 bg-white rounded-lg shadow-sm group drop-shadow-none hover:drop-shadow-lg ease h-full min-h-[290px] cursor-pointer"
          key={id}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="flex justify-between mb-2">
            <h3 className="font-serif text-2xl font-bold xl:text-2xl max-w-[80%]">{name}</h3>
            {enumType === 'category' && (
              <CategoryTagDot category={id as CategoryType} size="large" />
            )}
          </div>
          <div>
            <p className="h-full mb-4 text-sm text-gray-800 transition-all duration-500 md:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 ease">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <p className="text-base text-gray-600">
              <span className="font-bold text-black">{quantity} </span>
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
            <Icon
              icon={ArrowIcon}
              className="transition-all duration-500 md:opacity-0 w-15 group-hover:opacity-100 group-focus-within:opacity-100 ease"
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default PublicPageCard;
