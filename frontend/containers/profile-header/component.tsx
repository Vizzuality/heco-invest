import { FC } from 'react';

import { Heart as HeartIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import { noop } from 'lodash-es/noop';

import Image from 'next/image';

import { translatedLanguageNameForLocale } from 'helpers/intl';

import WebsiteSocialContact from 'containers/website-social-contact';

import Button from 'components/button';
import LayoutContainer from 'components/layout-container';

import type { ProfileHeaderProps } from './types';

export const ProfileHeader: FC<ProfileHeaderProps> = ({
  className,
  logo,
  title,
  subtitle,
  text,
  originalLanguage,
  numNotFunded,
  numFunded,
  website,
  social,
  contact,
  onFavoriteClick = () => noop,
  onContactClick = () => noop,
}: ProfileHeaderProps) => {
  const intl = useIntl();

  return (
    <div className={className}>
      <div className="pt-24 pb-12 bg-center bg-cover sm:pt-40 md:pt-56 bg-radial-green-dark bg-green-dark">
        <LayoutContainer className="flex justify-between">
          <div className="flex flex-col items-center w-full gap-6 lg:items-end lg:flex-row lg:w-6/12">
            <div className="p-4 bg-white w-52 h-52 rounded-2xl">
              <Image
                className="mx-auto w-52 h-52"
                src={logo}
                alt={intl.formatMessage(
                  { defaultMessage: '{organization} logo', id: 'in26xr' },
                  { organization: title }
                )}
                layout="responsive"
                width="100%"
                height="100%"
                objectFit="contain"
              />
            </div>
            <div className="mb-4 text-center lg:text-left">
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
        <div className="p-6 bg-white drop-shadow-xl lg:mb-[-70%] h-full lg:translate-y-[-70%] lg:max-w-4/12 rounded-2xl mt-8 lg:mt-0">
          {typeof numFunded === 'number' && typeof numNotFunded === 'number' && (
            <>
              <div className="flex">
                <div className="flex flex-col items-center w-1/2 gap-2 text-center">
                  <span id="num-projects-waiting-funding" className="text-2xl font-semibold">
                    {numNotFunded}
                  </span>
                  <span aria-labelledby="num-projects-waiting-funding" className="text-gray-400">
                    <FormattedMessage defaultMessage="Projects waiting funding" id="hxIQ/8" />
                  </span>
                </div>
                <div className="flex flex-col items-center w-1/2 gap-2 text-center">
                  <span id="num-projects-waiting-funding" className="text-2xl font-semibold">
                    {numFunded}
                  </span>
                  <span aria-labelledby="num-projects-funded" className="text-gray-400">
                    <FormattedMessage defaultMessage="Projects funded" id="/1WGZ8" />
                  </span>
                </div>
              </div>

              <hr className="mt-6 mb-8" />
            </>
          )}

          <WebsiteSocialContact
            className="max-w-md mt-2 mb-8"
            website={website}
            social={social}
            contact={contact}
          />

          <div className="flex justify-between gap-4 mt-8">
            <Button theme="secondary-green" icon={HeartIcon} onClick={onFavoriteClick}>
              <FormattedMessage defaultMessage="Favorite" id="5Hzwqs" />
            </Button>
            <Button
              className="w-full max-w-[200px] justify-center"
              theme="primary-green"
              onClick={onContactClick}
            >
              <FormattedMessage defaultMessage="Contact" id="zFegDD" />
            </Button>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
};

export default ProfileHeader;
