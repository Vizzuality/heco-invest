import { FC, useState, useMemo } from 'react';

import { useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { usePress, useFocusWithin } from '@react-aria/interactions';
import { truncate } from 'lodash-es';

import Tag from 'components/tag';

import { useEnums } from 'services/enums/enumService';

import type { ProfileCardProps } from './types';

export const ProfileCard: FC<ProfileCardProps> = ({
  className,
  profileType,
  type,
  name,
  description,
  impacts,
  link,
  picture: pictureProp = undefined,
}: ProfileCardProps) => {
  const placeholderPicture = '/images/placeholders/profile-logo.png';

  const intl = useIntl();
  const router = useRouter();
  const [picture, setPicture] = useState<string>(pictureProp || placeholderPicture);

  const {
    data: {
      impact: allImpacts,
      project_developer_type: allProjectDeveloperTypes,
      investor_type: allInvestorTypes,
    },
  } = useEnums();

  const [isFocusWithin, setIsFocusWithin] = useState<boolean>(false);

  const { pressProps } = usePress({
    onPress: () => {
      router.push(link);
    },
  });

  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setIsFocusWithin,
  });

  const subtitle =
    profileType === 'project-developer'
      ? allProjectDeveloperTypes?.find(({ id }) => id === type)?.name
      : allInvestorTypes?.find(({ id }) => id === type)?.name;

  const truncatedDescription = useMemo(
    () => truncate(description, { length: 300, omission: ' ...' }),
    [description]
  );

  const tags = allImpacts?.filter((impact) => impacts?.includes(impact.id)).map(({ name }) => name);

  const cardAriaLabel =
    profileType === 'project-developer'
      ? intl.formatMessage({ defaultMessage: `{name} project developer`, id: 'jXqlWP' }, { name })
      : intl.formatMessage({ defaultMessage: `{name} investor`, id: '9WcWke' }, { name });

  return (
    <div
      aria-label={cardAriaLabel}
      role="group"
      className={cx({
        [className]: !!className,
        'cursor-pointer transition rounded-2xl': true,
        'hover:ring-1 hover:ring-green-dark': true,
        'ring-2 ring-green-dark': isFocusWithin,
      })}
      {...pressProps}
      {...focusWithinProps}
    >
      <div className="relative flex flex-col h-full p-5 bg-white border shadow rounded-2xl gap-y-2 sm:gap-x-4">
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0 overflow-hidden rounded-full w-18 aspect-square">
            <Image
              className="w-18 h-18"
              src={picture}
              alt={intl.formatMessage({ defaultMessage: '{name} picture', id: 'rLzWx9' }, { name })}
              layout="fill"
              objectFit="cover"
              onError={() => setPicture(placeholderPicture)}
            />
          </div>
          <div className="pt-2">
            <div className="text-xl font-semibold text-gray-900">
              <Link href={link}>
                <a className="text-xl font-semibold leading-tight outline-none pointer-events-none">
                  {name}
                </a>
              </Link>
            </div>
            {subtitle && <div className="text-gray-600 text-md">{subtitle}</div>}
          </div>
        </div>
        <div
          className="flex items-start flex-grow mt-4"
          aria-label={intl.formatMessage({ defaultMessage: 'Description', id: 'Q8Qw5B' })}
        >
          {truncatedDescription}
        </div>
        {tags && (
          <div
            className="flex flex-wrap gap-2 mt-3"
            role="group"
            aria-label={intl.formatMessage({
              defaultMessage: 'Expects to have impact on',
              id: 'YYMUK5',
            })}
          >
            {tags.map((tag) => (
              <Tag key={tag} className="text-sm text-green-dark" size="smallest">
                {tag}
              </Tag>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
