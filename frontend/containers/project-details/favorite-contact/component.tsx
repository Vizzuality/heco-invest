import { FC, useState } from 'react';

import { Heart as HeartIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import Link from 'next/link';

import ContactInformationModal from 'containers/social-contact/contact-information-modal';

import Button from 'components/button';
import { Paths } from 'enums';

import { FavoriteContactProps } from './types';

export const FavoriteContact: FC<FavoriteContactProps> = ({
  className,
  project,
}: FavoriteContactProps) => {
  const [contactInfoModalOpen, setIsContactInfoModalOpen] = useState<boolean>(false);

  const handleFavoriteClick = () => {};

  const contacts = [project?.project_developer, ...project?.involved_project_developers]
    .map((developer) => {
      if (!developer.contact_email && !developer.contact_phone) return;

      return {
        name: developer.name,
        email: developer.contact_email,
        phone: developer.contact_phone,
        picture: developer.picture?.small,
      };
    })
    .filter((developer) => !!developer);

  return (
    <div className={className}>
      <div className="flex flex-col items-start gap-4 mt-5 xl:items-center xl:flex-row">
        <Button
          disabled={!contacts.length}
          className="justify-start"
          theme="primary-green"
          onClick={() => setIsContactInfoModalOpen(true)}
        >
          <FormattedMessage defaultMessage="Contact" id="zFegDD" />
        </Button>
        <Button
          className="justify-start"
          theme="secondary-green"
          icon={HeartIcon}
          onClick={handleFavoriteClick}
        >
          <FormattedMessage defaultMessage="Favorite" id="5Hzwqs" />
        </Button>
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
