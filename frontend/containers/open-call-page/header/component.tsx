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
    const deadline = closingDate.format('DD MMM YYYY');
    // total duration of the open call in days
    const duration = closingDate.diff(openDate, 'day');
    // remaining days of the open call. Difference between today and the open call ending date in days + 1.
    const remaining = closingDate.diff(dayjs(), 'day') + 1;
    // consumed days of the open call
    const consumed = duration - remaining - 1;
    return { consumed, remaining, deadline };
  }, [closing_at, created_at]);

  const handleFavoriteClick = () => {
    // This mutation uses a 'DELETE' request when the isFavorite is true, and a 'POST' request when is false.
    favoriteOpenCall.mutate({ id, isFavourite: favourite });
  };

  return (
    <>
      <LayoutContainer className="px-0 -mt-10 lg:-mt-16">
        <Breadcrumbs
          className="lg:px-6"
          substitutions={{
            id: { name },
          }}
        />
        <div className="mt-4">
          <div
            className="flex pt-10 lg:pt-0 lg:items-end bg-center bg-cover lg:mx-0 sm:rounded-2xl bg-radial-green-dark bg-green-dark min-h-[250px] lg:min-h-[372px]"
            style={{
              ...(coverImage && { backgroundImage: `url(${coverImage})` }),
            }}
          >
            <LayoutContainer>
              <div className="text-center lg:mb-8 lg:w-1/2 lg:text-left">
                <h1 className="font-serif text-3xl text-white lg:text-4xl">
                  This is the open call title(engaging and descriptive)
                </h1>
              </div>
              <div className="h-32 lg:hidden"></div>
            </LayoutContainer>
          </div>
          <LayoutContainer className="flex flex-col justify-between mt-8 lg:flex-row">
            <div className="order-2 w-full lg:order-1 lg:w-6/12 lg:pr-2">
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
            <div className="order-1 lg:order-2 flex flex-col justify-start lg:mr-4 p-6 bg-white drop-shadow-xl -mb-12 h-full lg:w-[395px] -translate-y-32 lg:max-w-1/3 rounded-2xl">
              <div className="px-2">
                <div className="flex flex-wrap justify-center gap-8 lg:gap-11 lg:justify-between">
                  <div className="flex flex-col items-center justify-end gap-2 lg:items-start">
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
                  <div className="flex flex-col items-center justify-end gap-2 lg:items-start">
                    <div className="max-w-full text-center lg:text-left">
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
                <div
                  className={cx('flex gap-8 lg:gap-11', {
                    'justify-center lg:justify-between': openCallRange.remaining > 8,
                    'justify-between': openCallRange.remaining <= 8,
                  })}
                >
                  <div className="flex flex-col items-center justify-center gap-2 mb-6 lg:items-start">
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
                    <div className="flex flex-col items-center gap-2 mb-4 text-center lg:justify-end">
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

              <div className="flex justify-center gap-4 lg:gap-2 ">
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
