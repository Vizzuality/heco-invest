import { FC, useRef, useState, PointerEvent } from 'react';

import { FormattedNumber, useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useButton } from '@react-aria/button';

import { usePropagablePointerEventHandler } from 'hooks/pointer-events';

import type { ProjectCardProps } from './types';

export const ProjectCard: FC<ProjectCardProps> = ({
  className,
  id,
  category,
  name,
  instrument,
  amount,
}: ProjectCardProps) => {
  const thresholdToRegisterPress = 60;

  const containerRef = useRef();
  const intl = useIntl();
  const router = useRouter();

  const [pointerDownX, setPointerDownX] = useState<number>(0);
  const [pointerUpX, setPointerUpX] = useState<number>(0);

  const { buttonProps } = useButton(
    {
      elementType: 'div',
      'aria-label': intl.formatMessage(
        {
          defaultMessage: 'Open {name} project',
          id: 'nkzdYe',
        },
        {
          name,
        }
      ),
      onPress: () => {
        // The Project card is used in a Carousel's slides. We don't want to follow through
        // the press if the user is simply swiping around the slides.
        if (Math.abs(pointerUpX - pointerDownX) >= thresholdToRegisterPress) return;
        router.push(`/project/${id}`);
      },
    },
    containerRef
  );

  // These are part of a Carousel's slides. Unfortunately @react-aria/button' prevents event propagation,
  // which the slider needs to handle cursor/touch slides, hence the use of these hooks.
  const propagablePointerDownHandler = usePropagablePointerEventHandler(
    'pointerdown',
    buttonProps.onPointerDown
  );

  const propagablePointerUpHandler = usePropagablePointerEventHandler(
    'pointerdown',
    buttonProps.onPointerUp
  );

  const handlePointerDown = (event: PointerEvent<HTMLInputElement>) => {
    setPointerDownX(event.screenX);
    propagablePointerDownHandler(event);
  };

  const handlePointerUp = (event: PointerEvent<HTMLInputElement>) => {
    setPointerUpX(event.screenX);
    propagablePointerUpHandler(event);
  };

  return (
    <div
      ref={containerRef}
      className={cx({
        className: !!className,
        'rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark':
          true,
      })}
      {...buttonProps}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className="flex p-6 bg-white border shadow rounded-2xl gap-x-4">
        <div className="flex flex-col flex-grow gap-2">
          <div className="text-sm">{category}</div>
          <div className="text-xl font-semibold leading-tight">{name}</div>
          <div className="text-sm text-gray-400">
            {instrument}
            <span className="mx-2">&bull;</span>
            <FormattedNumber value={amount} style="currency" currency="USD" />
          </div>
        </div>
        <div>
          <div className="w-16 h-10">
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
