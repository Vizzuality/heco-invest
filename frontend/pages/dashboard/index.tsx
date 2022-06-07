import { PlusCircle as PlusCircleIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Table from 'containers/dashboard/table';

import Button from 'components/button';
import Head from 'components/head';
import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';
import { Paths } from 'enums';
import DashboardLayout, { DashboardLayoutProps } from 'layouts/dashboard';
import { PageComponent } from 'types';

export async function getStaticProps(ctx) {
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
    },
  };
}

type DashboardPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const DashboardPage: PageComponent<DashboardPageProps, DashboardLayoutProps> = () => {
  return (
    <>
      <Head />
      <div className="pt-20 bg-green-dark">
        <LayoutContainer className="h-20">
          <div className="relative h-full">
            <Button
              theme="primary-white"
              to={Paths.ProjectCreation}
              className="absolute right-0 -translate-y-1/2 top-full"
            >
              <Icon icon={PlusCircleIcon} className="w-5 h-5 mr-2" aria-hidden />
              <FormattedMessage defaultMessage="Create project" id="VUN1K7" />
            </Button>
          </div>
        </LayoutContainer>
      </div>
      <LayoutContainer className="py-20">
        <Table />
      </LayoutContainer>
    </>
  );
};

DashboardPage.layout = {
  Component: DashboardLayout,
  props: {
    headerProps: {
      transparent: true,
    },
  },
};

export default DashboardPage;
