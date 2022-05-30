import { FC, PointerEvent, useState, useMemo } from 'react';

import { CheckCircle as CheckCircleIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { usePress, useFocusWithin } from '@react-aria/interactions';

import { usePropagableEventHandlers } from 'hooks/pointer-events';

import { projectImpact } from 'helpers/project';

import ImpactChart from 'components/impact-chart';
import { Paths } from 'enums';

import { useEnums } from 'services/enums/enumService';

import type { ProjectCardProps } from './types';

export const ProjectCard: FC<ProjectCardProps> = ({
  className,
  active = false,
  project,
  onClick,
}: ProjectCardProps) => {
  const thresholdToRegisterPress = 60;

  const intl = useIntl();
  const router = useRouter();

  const {
    data: {
      instrument_type: allInstrumentTypes,
      ticket_size: allTicketSizes,
      category: allCategories,
    },
  } = useEnums();

  const { id, slug, name, trusted } = project;
  const category = allCategories?.find(({ id }) => id === project.category);
  const impact = useMemo(() => projectImpact(project)['municipality'], [project]);
  const link = `${Paths.Project}/${slug}`;

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

  const [isFocusWithin, setIsFocusWithin] = useState<boolean>(false);
  const [pointerDownX, setPointerDownX] = useState<number>(0);
  const [pointerUpX, setPointerUpX] = useState<number>(0);

  const { pressProps } = usePress({
    onPress: () => {
      if (Math.abs(pointerUpX - pointerDownX) >= thresholdToRegisterPress) return;
      if (onClick) {
        onClick(id);
      } else {
        router.push(link);
      }
    },
  });

  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setIsFocusWithin,
  });

  // These are part of a Carousel's slides. Unfortunately @react-aria/usePress' prevents event propagation,
  // which the slider needs to handle cursor/touch slides, hence the use of these hooks.
  const propagablePointerDownHandler = usePropagableEventHandlers(
    'pointerdown',
    pressProps.onPointerDown
  );

  const propagablePointerUpHandler = usePropagableEventHandlers(
    'pointerdown',
    pressProps.onPointerUp
  );

  const pointerProps = {
    onPointerDown: (event: PointerEvent<HTMLInputElement>) => {
      setPointerDownX(event.screenX);
      propagablePointerDownHandler(event);
    },
    onPointerUp: (event: PointerEvent<HTMLInputElement>) => {
      setPointerUpX(event.screenX);
      propagablePointerUpHandler(event);
    },
  };

  return (
    <div
      id={id}
      aria-label={intl.formatMessage({ defaultMessage: '{name} project', id: 'JWYapR' }, { name })}
      role="group"
      className={cx({
        [className]: !!className,
        'cursor-pointer transition rounded-2xl': true,
        'hover:ring-1 hover:ring-green-dark': !active,
        'ring-2 ring-green-dark': isFocusWithin || active,
      })}
      {...pressProps}
      {...focusWithinProps}
      {...pointerProps}
    >
      <div
        className={cx({
          'relative flex flex-col sm:flex-row p-4 bg-white border shadow rounded-2xl gap-y-2 sm:gap-x-4':
            true,
          'rounded-2xl overflow-hidden': true,
        })}
      >
        <div className="flex flex-col flex-grow gap-2">
          <div className="flex text-sm">
            {trusted && (
              <>
                <span
                  className="flex items-center text-green-dark"
                  title={intl.formatMessage({
                    defaultMessage: 'Project verification',
                    id: 'E1kj21',
                  })}
                >
                  <CheckCircleIcon className="w-4 h-4 mr-1" aria-hidden={true} />
                  <FormattedMessage defaultMessage="Verified" id="Z8971h" />
                </span>
                <span className="mx-2" aria-hidden={true}>
                  &bull;
                </span>
              </>
            )}
            <div title={intl.formatMessage({ defaultMessage: 'Project category', id: '/plMvw' })}>
              {category.name}
            </div>
          </div>
          <div>
            {onClick ? (
              <button
                className="text-xl font-semibold leading-tight outline-none"
                aria-label={intl.formatMessage(
                  {
                    defaultMessage: 'View {name} project details',
                    id: 'dZYyPC',
                  },
                  {
                    name,
                  }
                )}
              >
                {name}
              </button>
            ) : (
              <Link href={link}>
                <a className="text-xl font-semibold leading-tight outline-none pointer-events-none">
                  {name}
                </a>
              </Link>
            )}
            {!onClick && !link && (
              <span className="text-xl font-semibold leading-tight outline-none">{name}</span>
            )}
          </div>
          <div className="flex items-center h-5 text-sm text-gray-600 min-h-fit">
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
        </div>
        <div>
          <div className="w-20 h-20 mx-auto aspect-square">
            <ImpactChart compactMode={true} category={category.id} impact={impact} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
