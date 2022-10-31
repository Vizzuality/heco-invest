import { FC, PointerEvent, useState, useMemo, useCallback, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { usePress, useFocusWithin } from '@react-aria/interactions';

import { usePropagableEventHandlers } from 'hooks/pointer-events';

import { projectImpact } from 'helpers/project';

import ImpactChart from 'containers/impact-chart';

import Label from 'components/forms/label';
import Switch from 'components/forms/switch';
import { Paths } from 'enums';

import { useFundProject } from 'services/account';
import { useEnums } from 'services/enums/enumService';

import type { ProjectCardProps } from './types';

export const ProjectCard: FC<ProjectCardProps> = ({
  className,
  active = false,
  project,
  canFund = false,
  onClick,
}: ProjectCardProps) => {
  const thresholdToRegisterPress = 60;

  const intl = useIntl();
  const router = useRouter();

  const fundProject = useFundProject(project.id);

  const { register, setValue, handleSubmit } = useForm<{ financing_project: boolean }>();

  useEffect(() => {
    setValue('financing_project', !!project.funded);
  }, [project, setValue]);

  const {
    data: {
      instrument_type: allInstrumentTypes,
      ticket_size: allTicketSizes,
      category: allCategories,
    },
  } = useEnums();

  const { id, slug, name } = project;
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
        .map(({ name }, idx) => (idx === 0 ? name : name.toLowerCase())?.trim())
        .join(', '),
    [allInstrumentTypes, project.instrument_types]
  );

  const [isFocusWithin, setIsFocusWithin] = useState<boolean>(false);
  const [pointerDownX, setPointerDownX] = useState<number>(0);
  const [pointerUpX, setPointerUpX] = useState<number>(0);

  const onClickCard = useCallback(() => {
    if (onClick) {
      onClick(id);
    } else {
      router.push(link);
    }
  }, [id, link, onClick, router]);

  const onToggleFinancing = useCallback(() => {
    fundProject.mutate(!project.funded);
  }, [project, fundProject]);

  const { pressProps } = usePress({
    /**
     * If the funding option is displayed, the container can't be a button. That's invalid in HTML.
     **/
    isDisabled: canFund,
    onPress: () => {
      if (Math.abs(pointerUpX - pointerDownX) >= thresholdToRegisterPress) return;
      onClickCard();
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
        'cursor-pointer': !canFund,
        'transition rounded-2xl': true,
        'hover:ring-1 hover:ring-green-dark': !active,
        'ring-2 ring-green-dark': isFocusWithin || active,
      })}
      {...pressProps}
      {...focusWithinProps}
      {...pointerProps}
    >
      <div
        className={cx({
          'relative flex sm:flex-row p-4 bg-white border shadow rounded-2xl gap-y-2 sm:gap-x-4':
            true,
          'rounded-2xl overflow-hidden': true,
        })}
      >
        <div className="flex flex-col flex-grow gap-2">
          <div className="flex text-sm">
            {/* VERIFICATION PROJECTS: HIDDEN
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
            */}
            <div title={intl.formatMessage({ defaultMessage: 'Project category', id: '/plMvw' })}>
              {category?.name}
            </div>
          </div>
          <div>
            {onClick ? (
              <button
                className="text-xl font-semibold leading-tight text-left outline-none"
                aria-label={intl.formatMessage(
                  {
                    defaultMessage: 'View {name} project details',
                    id: 'dZYyPC',
                  },
                  {
                    name,
                  }
                )}
                onClick={() => {
                  if (canFund) {
                    onClickCard();
                  }
                }}
              >
                {name}
              </button>
            ) : (
              <Link href={link}>
                <a
                  className={cx({
                    'text-xl font-semibold leading-tight outline-none': true,
                    'pointer-events-none': !canFund,
                  })}
                >
                  {name}
                </a>
              </Link>
            )}
            {!onClick && !link && (
              <span className="text-xl font-semibold leading-tight outline-none">{name}</span>
            )}
          </div>
          <div className="flex flex-wrap items-center text-sm text-gray-600 min-h-fit">
            {instrumentTypesStr && (
              <div
                title={intl.formatMessage({
                  defaultMessage: 'Project financial instrument',
                  id: 'hLG9bm',
                })}
                className="mr-2"
              >
                {instrumentTypesStr}
              </div>
            )}
            <div>
              {instrumentTypesStr && ticketSizeStr && (
                <span className="mr-2" aria-hidden={true}>
                  &bull;
                </span>
              )}
              {ticketSizeStr && (
                <div
                  title={intl.formatMessage({
                    defaultMessage: 'Project ticket size',
                    id: 'x/AykP',
                  })}
                  className="inline mr-2"
                >
                  {ticketSizeStr}
                </div>
              )}
            </div>
          </div>
          {canFund && (
            <Label htmlFor="financing-project" className="flex items-center gap-2 cursor-pointer">
              <Switch
                id="financing-project"
                name="financing_project"
                register={register}
                registerOptions={{
                  onChange: () => handleSubmit(onToggleFinancing)(),
                }}
                disabled={fundProject.isLoading}
              />
              <FormattedMessage defaultMessage="I’m financing this project" id="ijVzNu" />
            </Label>
          )}
        </div>
        <div>
          <div className="w-20 h-20 mx-auto aspect-square">
            <ImpactChart compactMode={true} category={category?.id} impact={impact} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
