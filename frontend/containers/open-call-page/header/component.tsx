import { FC, useMemo } from 'react';

import { Heart } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { useRouter } from 'next/router';

import dayjs from 'dayjs';

import { translatedLanguageNameForLocale } from 'helpers/intl';

import Breadcrumbs from 'containers/breadcrumbs';
import ShareIcons from 'containers/share-icons';

import Button from 'components/button';
import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';
import { Languages, OpenCallStatus } from 'enums';
import { locales } from 'locales.config.json';

import OpenCallChart from '../chart';

import { OpenCallHeaderProps } from '.';

export const OpenCallHeader: FC<OpenCallHeaderProps> = ({
  openCall,
  instrumentTypes,
  handleFavorite,
  handleApply,
}) => {
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
    status,
    favourite,
  } = openCall;
  const coverImage = picture?.medium;
  const originalLanguage =
    language || (locales.find((locale) => locale.default)?.locale as Languages);

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
      <div className="mt-4">
        <div
          className="flex items-end mx-4 bg-center bg-cover lg:mx-0 rounded-2xl bg-radial-green-dark bg-green-dark min-h-[250px] lg:min-h-[372px]"
          style={{
            ...(coverImage && { backgroundImage: `url(${coverImage})` }),
          }}
        >
          <LayoutContainer>
            <div className="mb-8 text-center lg:w-1/2 lg:text-left">
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
          </div>
          <div className="flex flex-col justify-start lg:mr-4 p-6 bg-white drop-shadow-xl lg:mb-[-70%] h-full lg:translate-y-[-70%] lg:max-w-1/3 rounded-2xl mt-8 lg:mt-0">
            <>
              <div className="flex flex-col gap-8 pl-2 sm:flex-row">
                <div className="flex flex-col items-center justify-end w-full gap-2 sm:items-start sm:w-1/3">
                  <span aria-labelledby="open-call-value" className="text-2xl font-semibold">
                    ${maximum_funding_per_project.toLocaleString(locale)}
                  </span>
                  <span id="open-call-value" className="text-gray-400">
                    <FormattedMessage defaultMessage="Value" id="GufXy5" />
                  </span>
                </div>
                <div className="flex flex-col items-center justify-end w-full gap-2 sm:items-end sm:w-2/3">
                  <div className="max-w-full text-center sm:text-right">
                    {instrumentTypes?.map((type) => {
                      return (
                        <p
                          aria-labelledby="block open-call-instrument-types"
                          key={type}
                          className={cx('font-semibold whitespace-nowrap', {
                            'text-2xl': instrument_types.length === 1,
                            'text-[26px]': instrument_types.length > 1,
                          })}
                        >
                          {type}
                        </p>
                      );
                    })}
                  </div>
                  <span id="open-call-instrument-types" className="text-gray-400">
                    <FormattedMessage
                      defaultMessage="{numInstrumentTypes, plural, one {Instrument type} other {Instrument types}}"
                      id="eFJIPT"
                      values={{
                        numInstrumentTypes: instrument_types?.length || 0,
                      }}
                    />
                  </span>
                </div>
              </div>
              <hr className="mt-6 mb-8" />
              <div className="flex flex-col justify-between pl-2 sm:flex-row min-w-[395px] gap-y-8">
                <div className="flex flex-col items-center justify-end w-full gap-2 sm:w-2/3 sm:items-start">
                  <span id="total-of-projects" className="text-2xl font-semibold text-gray-700">
                    {openCallRange.deadline}
                  </span>
                  <span aria-labelledby="total-of-projects" className="text-gray-400">
                    <FormattedMessage defaultMessage="Deadline" id="8/Da7A" />
                  </span>
                </div>
                <div className="flex flex-col items-center justify-end w-full gap-2 text-center sm:w-1/3">
                  <div className="w-[82px] h-[82px] rounded-full flex justify-center items-center">
                    <OpenCallChart openCallRange={openCallRange} />
                    <p className="absolute max-w-[62px] text-xs font-semibold text-green-dark">
                      {status === OpenCallStatus.Launched ? (
                        <FormattedMessage defaultMessage="Ending soon" id="8mCCtS" />
                      ) : (
                        <FormattedMessage defaultMessage="Closed" id="Fv1ZSz" />
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </>

            <div className="flex flex-col justify-between gap-4 lg:flex-row mt-7">
              <Button
                className="justify-center"
                theme="secondary-green"
                onClick={handleFavorite}
                disabled
                aria-pressed={favourite}
              >
                <Icon icon={Heart} className={cx('w-4 mr-3', { 'fill-green-dark': favourite })} />
                <FormattedMessage defaultMessage="Favorite" id="5Hzwqs" />
              </Button>
              <Button
                className="w-full lg:max-w-[200px] justify-center"
                theme="primary-green"
                onClick={handleApply}
                disabled
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