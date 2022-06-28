import { FC, useState } from 'react';

import { Heart as HeartIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import Link from 'next/link';

import { noop } from 'lodash-es';

import useMe from 'hooks/me';

import { projectContacts } from 'helpers/project';

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
  const contacts = projectContacts(project);

  return (
    <div className={className}>
      <div className="flex flex-col items-start gap-4 mt-5 xl:items-center xl:flex-row">
        <Button
          disabled={!user || !contacts.length}
          className="justify-start"
          theme="primary-green"
          onClick={() => setIsContactInfoModalOpen(true)}
        >
          <FormattedMessage defaultMessage="Contact" id="zFegDD" />
        </Button>
        {!!user && (
          <Button className="justify-start" theme="secondary-green" onClick={onFavoriteClick}>
            <Icon
              icon={HeartIcon}
              className={cx('w-4 mr-3', { 'fill-green-dark': project.favourite })}
            />
            <FormattedMessage defaultMessage="Favorite" id="5Hzwqs" />
          </Button>
        )}
        <Link href={`${Paths.Project}/${project.slug}`}>
          <a className="px-1 text-sm transition-all text-green-dark hover:text-green-light rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark">
            <FormattedMessage defaultMessage="Know more" id="+JVDMC" />
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
