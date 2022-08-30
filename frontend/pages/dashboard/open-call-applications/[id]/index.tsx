import { useMemo, useState } from 'react';

import { ExternalLink as ExternalLinkIcon, X as XIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import dayjs from 'dayjs';
import { groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';
import { useGetAlert } from 'helpers/pages';

import Alert from 'components/alert';
import Button from 'components/button';
import ConfirmationPrompt from 'components/confirmation-prompt';
import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { Paths, UserRoles } from 'enums';
import DashboardLayout, { DashboardLayoutProps } from 'layouts/dashboard';
import NakedLayout from 'layouts/naked';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';
import { GroupedEnums as GroupedEnumsType } from 'types/enums';

import { getEnums } from 'services/enums/enumService';
import {
  useOpenCallApplication,
  useDeleteOpenCallApplication,
} from 'services/open-call/application-service';

const SECTION_CLASSNAMES = 'break-all';
const TITLE_CLASSNAMES = 'mb-5 mt-3 text-gray-600';
const GRID_CLASSNAMES = 'grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-y-4';
const LABEL_CLASSNAMES = 'flex items-center text-sm font-semibold text-gray-800';
const LINK_CLASSNAMES =
  'inline-flex gap-2 px-2 -mx-2 underline rounded-full text-green-dark focus-visible:outline focus-visible:outline-green-dark focus-visible:outline-2 focus-visible:outline-offset-2';

export const getServerSideProps = withLocalizedRequests(async ({ locale }) => {
  const enums = await getEnums();

  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
      enums: groupBy(enums, 'type'),
    },
  };
});

type OpenCallDetailsPageProps = {
  enums: GroupedEnumsType;
};

