import { useEffect, useMemo, useState } from 'react';

import { ExternalLink as ExternalLinkIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import dayjs from 'dayjs';
import { groupBy } from 'lodash-es';

import { loadI18nMessages } from 'helpers/i18n';

import FundingSwitch from 'containers/dashboard/open-call-details/funding-switch';

import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { EnumTypes, Paths, UserRoles } from 'enums';
import DashboardLayout, { DashboardLayoutProps } from 'layouts/dashboard';
import NakedLayout from 'layouts/naked';
import ProtectedPage from 'layouts/protected-page';
import { PageComponent } from 'types';
import { GroupedEnums as GroupedEnumsType } from 'types/enums';

import { getEnums } from 'services/enums/enumService';
import { useOpenCallApplication } from 'services/open-call/application-service';

const SECTION_CLASSNAMES = 'break-all';
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
  const placeholderPicture = '/images/placeholders/profile-logo.png';

  const [projectDeveloperPhoto, setProjectDeveloperPhoto] = useState<string>(placeholderPicture);

  const intl = useIntl();
  const router = useRouter();

  const {
    data: openCallApplication,
    isLoading: isLoadingOpenCallApplication,
    isLoadingError: isLoadingOpenCallApplicationError,
    isRefetching: isRefetchingOpenCallApplication,
  } = useOpenCallApplication(router.query.applicationId as string, {
    includes: ['open_call', 'project', 'project_developer'],
  });

  const {
    open_call: openCall,
    project_developer: projectDeveloper,
    project,
  } = openCallApplication || {};

  useEffect(() => {
    if (!projectDeveloper?.picture?.small) return;
    setProjectDeveloperPhoto(projectDeveloper?.picture?.small);
  }, [projectDeveloper]);

  const breadcrumbsProps = {
    substitutions: {
      'open-call': {
        name: intl.formatMessage({
          defaultMessage: 'Open calls',
          id: 'OBhULP',
        }),
        link: Paths.DashboardOpenCalls,
      },
      openCallId: { name: openCall?.name },
      applicationId: { name: project?.name },
    },
    hidden: ['dashboard', 'application'],
  };

  const projectDeveloperTypeName = useMemo(
    () =>
      enums[EnumTypes.ProjectDeveloperType].find(
        ({ id }) => id === projectDeveloper?.project_developer_type
      )?.name,
    [enums, projectDeveloper]
  );

  // If we can't load the open call, it may have been removed or the user not have access to it. Let's
  // redirect the user to the Dashboard open calls list.
  if (isLoadingOpenCallApplicationError) {
    router.push(Paths.DashboardOpenCalls);
    return null;
  }

  return (
    <ProtectedPage permissions={[UserRoles.Investor]}>
      <Head
        title={intl.formatMessage(
          { defaultMessage: '{projectName} application', id: 'sVbuuM' },
          {
            projectName:
              project?.name || intl.formatMessage({ defaultMessage: 'Project', id: 'k36uSw' }),
          }
        )}
      />
      <DashboardLayout
        header="breadcrumbs"
        isLoading={isLoadingOpenCallApplication}
        breadcrumbsProps={breadcrumbsProps}
      >
        <LayoutContainer layout="narrow">
          <div className="flex flex-col gap-4 p-6 break-all bg-white border rounded-lg lg:mt-4 lg:mb-14">
            <div className="flex flex-col items-center justify-between lg:flex-row">
              <span>
                <h1 className="text-xl font-semibold">{project?.name}</h1>
              </span>
              <span className="flex flex-col-reverse items-center gap-4 mt-2 lg:gap-2 lg:mt-0 lg:flex-row">
                <Link href={`${Paths.Project}/${project?.slug}`}>
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
              <div className={GRID_CLASSNAMES}>
                <span className={LABEL_CLASSNAMES}>
                  <FormattedMessage defaultMessage="Application date" id="kUEzKa" />
                </span>
                <span>{dayjs(openCallApplication?.created_at).format('DD MMM YYYY')}</span>
                {projectDeveloper?.contact_email && (
                  <>
                    <span className={LABEL_CLASSNAMES}>
                      <FormattedMessage defaultMessage="Email" id="sy+pv5" />
                    </span>
                    <span className="break">
                      <Link href={`mailto:${projectDeveloper?.contact_email}`}>
                        <a className={LINK_CLASSNAMES} target="_blank">
                          {projectDeveloper?.contact_email}
                        </a>
                      </Link>
                    </span>
                  </>
                )}
                {projectDeveloper?.contact_phone && (
                  <>
                    <span className={LABEL_CLASSNAMES}>
                      <FormattedMessage defaultMessage="Phone" id="O95R3Z" />
                    </span>
                    <span>
                      <Link href={`tel:${projectDeveloper?.contact_phone}`}>
                        <a className={LINK_CLASSNAMES} target="_blank">
                          {projectDeveloper?.contact_phone}
                        </a>
                      </Link>
                    </span>
                  </>
                )}
                <span className={LABEL_CLASSNAMES}>
                  <FormattedMessage defaultMessage="Project developer" id="yF82he" />
                </span>
                <span>
                  <Link href={`${Paths.ProjectDeveloper}/${projectDeveloper?.slug}`}>
                    <a className={LINK_CLASSNAMES} target="_blank">
                      {projectDeveloper?.name}
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
              <div className="mt-12">
                <span className={LABEL_CLASSNAMES}>
                  <FormattedMessage defaultMessage="About the project developer" id="lJfJXg" />
                </span>
                <div className="flex flex-col gap-3 mt-3 md:gap-10 md:flex-row">
                  <div>
                    <span className="relative flex-shrink-0 block overflow-hidden rounded-full w-18 aspect-square">
                      <Image
                        className="w-18"
                        src={projectDeveloperPhoto}
                        alt={intl.formatMessage(
                          { defaultMessage: '{name} picture', id: 'rLzWx9' },
                          { name: projectDeveloper?.name }
                        )}
                        layout="fill"
                        objectFit="contain"
                        onError={() => setProjectDeveloperPhoto(placeholderPicture)}
                      />
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xl font-semibold">{projectDeveloper?.name}</span>
                    <span className="text-gray-800">{projectDeveloperTypeName}</span>
                    <span className="mt-1">{projectDeveloper?.about}</span>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <FundingSwitch openCallApplication={openCallApplication} />
              </div>
            </div>
          </div>
        </LayoutContainer>
      </DashboardLayout>
    </ProtectedPage>
  );
};

OpenCallDetailsPage.layout = {
  Component: NakedLayout,
};

export default OpenCallDetailsPage;
