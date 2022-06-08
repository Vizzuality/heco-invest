import { FC, useMemo, useState } from 'react';

import { Heart as HeartIcon, CheckCircle as CheckCircleIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { translatedLanguageNameForLocale } from 'helpers/intl';

import CategoryTag from 'containers/category-tag';
import ImageGallery from 'containers/image-gallery';
import ContactInformationModal, {
  ContactItemType,
} from 'containers/social-contact/contact-information-modal';

import Button from 'components/button';
import LayoutContainer from 'components/layout-container';
import Tag from 'components/tag';
import { CategoryType } from 'types/category';
import { ProjectDeveloper as ProjectDeveloperType } from 'types/projectDeveloper';

import { useEnums } from 'services/enums/enumService';

import type { HeaderProps } from './types';

export const Header: FC<HeaderProps> = ({ className, project }: HeaderProps) => {
  const intl = useIntl();
  const [isContactInfoModalOpen, setIsContactInfoModalOpen] = useState<boolean>(false);
  const {
    data: {
      instrument_type: allInstrumentTypes,
      ticket_size: allTicketSizes,
      category: allCategories,
    },
  } = useEnums();

  const projectDeveloper: ProjectDeveloperType = project.project_developer;

  const category = useMemo(
    () => allCategories?.find(({ id }) => id === project.category),
    [allCategories, project.category]
  );

  const coverImage = useMemo(
    () =>
      // First we try to find the image with `cover: true`
      project.project_images.find(({ cover = false }) => cover === true)?.file.medium ||
      // If none found, we use the first image as cover
      project.project_images[0]?.file.medium ||
      // No images to use as cover image.
      null,
    [project.project_images]
  );

  const contact: ContactItemType = {
    name: projectDeveloper.name,
    email: projectDeveloper.contact_email,
    phone: projectDeveloper.contact_phone,
  };

  const ticketSizeStr = useMemo(
    () => allTicketSizes?.find(({ id }) => project.ticket_size === id)?.description,
    [allTicketSizes, project.ticket_size]
  );

  const instrumentTypesStr = useMemo(
    () =>
      allInstrumentTypes
        ?.filter(({ id }) => project.instrument_types?.includes(id))
        .map(({ name }, idx) => (idx === 0 ? name : name.toLowerCase()))
        .join(', '),
    [allInstrumentTypes, project.instrument_types]
  );

  const handleFavoriteClick = () => {};

  return (
    <div className={className}>
      <div
        className={cx({
          'relative py-6 mx-4 bg-center bg-cover lg:mx-0 lg:px-4 rounded-2xl': true,
          'bg-radial-green-dark bg-green-dark': !coverImage,
        })}
      >
        {coverImage && (
          <span
            className="absolute top-0 bottom-0 left-0 right-0 overflow-hidden bg-center bg-cover pointer-events-none rounded-2xl -z-10"
            style={{
              ...(coverImage && { backgroundImage: `url(${coverImage})` }),
            }}
          >
            <span className="absolute top-0 bottom-0 left-0 right-0 bg-gray-900 opacity-40" />
          </span>
        )}

        <LayoutContainer className="flex flex-col justify-between lg:min-h-[18rem]">
          <div className="flex flex-col justify-center gap-2 mb-4 sm:flex-row sm:justify-between">
            <div className="flex justify-center order-last gap-2 mb-4 lg:justify-start sm:order-first">
              {project.trusted && (
                <Tag className="bg-white text-green-dark">
                  <CheckCircleIcon className="w-4 h-4 mr-3" />
                  <FormattedMessage defaultMessage="Verified" id="Z8971h" />
                </Tag>
              )}
              {category && (
                <CategoryTag
                  className="bg-white text-green-dark"
                  category={category.id as CategoryType}
                >
                  {category.name}
                </CategoryTag>
              )}
            </div>
            {!!project.project_images.length && (
              <div className="self-end order-first sm:self-start sm:order-last">
                <ImageGallery images={project.project_images} />
              </div>
            )}
          </div>
          <div className="text-center lg:mb-4 lg:text-left">
            <div className="lg:w-6/12">
              <h1 className="font-serif text-3xl text-white">{project.name}</h1>
            </div>
          </div>
        </LayoutContainer>
      </div>
      <LayoutContainer className="flex flex-col justify-between mt-8 lg:flex-row">
        <div className="w-full lg:w-6/12">
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
        <div className="lg:mr-4 p-6 bg-white drop-shadow-xl lg:mb-[-70%] h-full lg:translate-y-[-70%] lg:max-w-4/12 rounded-2xl mt-8 lg:mt-0">
          {project.looking_for_funding ? (
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex flex-col items-start justify-end w-full gap-2 text-center md:min-w-1/2">
                <span id="ticket-size" className="text-2xl font-semibold">
                  {ticketSizeStr}
                </span>
                <span aria-labelledby="ticket-size" className="text-gray-400">
                  <FormattedMessage defaultMessage="Ticket size" id="lfx6Nc" />
                </span>
              </div>
              <div className="flex flex-col items-start justify-end w-full gap-2 text-left md:min-w-1/2">
                <span
                  id="instrument-types"
                  className={cx({
                    'font-semibold': true,
                    'text-2xl': project.instrument_types.length <= 1,
                    'text-xl': project.instrument_types.length > 1,
                  })}
                >
                  {instrumentTypesStr}
                </span>
                <span
                  aria-labelledby="instrument-types"
                  className="text-gray-400 whitespace-nowrap"
                >
                  <FormattedMessage defaultMessage="Instrument type" id="fDd10o" />
                </span>
              </div>
            </div>
          ) : (
            <div className="max-w-sm text-gray-800">
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

          <div className="flex flex-col justify-between gap-4 mt-5 lg:flex-row">
            <Button
              className="justify-center"
              theme="secondary-green"
              icon={HeartIcon}
              onClick={handleFavoriteClick}
            >
              <FormattedMessage defaultMessage="Favorite" id="5Hzwqs" />
            </Button>
            <Button
              disabled={!contact?.phone && !contact?.email}
              className="w-full lg:max-w-[200px] justify-center"
              theme="primary-green"
              onClick={() => setIsContactInfoModalOpen(true)}
            >
              <FormattedMessage defaultMessage="Contact" id="zFegDD" />
            </Button>
          </div>
        </div>
      </LayoutContainer>
      <ContactInformationModal
        isOpen={isContactInfoModalOpen}
        onDismiss={() => setIsContactInfoModalOpen(false)}
        contacts={contact}
      />
    </div>
  );
};

export default Header;
