import { withLocalizedRequests } from 'hoc/locale';

import { groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';

import DiscoverPageLayout, { DiscoverPageLayoutProps } from 'layouts/discover-page';
import { PageComponent } from 'types';
import { GroupedEnums as GroupedEnumsType } from 'types/enums';

import { getEnums } from 'services/enums/enumService';

export const getServerSideProps = withLocalizedRequests(async ({ locale }) => {
  const enums = await getEnums();

  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      enums: groupBy(enums, 'type'),
    },
  };
});

type OpenCallsPageProps = {
  enums: GroupedEnumsType;
};

const OpenCallsPage: PageComponent<OpenCallsPageProps, DiscoverPageLayoutProps> = ({ enums }) => {
  return (
    <div className="flex w-full gap-5">
      <span>Page: OpenCalls</span>
    </div>
  );
};

OpenCallsPage.layout = {
  Component: DiscoverPageLayout,
};

export default OpenCallsPage;