export const OpenCallDetailsPage: PageComponent<OpenCallDetailsPageProps, DashboardLayoutProps> = ({
  enums,
}) => {
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState<boolean>(false);

  const intl = useIntl();
  const router = useRouter();

  const deleteOpenCallApplicationMutation = useDeleteOpenCallApplication();
  const alert = useGetAlert(deleteOpenCallApplicationMutation.error);

  const { data: openCallApplication, isLoading: isLoadingOpenCallApplication } =
    useOpenCallApplication(router.query.id as string, {
      includes: ['open_call', 'project', 'investor'],
    });

  const { open_call: openCall, investor, project } = openCallApplication || {};

  const instrumentTypesStr = useMemo(
    () =>
      (enums.instrument_type || [])
        ?.filter(({ id }) => (openCall?.instrument_types || [])?.includes(id))
        .map(({ name }, idx) => (idx === 0 ? name : name.toLowerCase()))
        .join(', '),
    [enums, openCall]
  );

  const closeConfirmDeleteModal = () => {
    deleteOpenCallApplicationMutation.reset();
    setConfirmDeleteModalOpen(false);
  };

  const handleDeletionConfirmation = () => {
    deleteOpenCallApplicationMutation.mutate(openCallApplication.id, {
      onSuccess: () => {
        closeConfirmDeleteModal();
        router.push(Paths.DashboardOpenCallApplications);
      },
    });
  };

  return (
    <ProtectedPage permissions={[UserRoles.ProjectDeveloper]}>
      <Head
        title={intl.formatMessage({ defaultMessage: 'My open call applications', id: '6EYInP' })}
      />
      <DashboardLayout isLoading={isLoadingOpenCallApplication}>
        <LayoutContainer layout="narrow">
          <div className="flex flex-col gap-4 p-6 break-all bg-white border rounded-lg lg:mt-4 lg:mb-14">
            <div className="flex flex-col items-center justify-between lg:flex-row">
              <span>
                <h1 className="text-xl font-semibold">{openCall?.name}</h1>
              </span>
              <span className="flex flex-col-reverse items-center gap-4 mt-2 lg:gap-2 lg:mt-0 lg:flex-row">
                <Button onClick={() => setConfirmDeleteModalOpen(true)}>
                  <FormattedMessage defaultMessage="Withdraw project" id="IysIYD" />
                </Button>
                <Link href={`${Paths.OpenCall}/${openCall?.slug}`}>
                  <a
                    className="flex gap-2 px-2 text-sm rounded-full text-green-dark focus-visible:outline focus-visible:outline-green-dark focus-visible:outline-2 focus-visible:outline-offset-2"
                    target="_blank"
                  >
                    <ExternalLinkIcon className="w-4 h-4 translate-y-px" />
                    <FormattedMessage defaultMessage="View public page" id="03HUos" />
                  </a>
                </Link>
              </span>
            </div>

            <div className={SECTION_CLASSNAMES}>
              <div className={TITLE_CLASSNAMES}>
                <FormattedMessage defaultMessage="Application details" id="QD4yJl" />
              </div>
              <div className={GRID_CLASSNAMES}>
                <span className={LABEL_CLASSNAMES}>
                  <FormattedMessage defaultMessage="Application date" id="kUEzKa" />
                </span>
                <span>{dayjs(openCallApplication?.created_at).format('DD MMM YYYY')}</span>
                <span className={LABEL_CLASSNAMES}>
                  <FormattedMessage defaultMessage="Project" id="k36uSw" />
                </span>
                <span>
                  <Link href={`${Paths.Project}/${project?.slug}`}>
                    <a className={LINK_CLASSNAMES} target="_blank">
                      {project?.name}
                    </a>
                  </Link>
                </span>
              </div>
              <div className="mt-4">
                <span className={LABEL_CLASSNAMES}>
                  <FormattedMessage defaultMessage="Message" id="T7Ry38" />
                </span>
                <span className="block mt-2">{openCallApplication?.message}</span>
              </div>
            </div>

            <div className={SECTION_CLASSNAMES}>
              <div className={TITLE_CLASSNAMES}>
                <FormattedMessage defaultMessage="Open call details" id="Yw0iXW" />
              </div>
              <div className={GRID_CLASSNAMES}>
                <span className={LABEL_CLASSNAMES}>
                  <FormattedMessage defaultMessage="Instrument type" id="fDd10o" />
                </span>
                <span>{instrumentTypesStr}</span>
                <span className={LABEL_CLASSNAMES}>
                  <FormattedMessage defaultMessage="Max. funding per project" id="AjUo5c" />
                </span>
                <span>${openCall?.maximum_funding_per_project?.toLocaleString(router.locale)}</span>
              </div>
            </div>

            <div className={SECTION_CLASSNAMES}>
              <div className={TITLE_CLASSNAMES}>
                <FormattedMessage defaultMessage="Investor contacts" id="ojuv8F" />
              </div>
              <div className={GRID_CLASSNAMES}>
                <span className={LABEL_CLASSNAMES}>
                  <FormattedMessage defaultMessage="Investor name" id="G6cbGp" />
                </span>
                <span>
                  <Link href={`${Paths.Investor}/${investor?.slug}`}>
                    <a className={LINK_CLASSNAMES} target="_blank">
                      {investor?.name}
                    </a>
                  </Link>
                </span>
                {investor?.contact_email && (
                  <>
                    <span className={LABEL_CLASSNAMES}>
                      <FormattedMessage defaultMessage="Investor email" id="cdeA3/" />
                    </span>
                    <span className="break">
                      <Link href={`mailto:${investor?.contact_email}`}>
                        <a className={LINK_CLASSNAMES} target="_blank">
                          {investor?.contact_email}
                        </a>
                      </Link>
                    </span>
                  </>
                )}
                {investor?.contact_phone && (
                  <>
                    <span className={LABEL_CLASSNAMES}>
                      <FormattedMessage defaultMessage="Investor phone" id="ew5vRN" />
                    </span>
                    <span>
                      <Link href={`tel:${investor?.contact_phone}`}>
                        <a className={LINK_CLASSNAMES} target="_blank">
                          {investor?.contact_phone}
                        </a>
                      </Link>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </LayoutContainer>
      </DashboardLayout>
      <ConfirmationPrompt
        open={confirmDeleteModalOpen}
        onAccept={handleDeletionConfirmation}
        onDismiss={closeConfirmDeleteModal}
        onRefuse={closeConfirmDeleteModal}
        onAcceptLoading={deleteOpenCallApplicationMutation.isLoading}
        title={intl.formatMessage({
          defaultMessage: 'Withdraw from the open call?',
          id: 'XOLAV7',
        })}
        description={
          <>
            <p className="max-w-sm">
              <FormattedMessage
                defaultMessage="Are you sure you want to withdraw from the “<strong>{openCallName}</strong>“ open call?"
                id="rE2fon"
                values={{
                  openCallName: openCall?.name,
                  strong: (chunk: string) => <span className="font-semibold">{chunk}</span>,
                }}
              />
            </p>
            <p className="mt-4">
              <FormattedMessage defaultMessage="You can't undo this action." id="k0xbVH" />
            </p>
            {alert && (
              <Alert type="warning" className="my-4 -mb-4 rounded">
                {/* useGetAlert returns an array, but the endpoint only sends one error message at a time. */}
                {alert[0]}
              </Alert>
            )}
          </>
        }
      />
    </ProtectedPage>
  );
};

OpenCallDetailsPage.layout = {
  Component: NakedLayout,
};

export default OpenCallDetailsPage;
