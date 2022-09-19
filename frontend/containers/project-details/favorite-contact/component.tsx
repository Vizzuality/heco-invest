import { FC, useState } from 'react';

import { ArrowRight, Heart as HeartIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import Link from 'next/link';

import { noop } from 'lodash-es';

import useMe from 'hooks/me';

import { useProjectContacts } from 'helpers/project';

import ContactInformationModal from 'containers/social-contact/contact-information-modal';

import Button from 'components/button';
import Icon from 'components/icon';
import { Paths } from 'enums';

import { FavoriteContactProps } from './types';

export const FavoriteContact: FC<FavoriteContactProps> = ({
  className,
  project,
  onFavoriteClick = noop,
}: FavoriteContactProps) => {
  const [contactInfoModalOpen, setIsContactInfoModalOpen] = useState<boolean>(false);

  const { user } = useMe();
  const contacts = useProjectContacts(project);

  return (
    <div className={className}>
      <div className="flex flex-col items-start justify-between gap-4 md:items-center md:flex-row">
        <div className="flex justify-center gap-4 sm:justify-start">
          <Button
            disabled={!user || !contacts.length}
            className="px-4 py-2 text-sm sm:px-6 sm:py-2"
            theme="primary-green"
            onClick={() => setIsContactInfoModalOpen(true)}
          >
            <FormattedMessage defaultMessage="Contact" id="zFegDD" />
          </Button>
          {!!user && (
            <Button
              className="px-4 py-2 text-sm sm:px-6 sm:py-2"
              theme="secondary-green"
              onClick={onFavoriteClick}
            >
              <Icon
                icon={HeartIcon}
                className={cx('w-4 mr-3', { 'fill-green-dark': project.favourite })}
              />
              <FormattedMessage defaultMessage="Favorite" id="5Hzwqs" />
            </Button>
          )}
        </div>
        <Link href={`${Paths.Project}/${project.slug}`}>
          <a className="flex items-center text-sm leading-6 text-green-dark hover:text-green-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark group">
            <span className="border-b border-b-green-dark group-hover:border-b-green-light">
              <FormattedMessage defaultMessage="Project details" id="7gMEKc" />
            </span>
            <Icon icon={ArrowRight} className="w-4 h-4 ml-1.5" />
          </a>
        </Link>
      </div>
      <ContactInformationModal
        isOpen={contactInfoModalOpen}
        onDismiss={() => setIsContactInfoModalOpen(false)}
        contacts={contacts}
      />
    </div>
  );
};

export default FavoriteContact;
