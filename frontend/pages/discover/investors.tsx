import { groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';

import DiscoverPageLayout, { DiscoverPageLayoutProps } from 'layouts/discover-page';
import { PageComponent } from 'types';
import { GroupedEnums as GroupedEnumsType } from 'types/enums';

import { getEnums } from 'services/enums/enumService';

export const getServerSideProps = async ({ locale }) => {
  const enums = await getEnums();

  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      enums: groupBy(enums, 'type'),
    },
  };
};

type InvestorsPageProps = {
  enums: GroupedEnumsType;
};

const InvestorsPage: PageComponent<InvestorsPageProps, DiscoverPageLayoutProps> = ({ enums }) => {
  return (
    <div className="flex w-full gap-5">
      <span>Page: Investors</span>
    </div>
  );
};

InvestorsPage.layout = {
  Component: DiscoverPageLayout,
};

export default InvestorsPage;
