import { FC, PointerEvent, useState } from 'react';

import { FormattedNumber, useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { usePress, useFocusWithin } from '@react-aria/interactions';

import { usePropagableEventHandlers } from 'hooks/pointer-events';

import type { ProjectCardProps } from './types';

export const ProjectCard: FC<ProjectCardProps> = ({
  className,
  id,
  category,
  name,
  instrument,
  amount,
  link: href,
  onClick,
}: ProjectCardProps) => {
  const thresholdToRegisterPress = 60;

  const intl = useIntl();
  const router = useRouter();

  const [isFocusWithin, setIsFocusWithin] = useState<boolean>(false);
  const [pointerDownX, setPointerDownX] = useState<number>(0);
  const [pointerUpX, setPointerUpX] = useState<number>(0);

  const { pressProps } = usePress({
    onPress: () => {
      if (Math.abs(pointerUpX - pointerDownX) >= thresholdToRegisterPress) return;
      if (href) {
        router.push(href);
      } else {
        onClick && onClick();
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
        'cursor-pointer rounded-2xl': true,
        'hover:ring-1 hover:ring-green-dark': true,
        'ring-2 ring-green-dark': isFocusWithin,
      })}
      {...pressProps}
      {...focusWithinProps}
      {...pointerProps}
    >
      <div
        className={cx({
          'relative flex flex-col sm:flex-row p-6 bg-white border shadow rounded-2xl gap-y-2 sm:gap-x-4':
            true,
          'rounded-2xl overflow-hidden': true,
        })}
      >
        <div className="flex flex-col flex-grow gap-2">
          <div
            className="text-sm"
            title={intl.formatMessage({ defaultMessage: 'Project category', id: '/plMvw' })}
          >
            {category}
          </div>
          <div>
            {href && (
              <Link href={href}>
                <a className="text-xl font-semibold leading-tight outline-none pointer-events-none">
                  {name}
                </a>
              </Link>
            )}
            {!href && onClick && (
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
            )}
            {!href && !onClick && (
              <span className="text-xl font-semibold leading-tight outline-none">{name}</span>
            )}
          </div>
          <div className="text-sm text-gray-600" title="Project financial instrument">
            {instrument}
            <span className="mx-2" aria-hidden={true}>
              &bull;
            </span>
            <FormattedNumber value={amount} style="currency" currency="USD" />
          </div>
        </div>
        <div>
          <div className="w-16 h-10 mx-auto">
            <Image
              className="mx-auto rounded-full"
              src={'/images/temp-placeholders/impact-shape.png'}
              alt={intl.formatMessage(
                {
                  defaultMessage: 'Impact shame of the {name} project',
                  id: 'IDzvCG',
                },
                {
                  name,
                }
              )}
              title={intl.formatMessage(
                {
                  defaultMessage: 'Impact shame of the {name} project',
                  id: 'IDzvCG',
                },
                {
                  name,
                }
              )}
              layout="responsive"
              width="100%"
              height="100%"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
