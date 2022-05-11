import { FC, useState, useEffect } from 'react';

import { Heart as HeartIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import noop from 'lodash-es/noop';

import Image from 'next/image';

import { translatedLanguageNameForLocale } from 'helpers/intl';

import ContactInformationModal from 'containers/social-contact/contact-information-modal';
import WebsiteSocial from 'containers/social-contact/website-social';

import Button from 'components/button';
import LayoutContainer from 'components/layout-container';

import type { ProfileHeaderProps } from './types';
import Icon from 'components/icon';

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

  const [isContactInfoModalOpen, setIsContactInfoModalOpen] = useState<boolean>(false);
  const [logo, setLogo] = useState<string>(logoProp);

  useEffect(() => {
    setLogo(logoProp);
  }, [logoProp]);

  return (
    <div className={className}>
      <div className="py-10 mx-4 bg-center bg-cover lg:mx-0 lg:px-4 lg:py-18 rounded-2xl bg-radial-green-dark bg-green-dark">
        <LayoutContainer className="flex justify-between">
          <div className="flex flex-col items-center w-full gap-6 lg:items-end lg:flex-row lg:w-6/12">
            <div className="relative overflow-hidden bg-white w-52 h-52 rounded-2xl">
              <Image
                className="mx-auto w-52 h-52"
                src={logo}
                alt={intl.formatMessage(
                  { defaultMessage: '{organization} logo', id: 'in26xr' },
                  { organization: title }
                )}
                layout="fill"
                objectFit="cover"
                onError={() => setLogo('/images/placeholders/profile-logo.png')}
              />
            </div>
            <div className="-mb-2 text-center lg:mb-4 lg:text-left">
              <h1 className="font-serif text-3xl text-white">{title}</h1>
              <p className="mt-2 text-xl text-gray-400">{subtitle}</p>
            </div>
          </div>
        </LayoutContainer>
      </div>
      <LayoutContainer className="flex flex-col justify-between mt-8 lg:flex-row">
        <div className="w-full lg:w-6/12">
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
        <div className="lg:mr-4 p-6 bg-white drop-shadow-xl lg:mb-[-70%] h-full lg:translate-y-[-70%] lg:max-w-4/12 rounded-2xl mt-8 lg:mt-0">
          {typeof totalProjects === 'number' && typeof projectsWaitingFunding === 'number' && (
            <>
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
            </>
          )}

          <WebsiteSocial className="max-w-md mt-2 mb-8" website={website} social={social} />

          <div className="flex flex-col justify-between gap-4 mt-8 lg:flex-row">
            <Button
              className="justify-center"
              theme="secondary-green"
              onClick={onFavoriteClick}
              disabled={favoriteLoading}
              aria-pressed={isFavorite}
            >
              <Icon
                icon={HeartIcon}
                className={cx('w-4 mr-3', { 'fill-green-dark': isFavorite })}
              />
              <FormattedMessage defaultMessage="Favorite" id="5Hzwqs" />
            </Button>
            <Button
              className="w-full lg:max-w-[200px] justify-center"
              theme="primary-green"
              disabled={!contact?.phone && !contact?.email}
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
        contact={contact}
      />
    </div>
  );
};

export default ProfileHeader;
