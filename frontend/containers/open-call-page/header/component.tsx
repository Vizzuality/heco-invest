import { FC, useMemo, useState } from 'react';

import { Heart } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { useRouter } from 'next/router';

import dayjs from 'dayjs';

import { translatedLanguageNameForLocale } from 'helpers/intl';

import Breadcrumbs from 'containers/breadcrumbs';
import OpenCallApplicationModal from 'containers/open-call-application-modal';
import ShareIcons from 'containers/share-icons';

import Button from 'components/button';
import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';
import { Languages, OpenCallStatus, UserRoles } from 'enums';
import languages from 'locales.config.json';

import { useAccount } from 'services/account';
import { useFavoriteOpenCall } from 'services/open-call/open-call-service';

import OpenCallChart from '../chart';

import { OpenCallHeaderProps } from '.';

export const OpenCallHeader: FC<OpenCallHeaderProps> = ({ openCall, instrumentTypes }) => {
  const intl = useIntl();
  const { locale } = useRouter();
  const favoriteOpenCall = useFavoriteOpenCall();
  const { userAccount } = useAccount();

  const [showApplicationModal, setShowApplicationModal] = useState<boolean>(false);

  const {
    id,
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
    language || (languages.locales.find((locale) => locale.default)?.locale as Languages);

  const openCallRange = useMemo(() => {
    const openDate = dayjs(created_at);
    const closingDate = dayjs(closing_at);
    const deadline = closingDate.locale(locale).format('DD MMM YYYY');
    // total duration of the open call in days
    const duration = closingDate.diff(openDate, 'day');
    // remaining days of the open call. Difference between today and the open call ending date in days + 1.
    const remaining = closingDate.diff(dayjs(), 'day') + 1;
    // consumed days of the open call
    const consumed = duration - remaining - 1;
    return { consumed, remaining, deadline };
  }, [closing_at, created_at, locale]);

  const handleFavoriteClick = () => {
    // This mutation uses a 'DELETE' request when the isFavorite is true, and a 'POST' request when is false.
    favoriteOpenCall.mutate({ id, isFavourite: favourite });
  };

  return (
    <>
      <LayoutContainer className="-mt-10 md:mt-0 sm:-mt-16">
        <Breadcrumbs
          className="sm:px-6"
          substitutions={{
            id: { name },
          }}
        />
        <div className="mt-4">
          <div
            className="flex items-end bg-center bg-cover sm:mx-0 rounded-2xl bg-radial-green-dark bg-green-dark min-h-[250px] sm:min-h-[372px]"
            style={{
              ...(coverImage && { backgroundImage: `url(${coverImage})` }),
            }}
          >
            <LayoutContainer>
              <div className="mb-8 text-center sm:w-1/2 sm:text-left">
                <h1 className="font-serif text-2xl text-white sm:text-4xl">{name}</h1>
              </div>
            </LayoutContainer>
          </div>
          <LayoutContainer className="flex flex-col justify-between mt-8 sm:flex-row">
            <div className="w-full sm:w-6/12 sm:pr-2">
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
              <p>{openCall.description}</p>
            </div>
            <div className="mb-10 flex flex-col justify-start sm:mr-4 p-6 bg-white drop-shadow-xl sm:mb-[-70%] h-full sm:w-[395px] sm:translate-y-[-70%] sm:max-w-1/3 rounded-2xl mt-8 sm:mt-0">
              <div className="px-2">
                <div className="flex flex-col gap-8 sm:gap-11 sm:flex-row sm:justify-between">
                  <div className="flex flex-col items-center justify-end gap-2 sm:items-start">
                    <span
                      aria-labelledby="open-call-value"
                      className="text-xl font-semibold leading-6"
                    >
                      ${maximum_funding_per_project.toLocaleString(locale)}
                    </span>
                    <span id="open-call-value" className="leading-4 text-gray-400">
                      <FormattedMessage defaultMessage="Value" id="GufXy5" />
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-end gap-2 sm:items-start">
                    <div className="max-w-full text-center sm:text-left">
                      {instrumentTypes?.map((type) => {
                        return (
                          <p
                            aria-labelledby="block open-call-instrument-types"
                            key={type}
                            className="text-xl font-semibold leading-6 whitespace-nowrap"
                          >
                            {type}
                          </p>
                        );
                      })}
                    </div>
                    <span id="open-call-instrument-types" className="leading-4 text-gray-400">
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
                <hr className="my-4" />
                <div className="flex flex-col justify-between gap-8 sm:flex-row sm:gap-11">
                  <div className="flex flex-col items-center justify-center gap-2 mb-6 sm:items-start">
                    <span
                      id="total-of-projects"
                      className={cx('text-xl font-semibold leading-6', {
                        'text-black': status !== OpenCallStatus.Closed,
                        'text-gray-600': status === OpenCallStatus.Closed,
                      })}
                    >
                      {openCallRange.deadline}
                    </span>
                    <span aria-labelledby="total-of-projects" className="leading-4 text-gray-400">
                      <FormattedMessage defaultMessage="Deadline" id="8/Da7A" />
                    </span>
                  </div>
                  {openCallRange.remaining <= 8 && (
                    <div className="flex flex-col items-center justify-end gap-2 mb-4 text-center">
                      <div className="w-[82px] h-[82px] rounded-full flex justify-center items-center">
                        <OpenCallChart openCallRange={openCallRange} />
                        <p className="absolute max-w-[62px] text-xs font-semibold text-green-dark">
                          {status !== OpenCallStatus.Closed ? (
                            <FormattedMessage defaultMessage="Ending soon" id="8mCCtS" />
                          ) : (
                            <FormattedMessage defaultMessage="Closed" id="Fv1ZSz" />
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-center gap-4 sm:gap-2 sm:flex-row">
                <Button
                  className="justify-center"
                  theme="secondary-green"
                  onClick={handleFavoriteClick}
                  disabled={!userAccount}
                  aria-pressed={favourite}
                >
                  <Icon icon={Heart} className={cx('w-4 mr-3', { 'fill-green-dark': favourite })} />
                  <FormattedMessage defaultMessage="Favorite" id="5Hzwqs" />
                </Button>
                <Button
                  className="justify-center flex-grow"
                  disabled={
                    !userAccount ||
                    userAccount.type !== UserRoles.ProjectDeveloper ||
                    status !== OpenCallStatus.Launched
                  }
                  theme="primary-green"
                  onClick={() => setShowApplicationModal(true)}
                >
                  <FormattedMessage defaultMessage="Apply now" id="VR4TEV" />
                </Button>
              </div>
              <ShareIcons title={name} />
            </div>
          </LayoutContainer>
        </div>
      </LayoutContainer>
      <OpenCallApplicationModal
        openCallId={id}
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
      />
    </>
  );
};

export default OpenCallHeader;
