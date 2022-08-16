import { FC, useMemo } from 'react';

// import { Heart } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { useRouter } from 'next/router';

import dayjs from 'dayjs';

import { translatedLanguageNameForLocale } from 'helpers/intl';

import Breadcrumbs from 'containers/breadcrumbs';
import description from 'containers/for-public-pages/description';
import ShareIcons from 'containers/share-icons';

import Button from 'components/button';
// import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';

import OpenCallChart from '../open-call-chart';

import { OpenCallHeaderProps } from '.';

export const OpenCallHeader: FC<OpenCallHeaderProps> = ({ openCall, instrumentTypeEnums }) => {
  const intl = useIntl();
  const { locale } = useRouter();
  const {
    name,
    instrument_types,
    maximum_funding_per_project,
    picture,
    language,
    created_at,
    closing_at,
  } = openCall;
  const coverImage = picture?.medium || '/images/avatar.svg';
  const originalLanguage = language || 'es';
  const totalProjects = 0;

  const openCallRange = useMemo(() => {
    const openDate = dayjs(created_at);
    const closingDate = dayjs(closing_at);
    const deadline = closingDate.format('DD MMM YYYY');
    // total duration of the open call in days
    const duration = closingDate.diff(openDate, 'day');
    // remaining days of the open call. Difference between today and the open call ending date in days
    const remaining = closingDate.diff(dayjs(), 'day');
    // consumed days of the open call
    const consumed = duration - remaining;
    return { consumed, remaining, deadline };
  }, [closing_at, created_at]);

  return (
    <LayoutContainer className="-mt-10 md:mt-0 lg:-mt-16">
      <Breadcrumbs
        className="px-4 sm:px-6 lg:px-8"
        substitutions={{
          id: { name },
        }}
      />

      <div className="">
        <div
          className="mx-4 bg-center bg-cover lg:mx-0 rounded-2xl bg-radial-green-dark bg-green-dark"
          style={{
            ...(coverImage && { backgroundImage: `url(${coverImage})` }),
          }}
        >
          <LayoutContainer>
            <div className="-mb-2 text-center lg:mb-4 lg:text-left min-h-[200px] xl:min-h-[372px]">
              <h1 className="font-serif text-3xl text-white">{name}</h1>
            </div>
          </LayoutContainer>
        </div>
        <LayoutContainer className="flex flex-col justify-between mt-8 lg:flex-row">
          <div className="w-full lg:w-6/12">
            {originalLanguage && (
              <span className="block mb-4 text-sm text-gray-400">
                <FormattedMessage
                  defaultMessage="Note: The content of this page was originally written in <span>{language}</span>."
                  id="zXxFL9"
                  values={{
                    language: translatedLanguageNameForLocale(intl, originalLanguage),
                    span: (chunks: string) => <span className="underline">{chunks}</span>,
                  }}
                />
              </span>
            )}
            <p>{description}</p>
          </div>
          <div className="flex flex-col justify-start lg:mr-4 p-6 bg-white drop-shadow-xl lg:mb-[-70%] h-full lg:translate-y-[-70%] lg:max-w-4/12 rounded-2xl mt-8 lg:mt-0">
            {typeof totalProjects === 'number' && (
              <>
                <div className="flex flex-col gap-8 pl-2 md:flex-row">
                  <div className="flex flex-col justify-end w-full gap-2 md:min-w-1/3">
                    <span aria-labelledby="open-call-value" className="text-2xl font-semibold">
                      ${maximum_funding_per_project.toLocaleString(locale)}
                    </span>
                    <span id="open-call-value" className="text-gray-400">
                      <FormattedMessage defaultMessage="Value" id="GufXy5" />
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-end w-full gap-2 text-center md:min-w-2/3">
                    {instrument_types?.map((type) => {
                      return (
                        <span
                          aria-labelledby="open-call-instrument-types"
                          key={type}
                          className={cx('font-semibold', {
                            'text-2xl': instrument_types.length === 1,
                            'text-lg': instrument_types.length > 1,
                          })}
                        >
                          {instrumentTypeEnums.find((instrument) => instrument.id === type)?.name}
                        </span>
                      );
                    })}
                    <span id="open-call-instrument-type" className="text-gray-400">
                      <FormattedMessage
                        defaultMessage="Instrument {numInstrumentTypes, plural, one {type} other {types}}"
                        id="OTKLo8"
                        values={{
                          numInstrumentTypes: instrument_types?.length || 0,
                        }}
                      />
                    </span>
                  </div>
                </div>
                <hr className="mt-6 mb-8" />
                <div className="flex flex-col gap-8 pl-2 sm:flex-row">
                  <div className="flex flex-col gap-2 sm:min-w-2/3">
                    <span id="total-of-projects" className="text-2xl font-semibold text-gray-700">
                      {openCallRange.deadline}
                    </span>
                    <span aria-labelledby="total-of-projects" className="text-gray-400">
                      <FormattedMessage defaultMessage="Deadline" id="8/Da7A" />
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center sm:min-w-1/3">
                    <div className="w-[82px] h-[82px] rounded-full flex justify-center items-center">
                      <OpenCallChart openCallRange={openCallRange} />
                      <p className="absolute max-w-[62px] text-xs font-semibold text-green-dark">
                        {!!openCallRange.remaining ? (
                          <FormattedMessage defaultMessage="Ending soon" id="8mCCtS" />
                        ) : (
                          <FormattedMessage defaultMessage="Open call ended" id="vZgJJu" />
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="flex flex-col justify-between gap-4 lg:flex-row mt-7">
              {/* <Button
                className="justify-center"
                theme="secondary-green"
                // onClick={onFavoriteClick}
                // disabled={!user || favoriteLoading}
                aria-pressed={isFavorite}
              >
                <Icon icon={Heart} className={cx('w-4 mr-3', { 'fill-green-dark': isFavorite })} />
                <FormattedMessage defaultMessage="Favorite" id="5Hzwqs" />
              </Button> */}
              <Button
                className="w-full lg:max-w-[200px] justify-center"
                theme="primary-green"
                onClick={() => console.log('apply')}
              >
                <FormattedMessage defaultMessage="Apply now" id="VR4TEV" />
              </Button>
            </div>
            <ShareIcons title={name} />
          </div>
        </LayoutContainer>
      </div>
    </LayoutContainer>
  );
};

export default OpenCallHeader;
