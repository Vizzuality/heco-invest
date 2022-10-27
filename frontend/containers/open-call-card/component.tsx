import { FC, useState, useMemo } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { usePress, useFocusWithin } from '@react-aria/interactions';
import dayjs from 'dayjs';
import { truncate } from 'lodash-es';

import Tag from 'components/tag';
import { OpenCallStatus, Paths } from 'enums';

import { useEnums } from 'services/enums/enumService';

import type { OpenCallCardProps } from './types';

export const OpenCallCard: FC<OpenCallCardProps> = ({ className, openCall }: OpenCallCardProps) => {
  const {
    slug,
    name,
    description,
    status,
    // VERIFICATION OPEN CALLS: HIDDEN
    // trusted,
    investor,
    instrument_types,
    maximum_funding_per_project: maxFunding,
    closing_at: closingAt,
  } = openCall;
  const placeholderPicture = '/images/placeholders/profile-logo.png';

  const intl = useIntl();
  const router = useRouter();
  const {
    data: { instrument_type: allInstrumentTypes, ticket_size: allTicketSizes, impact: allImpacts },
  } = useEnums();

  const [picture, setPicture] = useState<string>(investor.picture?.small || placeholderPicture);
  const [isFocusWithin, setIsFocusWithin] = useState<boolean>(false);

  const link = `${Paths.OpenCall}/${slug}`;

  const { pressProps } = usePress({
    onPress: () => {
      router.push(link);
    },
  });

  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setIsFocusWithin,
  });

  const instrumentTypesStr = useMemo(
    () =>
      allInstrumentTypes
        ?.filter(({ id }) => instrument_types?.includes(id))
        .map(({ name }, idx) => (idx === 0 ? name : name.toLowerCase()))
        .join(', '),
    [allInstrumentTypes, instrument_types]
  );

  const deadlineStr = useMemo(
    () => dayjs(closingAt).format('D MMMM'),
    // locale must be in dependency array to change translation when locale changes
    [closingAt, router.locale]
  );

  const truncatedDescription = useMemo(
    () => truncate(description, { length: 300, omission: ' ...' }),
    [description]
  );

  const tags = allImpacts
    ?.filter((impact) => investor?.impacts?.includes(impact.id))
    .map(({ name }) => name);

  const isClosed = status === OpenCallStatus.Closed;
  // VERIFICATION OPEN CALLS: HIDDEN
  // const showRibbon = trusted || isClosed;
  const showRibbon = isClosed;

  return (
    <div
      aria-label={`${name} ${intl.formatMessage({ defaultMessage: 'open call', id: 'fmTQay' })}`}
      role="group"
      className={cx({
        'cursor-pointer transition rounded-2xl': true,
        'hover:ring-1 hover:ring-green-dark': true,
        'ring-2 ring-green-dark': isFocusWithin,
        [className]: !!className,
      })}
      {...pressProps}
      {...focusWithinProps}
    >
      <div className="relative flex flex-col h-full p-5 overflow-hidden bg-white border shadow rounded-2xl gap-y-2 sm:gap-x-4">
        {showRibbon && (
          <span
            className={cx({
              'absolute py-1 pl-6 pr-8 text-xs text-center origin-top-left rotate-45  w-60 -top-10 -right-28':
                true,
              'text-gray-600 bg-gray-300': isClosed,
              // VERIFICATION OPEN CALLS: HIDDEN
              // 'bg-green-dark text-green-light': !isClosed && trusted,
            })}
          >
            {isClosed && <FormattedMessage defaultMessage="Open call ended" id="vZgJJu" />}
            {/* VERIFICATION OPEN CALLS: HIDDEN
            {!isClosed && trusted && <FormattedMessage defaultMessage="Verified" id="Z8971h" />}
            */}
          </span>
        )}
        <div className="flex items-start gap-4">
          <div className="text-xl font-semibold text-gray-900">
            <Link href={link}>
              <a className="text-xl font-semibold leading-tight outline-none pointer-events-none">
                {name}
              </a>
            </Link>
          </div>
        </div>
        <div className="flex items-center h-5 text-sm text-gray-600 min-h-fit">
          <div
            aria-label={intl.formatMessage({
              defaultMessage: 'Financial instruments available',
              id: 'EFVd2S',
            })}
          >
            {instrumentTypesStr}
          </div>
          <span className="mx-2" aria-hidden={true}>
            &bull;
          </span>
          <div
            aria-label={intl.formatMessage({
              defaultMessage: 'Max funding',
              id: 'q7AUEZ',
            })}
          >
            {`< $${maxFunding?.toLocaleString(router.locale)}`}
          </div>
          <span className="mx-2" aria-hidden={true}>
            &bull;
          </span>
          <div>
            <FormattedMessage defaultMessage="Deadline" id="8/Da7A" />: {deadlineStr}
          </div>
        </div>
        <div
          className="flex items-start mt-4"
          aria-label={intl.formatMessage({ defaultMessage: 'Description', id: 'Q8Qw5B' })}
        >
          {truncatedDescription}
        </div>
        <p className="flex-grow text-xs text-gray-700">
          <FormattedMessage
            defaultMessage="Created on <b>{createdDate}</b> and updated on <b>{updatedDate}</b>"
            id="hwBx6v"
            values={{
              b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
              createdDate: dayjs(openCall.created_at).format('MMM DD, YYYY'),
              updatedDate: dayjs(openCall.updated_at).format('MMM DD, YYYY'),
            }}
          />
        </p>
        <div
          className="flex items-center justify-between gap-2 mt-2"
          aria-label={intl.formatMessage({
            defaultMessage: 'Investor information',
            id: '68i9X8',
          })}
        >
          <span className="flex flex-row-reverse items-center gap-2">
            <span className="text-sm">{investor.name}</span>
            <span className="relative flex-shrink-0 w-8 overflow-hidden rounded-full aspect-square">
              <Image
                src={picture}
                alt={intl.formatMessage(
                  { defaultMessage: '{name} picture', id: 'rLzWx9' },
                  { name: investor.name }
                )}
                layout="fill"
                objectFit="contain"
                onError={() => setPicture(placeholderPicture)}
              />
            </span>
          </span>
          {tags && (
            <span
              className="flex flex-wrap items-center justify-end gap-2"
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
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpenCallCard;
