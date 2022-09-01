import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { groupBy } from 'lodash-es';
import { GetServerSideProps } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import {
  OpenCallHeader,
  OpenCallOverview,
  OpenCallFundingInformation,
  OpenCallInvestorAndFooter,
} from 'containers/open-call-page';

import Head from 'components/head';
import Loading from 'components/loading';
import { Paths } from 'enums';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';
import { GroupedEnums } from 'types/enums';
import { OpenCall } from 'types/open-calls';

import { getEnums } from 'services/enums/enumService';
import { getOpenCall, useOpenCall } from 'services/open-call/open-call-service';

const OPEN_CALL_QUERY_PARAMS = {
  includes: ['country', 'municipality', 'department', 'investor'],
};

export const getServerSideProps = withLocalizedRequests<GetServerSideProps>(
  async ({ params: { id }, locale, query }) => {
    let openCall: OpenCall = null;
    let enums;

    // If getting the project fails, it's most likely because the record has not been found. Let's return a 404. Anything else will trigger a 500 by default.
    try {
      enums = await getEnums();
      openCall = await getOpenCall(id as string, OPEN_CALL_QUERY_PARAMS);
    } catch (e) {
      // If getting the open call fails, it's most likely because the record has not been found.
      if (query?.preview) {
        // The user is attempting to preview a drafted open call, which the endpoint won't return
        // unless the ownership can be verified. We'll be loading it client side.
        openCall = null;
      } else {
        // Not previewing a drafted open call and open call doesn't exist. Return a 404.
        return { notFound: true };
      }
    }

    return {
      props: {
        intlMessages: await loadI18nMessages({ locale }),
        enums: groupBy(enums, 'type'),
        openCall,
      },
    };
  }
);

type OpenCallPageProps = {
  openCall: OpenCall;
  enums: GroupedEnums;
};

const OpenCallPage: PageComponent<OpenCallPageProps, StaticPageLayoutProps> = ({
  openCall: openCallProp,
  enums,
}) => {
  const router = useRouter();

  const { data: openCall, isFetching: isFetchingOpenCall } = useOpenCall(
    router.query.id as string,
    OPEN_CALL_QUERY_PARAMS,
    openCallProp
  );

  if (!openCall) {
    if (!isFetchingOpenCall) router.push(Paths.Dashboard);
    return (
      <div className="flex items-center justify-center min-h-screen -mt-28 md:-mt-36 lg:-mt-44">
        <Loading visible={true} iconClassName="w-10 h-10" />
      </div>
    );
  }

  const { instrument_type: allInstrumentTypes, sdg: allSdgs } = enums;

  const instrumentTypeNames = openCall?.instrument_types?.map(
    (instrumentType) => allInstrumentTypes.find((type) => type.id === instrumentType).name
  );

  return (
    <div>
      <Head title={openCall.name} description={openCall.description} />
      <OpenCallHeader openCall={openCall} instrumentTypes={instrumentTypeNames} />
      <OpenCallOverview openCall={openCall} />
      <OpenCallFundingInformation
        instrumentTypes={instrumentTypeNames}
        openCall={openCall}
        allSdgs={allSdgs}
      />
      <OpenCallInvestorAndFooter openCall={openCall} />
    </div>
  );
};

OpenCallPage.layout = {};

export default OpenCallPage;
