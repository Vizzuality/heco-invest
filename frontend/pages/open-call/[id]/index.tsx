import { FormattedMessage, useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';

import OpenCallHeader from 'containers/open-call-page/open-call-header';
import Overview from 'containers/project-page/overview';
import SDGs from 'containers/sdgs';

import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';
import { GroupedEnums } from 'types/enums';
import { OpenCall } from 'types/open-calls';

import { getEnums } from 'services/enums/enumService';
import { getOpenCall } from 'services/open-call/open-call-service';

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

  const { instrument_type: allInstrumentTypes, sdg: allSdgs } = enums;

  return (
    <>
      <Head title={name} description={description} />
      <OpenCallHeader openCall={openCall} instrumentTypeEnums={allInstrumentTypes} />
      {/* <Overview openCall={openCall} /> */}

      <LayoutContainer layout="narrow" className="mt-24 mb-20 md:mt-40">
        <section aria-labelledby="profile-investment-info">
          <h2
            id="profile-investment-info"
            className="mt-12 font-serif text-2xl font-semibold md:mt-20 sm:text-3xl text-green-dark"
          >
            <FormattedMessage defaultMessage="Investment info" id="m3Dnav" />
          </h2>

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
