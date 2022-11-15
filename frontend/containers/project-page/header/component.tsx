import { FC, useMemo, useState } from 'react';

import { Heart as HeartIcon, CheckCircle as CheckCircleIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import dayjs from 'dayjs';

import { translatedLanguageNameForLocale } from 'helpers/intl';
import { useProjectContacts } from 'helpers/project';

import CategoryTag from 'containers/category-tag';
import ImageGallery from 'containers/image-gallery';
import ShareIcons from 'containers/share-icons';
import ContactInformationModal from 'containers/social-contact/contact-information-modal';

import Button from 'components/button';
import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';
import { logEvent } from 'lib/analytics/ga';
import { CategoryType } from 'types/category';

import { useAccount } from 'services/account';
import { useEnums } from 'services/enums/enumService';
import { useFavoriteProject } from 'services/projects/projectService';

import type { HeaderProps } from './types';

export const Header: FC<HeaderProps> = ({ className, project }: HeaderProps) => {
  const intl = useIntl();
  const { user } = useAccount();
  const favoriteProject = useFavoriteProject();

  const [isContactInfoModalOpen, setIsContactInfoModalOpen] = useState<boolean>(false);
  const {
    data: {
      instrument_type: allInstrumentTypes,
      ticket_size: allTicketSizes,
      category: allCategories,
    },
  } = useEnums();

  const category = useMemo(
    () => allCategories?.find(({ id }) => id === project.category),
    [allCategories, project.category]
  );

  const coverImage = useMemo(() => {
    if (!project.project_images?.length) return null;

    return (
      // First we try to find the image with `cover: true`
      project.project_images?.find(({ cover = false }) => cover === true)?.file.medium ||
      // If none found, we use the first image as cover
      project.project_images[0]?.file.medium ||
      // No images to use as cover image.
      null
    );
  }, [project.project_images]);

  const ticketSizeStr = useMemo(
    () => allTicketSizes?.find(({ id }) => project.ticket_size === id)?.description,
    [allTicketSizes, project.ticket_size]
  );

  const instrumentTypesStr = useMemo(
    () =>
      allInstrumentTypes
        ?.filter(({ id }) => project.instrument_types?.includes(id))
        .map(({ name }, idx) => (idx === 0 ? name : name.toLowerCase().trim()))
        .join(', '),
    [allInstrumentTypes, project.instrument_types]
  );

  const contacts = useProjectContacts(project);

  const handleFavoriteClick = () => {
    if (!project.favourite) {
      logEvent('click_favorite', { category_name: 'project', slug: project.slug });
    }

    // This mutation uses a 'DELETE' request when the isFavorite is true, and a 'POST' request when
    // is false.
    favoriteProject.mutate({ id: project.id, isFavourite: project.favourite });
  };

  return (
    <div className={className}>
      <div
        className="flex pt-6.5 sm:rounded-2xl bg-radial-green-dark bg-green-dark min-h-[250px] md:min-h-[372px]"
        style={{
          ...(coverImage && {
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${coverImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }),
        }}
      >
        <LayoutContainer className="flex flex-col justify-between lg:min-h-[18rem] gap-y-12">
          <div className="flex flex-wrap justify-between gap-2">
            <div className="flex justify-center gap-2 lg:justify-start">
              {/* VERIFICATION PROJECTS: HIDDEN
              {project.trusted && (
                <Tag className="bg-white text-green-dark">
                  <CheckCircleIcon className="w-4 h-4 mr-3" />
                  <FormattedMessage defaultMessage="Verified" id="Z8971h" />
                </Tag>
              )}
              */}
              {!!category && (
                <CategoryTag
                  className="text-xs bg-white sm:text-sm text-green-dark h-7 sm:h-9"
                  category={category.id as CategoryType}
                >
                  {category.name}
                </CategoryTag>
              )}
            </div>
            {!!project.project_images?.length && (
              <div>
                <ImageGallery images={project.project_images} />
              </div>
            )}
          </div>
          <LayoutContainer className="px-0">
            <div className="md:mb-8 lg:w-1/2">
              <h1 className="font-serif text-3xl text-white md:text-4xl">{project.name}</h1>
            </div>
            <div className="h-32 lg:hidden"></div>
          </LayoutContainer>
        </LayoutContainer>
      </div>
      <LayoutContainer className="flex flex-col justify-between w-full mt-8 md:flex-row">
        <div className="order-2 w-full md:order-1 md:w-6/12 md:pr-2">
          {project.language && (
            <span className="block mb-4 text-sm text-gray-400">
              <FormattedMessage
                defaultMessage="Note: The content of this page was originally written in <span>{language}</span>."
                id="zXxFL9"
                values={{
                  language: translatedLanguageNameForLocale(intl, project.language),
                  span: (chunks) => <span className="underline">{chunks}</span>,
                }}
              />
            </span>
          )}
          <p>{project.description}</p>
        </div>
        <div className="order-1 md:order-2 w-full flex flex-col justify-start md:mr-4 p-6 bg-white drop-shadow-xl -mb-12 h-full md:w-[395px] -translate-y-32 md:max-w-2/3 rounded-2xl">
          <p className="mb-4 text-xs text-gray-700">
            <FormattedMessage
              defaultMessage="Created on <b>{createdDate}</b> and updated on <b>{updatedDate}</b>"
              id="hwBx6v"
              values={{
                b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
                createdDate: dayjs(project.created_at).format('MMM DD, YYYY'),
                updatedDate: dayjs(project.updated_at).format('MMM DD, YYYY'),
              }}
            />
          </p>
          {project.looking_for_funding ? (
            <div className="flex justify-between gap-8 mb-6 md:gap-11">
              <div className="flex flex-col justify-end gap-2 md:items-start">
                <span id="ticket-size" className="text-xl font-semibold leading-6">
                  {ticketSizeStr}
                </span>
                <span aria-labelledby="ticket-size" className="leading-4 text-gray-400">
                  <FormattedMessage defaultMessage="Ticket size" id="lfx6Nc" />
                </span>
              </div>
              <div className="flex flex-col justify-end gap-2 md:items-start">
                <span id="instrument-types" className="text-xl font-semibold leading-6">
                  {instrumentTypesStr}
                </span>
                <span aria-labelledby="instrument-types" className="leading-4 text-gray-400">
                  <FormattedMessage defaultMessage="Instrument type" id="fDd10o" />
                </span>
              </div>
            </div>
          ) : (
            <div className="max-w-sm mb-4 text-gray-800">
              <p className="text-lg font-semibold">
                <FormattedMessage
                  defaultMessage="This project isn’t currently looking for funding."
                  id="ZKsAVY"
                />
              </p>
              <p className="mt-4">
                <FormattedMessage
                  defaultMessage="If you have interest in this project contact the project developer to know how you can work together."
                  id="vIKTZ9"
                />
              </p>
            </div>
          )}

          <div className="flex justify-center gap-2">
            <Button
              className="justify-center flex-grow-[1]"
              theme="secondary-green"
              onClick={handleFavoriteClick}
              disabled={!user}
            >
              <Icon
                icon={HeartIcon}
                className={cx('w-4 mr-3', {
                  'fill-green-dark': project.favourite,
                })}
              />
              <FormattedMessage defaultMessage="Favorite" id="5Hzwqs" />
            </Button>
            <Button
              className="flex-grow-[3] md:flex-grow-[10] md:max-w-[200px] justify-center px-6"
              disabled={!contacts?.length}
              theme="primary-green"
              onClick={() => setIsContactInfoModalOpen(true)}
            >
              <FormattedMessage defaultMessage="Contact" id="zFegDD" />
            </Button>
          </div>
          <div className="flex justify-center">
            <ShareIcons title={project.name} />
          </div>
        </div>
      </LayoutContainer>
      <ContactInformationModal
        isOpen={isContactInfoModalOpen}
        onDismiss={() => setIsContactInfoModalOpen(false)}
        contacts={contacts}
      />
    </div>
  );
};

export default Header;
