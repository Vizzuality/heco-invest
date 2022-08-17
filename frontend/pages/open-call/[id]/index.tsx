import { useRef } from 'react';

import { withLocalizedRequests } from 'hoc/locale';

import { groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';

import {
  OpenCallHeader,
  OpenCallOverview,
  OpenCallFundingInformation,
  OpenCallInvestorAndFooter,
  OpenCallSectionLinks,
} from 'containers/open-call-page';

import Head from 'components/head';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';
import { GroupedEnums } from 'types/enums';
import { OpenCall } from 'types/open-calls';

import { getEnums } from 'services/enums/enumService';
import { getOpenCall, useOpenCall } from 'services/open-call/open-call-service';

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
  openCall: openCallProp,
  enums,
}) => {
  const { openCall } = useOpenCall(openCallProp.id, openCallProp);

  const { name, description, instrument_types } = openCall;

  const { instrument_type: allInstrumentTypes, sdg: allSdgs } = enums;

  const instrumentTypeNames = instrument_types?.map(
    (instrumentType) => allInstrumentTypes.find((type) => type.id === instrumentType).name
  );

  const fundingRef = useRef(null);
  const overviewRef = useRef(null);
  const impactRef = useRef(null);
  const investorRef = useRef(null);

  // To implement
  const handleFavorite = () => {};

  // To implement
  const handleApply = () => {};

  return (
    <div>
      <Head title={name} description={description} />
      <OpenCallHeader
        openCall={openCall}
        instrumentTypes={instrumentTypeNames}
        handleFavorite={handleFavorite}
        handleApply={handleApply}
      />
      <OpenCallSectionLinks
        investorRef={investorRef}
        fundingRef={fundingRef}
        overviewRef={overviewRef}
        impactRef={impactRef}
      />
      <OpenCallOverview overviewRef={overviewRef} openCall={openCall} />
      <OpenCallFundingInformation
        instrumentTypes={instrumentTypeNames}
        openCall={openCall}
        allSdgs={allSdgs}
        fundingRef={fundingRef}
        impactRef={impactRef}
      />
      <OpenCallInvestorAndFooter
        investorRef={investorRef}
        investor={openCall?.investor}
        handleFavorite={handleFavorite}
        handleApply={handleApply}
      />
    </div>
  );
};

OpenCallPage.layout = {};

export default OpenCallPage;
