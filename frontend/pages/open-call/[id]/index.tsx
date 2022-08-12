import { useMemo, useState } from 'react';

import { Doughnut } from 'react-chartjs-2';
import { Heart } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { Chart as ChartJS, ArcElement, Plugin } from 'chart.js';
import { AnyObject } from 'chart.js/types/basic';
import dayjs from 'dayjs';
import { groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';
import { translatedLanguageNameForLocale } from 'helpers/intl';

import Breadcrumbs from 'containers/breadcrumbs';
import SDGs from 'containers/sdgs';
import ShareIcons from 'containers/share-icons';

import Button from 'components/button';
import Head from 'components/head';
import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';
import { GroupedEnums } from 'types/enums';
import { OpenCall } from 'types/open-calls';

import { getEnums } from 'services/enums/enumService';
import { getOpenCall } from 'services/open-call/open-call-service';
import Overview from 'containers/project-page/overview';

ChartJS.register(ArcElement);

export const getServerSideProps = withLocalizedRequests(async ({ params: { id }, locale }) => {
  let openCall = null;

  // If getting the project fails, it's most likely because the record has not been found. Let's return a 404. Anything else will trigger a 500 by default.
  try {
    openCall = await getOpenCall(id as string);
  } catch (e) {
    return { notFound: true };
  }

  const enums = await getEnums();

  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      enums: groupBy(enums, 'type'),
      openCall,
    },
  };
});

type OpenCallPageProps = {
  openCall: OpenCall;
  enums: GroupedEnums;
};

const OpenCallPage: PageComponent<OpenCallPageProps, StaticPageLayoutProps> = ({
  openCall,
  enums,
}) => {
  const intl = useIntl();
  const { locale } = useRouter();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  // const favoriteOpenCall = useFavoriteOpenCall();

  const {
    name,
    description,
    picture,
    instrument_types,
    sdgs,
    language,
    closing_at,
    created_at,
    maximum_funding_per_project,
  } = openCall;

  const {
    ticket_size: allTicketSizes,
    instrument_type: allInstrumentTypes,
    impact: allImpacts,
    investor_type: allInvestorTypes,
    sdg: allSdgs,
  } = enums;

  const coverImage = picture?.medium || '/images/avatar.svg';
  const originalLanguage = language || 'es';
  const totalProjects = 0;

  // const handleFavoriteClick = () => {
  //   // This mutation uses a 'DELETE' request when the isFavorite is true, and a 'POST' request when is false.
  //   favoriteOpenCall.mutate({ id: openCall.id, isFavourite: openCall.favourite });
  // };

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
    <>
      <Head title={name} description={description} />

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
                            {allInstrumentTypes.find((instrument) => instrument.id === type)?.name}
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
                        <Doughnut
                          options={{
                            cutout: '83%',
                          }}
                          data={{
                            datasets: [
                              {
                                data: [openCallRange.remaining, openCallRange.consumed],
                                backgroundColor: ['#CFD762', '#E3DED6'],
                              },
                            ],
                            labels: ['Funded', 'Remaining'],
                          }}
                        />
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
                <Button
                  className="justify-center"
                  theme="secondary-green"
                  // onClick={onFavoriteClick}
                  // disabled={!user || favoriteLoading}
                  aria-pressed={isFavorite}
                >
                  <Icon
                    icon={Heart}
                    className={cx('w-4 mr-3', { 'fill-green-dark': isFavorite })}
                  />
                  <FormattedMessage defaultMessage="Favorite" id="5Hzwqs" />
                </Button>
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

      <Overview openCall={openCall} />

      <LayoutContainer layout="narrow" className="mt-24 mb-20 md:mt-40">
        <section aria-labelledby="profile-investment-info">
          <h2
            id="profile-investment-info"
            className="mt-12 font-serif text-2xl font-semibold md:mt-20 sm:text-3xl text-green-dark"
          >
            <FormattedMessage defaultMessage="Investment info" id="m3Dnav" />
          </h2>

          {/* <TagsGrid className="mt-10 md:mt-14" rows={tagsGridRows} /> */}

          {!!sdgs && (
            <>
              <h3 className="mt-10 mb-3 text-xl font-semibold md:mt-14">
                <FormattedMessage defaultMessage="SDG's" id="d3TPmn" />
              </h3>
              <SDGs
                className="my-3"
                sdgs={allSdgs.filter(({ id }) => sdgs?.includes(Number(id)))}
              />
            </>
          )}

          {/* {!!mission && (
            <>
              <h3 className="mt-10 mb-3 text-xl font-semibold md:mt-14">
                <FormattedMessage defaultMessage="Mission" id="RXoqkD" />
              </h3>
              <p className="my-3">{mission}</p>
            </>
          )}

          {!!prioritized_projects_description && (
            <>
              <h3 className="mt-10 mb-3 text-xl font-semibold md:mt-14">
                <FormattedMessage defaultMessage="Type of prioritized projects" id="5y6ZTQ" />
              </h3>
              <p className="my-3">{prioritized_projects_description}</p>
            </>
          )}
          <h3 className="mt-10 mb-3 text-xl font-semibold md:mt-14">
            <FormattedMessage defaultMessage="Other information" id="kX7oGR" />
          </h3>
          <p className="my-3">{other_information}</p> */}
        </section>
      </LayoutContainer>
    </>
  );
};

OpenCallPage.layout = {};

export default OpenCallPage;
