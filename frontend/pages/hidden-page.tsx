import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { GetServerSideProps } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import AccountDeleted from 'containers/account-deleted';

import { Paths } from 'enums';
import { PageComponent } from 'types';

const HIDDEN_PAGES = [
  Paths.AccountDeleted,
  // Future pages here
].map((path) => path.toString());

export const getServerSideProps = withLocalizedRequests<GetServerSideProps>(
  async ({ locale, query }) => {
    // Verify that a `page` query param was passed, and that the page requested is one we have defined
    if (!query?.page || !HIDDEN_PAGES.includes(query?.page as string)) return { notFound: true };

    return {
      props: {
        intlMessages: await loadI18nMessages({ locale }),
        page: query?.page,
      },
    };
  }
);

type HiddenPagesPageProps = {
  page: string;
};

const HiddenPagesPage: PageComponent<HiddenPagesPageProps> = ({ page }) => {
  switch (page) {
    case Paths.AccountDeleted:
      return <AccountDeleted />;
  }

  return null;
};

HiddenPagesPage.layout = {
  props: {
    mainProps: {
      topMargin: false,
    },
    footerProps: {
      className: 'mt-0',
    },
  },
};

export default HiddenPagesPage;
