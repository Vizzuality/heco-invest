import { FC, useState } from 'react';

import { Heart as HeartIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import Link from 'next/link';

import useMe from 'hooks/me';

import { projectContacts } from 'helpers/project';

import ContactInformationModal from 'containers/social-contact/contact-information-modal';

import Button from 'components/button';
import Icon from 'components/icon';
import { Paths } from 'enums';

import { useFavoriteProjectDeveloper } from 'services/project-developers/projectDevelopersService';

import { FavoriteContactProps } from './types';

export const FavoriteContact: FC<FavoriteContactProps> = ({
  className,
  project,
}: FavoriteContactProps) => {
  const [contactInfoModalOpen, setIsContactInfoModalOpen] = useState<boolean>(false);

  const { user } = useMe();
  const contacts = projectContacts(project);
  const favoriteProjectDeveloper = useFavoriteProjectDeveloper();

  const handleFavoriteClick = () => {
    // This mutation uses a 'DELETE' request when the isFavorite is true, and a 'POST' request when is false.
    favoriteProjectDeveloper.mutate(
      {
        id: project.project_developer.id,
        isFavourite: project.project_developer.favourite,
      },
      {
        onSuccess: (data) => {
          project.project_developer = data;
        },
      }
    );
  };

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
          <Button
            className="justify-start"
            disabled={favoriteProjectDeveloper.isLoading}
            theme="secondary-green"
            onClick={handleFavoriteClick}
          >
            <Icon
              icon={HeartIcon}
              className={cx('w-4 mr-3', { 'fill-green-dark': project.project_developer.favourite })}
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
