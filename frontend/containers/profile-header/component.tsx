import { FC, useState, useEffect } from 'react';

import { Heart as HeartIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import noop from 'lodash-es/noop';

import Image from 'next/image';

import { translatedLanguageNameForLocale } from 'helpers/intl';

import ShareIcons from 'containers/share-icons';
import ContactInformationModal from 'containers/social-contact/contact-information-modal';
import WebsiteSocial from 'containers/social-contact/website-social';

import Button from 'components/button';
import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';

import { useAccount } from 'services/account';

import type { ProfileHeaderProps } from './types';

export const ProfileHeader: FC<ProfileHeaderProps> = ({
  className,
  logo: logoProp,
  title,
  subtitle,
  text,
  originalLanguage,
  projectsWaitingFunding,
  totalProjects,
  website,
  social,
  contact,
  isFavorite,
  favoriteLoading,
  onFavoriteClick = () => noop,
}: ProfileHeaderProps) => {
  const intl = useIntl();
  const { user } = useAccount();

  const [isContactInfoModalOpen, setIsContactInfoModalOpen] = useState<boolean>(false);
  const [logo, setLogo] = useState<string>(logoProp);

  useEffect(() => {
    setLogo(logoProp);
  }, [logoProp]);

  return (
    <div className={className}>
      <div className="py-10 bg-center bg-cover sm:mx-4 sm:px-4 sm:py-18 sm:rounded-2xl bg-radial-green-dark bg-green-dark min-h-[425px] sm:min-h-fit">
        <LayoutContainer className="flex justify-between">
          <div className="flex flex-col items-center w-full gap-4 sm:gap-6 sm:items-end sm:flex-row sm:w-6/12">
            <div className="relative w-32 h-32 overflow-hidden bg-white sm:w-52 sm:h-52 rounded-2xl">
              <Image
                className="w-full h-full mx-auto"
                src={logo}
                alt={intl.formatMessage(
                  { defaultMessage: '{organization} logo', id: 'in26xr' },
                  { organization: title }
                )}
                layout="fill"
                objectFit="contain"
                onError={() => setLogo('/images/placeholders/profile-logo.png')}
              />
            </div>
            <div className="-mb-2 text-center sm:mb-4 sm:text-left">
              <h1 className="font-serif text-3xl text-white">{title}</h1>
              <p className="mt-2 text-xl text-gray-400">{subtitle}</p>
            </div>
          </div>
        </LayoutContainer>
      </div>
      <LayoutContainer className="flex flex-col justify-between sm:mt-8 sm:flex-row">
        <div className="order-2 w-full mt-20 sm:w-6/12 sm:order-1 sm:mt-0">
          {originalLanguage && (
            <span className="block mb-4 text-sm text-gray-400">
              <FormattedMessage
                defaultMessage="Note: The content of this page was originally written in <span>{language}</span>."
                id="zXxFL9"
                values={{
                  language: translatedLanguageNameForLocale(intl, originalLanguage),
                  span: (chunks) => <span className="underline">{chunks}</span>,
                }}
              />
            </span>
          )}
          <p>{text}</p>
        </div>
        <div className="order-1 sm:order-2 flex flex-col justify-start sm:mr-4 pt-8 p-6 bg-white drop-shadow-xl sm:mb-[-70%] h-full sm:translate-y-[-70%] sm:max-w-4/12 rounded-2xl -mt-32 sm:mt-8">
          {typeof totalProjects === 'number' && typeof projectsWaitingFunding === 'number' && (
            <div className="mb-6">
              <div className="flex flex-col gap-8 md:flex-row">
                <div className="flex flex-col items-center w-full gap-2 text-center md:min-w-1/2">
                  <span id="total-of-projects" className="text-2xl font-semibold">
                    {totalProjects}
                  </span>
                  <span aria-labelledby="total-of-projects" className="text-gray-400">
                    <FormattedMessage defaultMessage="Total of projects" id="KGREXT" />
                  </span>
                </div>
                <div className="flex flex-col items-center w-full gap-2 text-center md:min-w-1/2">
                  <span id="num-projects-waiting-funding" className="text-2xl font-semibold">
                    {projectsWaitingFunding}
                  </span>
                  <span aria-labelledby="num-projects-waiting-funding" className="text-gray-400">
                    <FormattedMessage defaultMessage="Projects waiting funding" id="hxIQ/8" />
                  </span>
                </div>
              </div>

              <hr className="mt-6 mb-8" />
            </div>
          )}

          {(!!website || !!social?.length) && (
            <WebsiteSocial className="max-w-md mb-8 sm:mb-10" website={website} social={social} />
          )}

          <div className="flex flex-wrap justify-between gap-4">
            <Button
              className="justify-center"
              theme="secondary-green"
              onClick={onFavoriteClick}
              disabled={!user || favoriteLoading}
              aria-pressed={isFavorite}
            >
              <Icon
                icon={HeartIcon}
                className={cx('w-4 mr-3', { 'fill-green-dark': isFavorite })}
              />
              <FormattedMessage defaultMessage="Favorite" id="5Hzwqs" />
            </Button>
            <Button
              className="flex-grow sm:max-w-[200px] justify-center"
              theme="primary-green"
              disabled={!contact?.phone && !contact?.email}
              onClick={() => setIsContactInfoModalOpen(true)}
            >
              <FormattedMessage defaultMessage="Contact" id="zFegDD" />
            </Button>
          </div>
          <ShareIcons title={title} />
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

export default ProfileHeader;
