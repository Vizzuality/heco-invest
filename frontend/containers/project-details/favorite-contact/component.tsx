import { FC, useState } from 'react';

import { Heart as HeartIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import Link from 'next/link';

import Button from 'components/button';
import { Paths } from 'enums';

import { FavoriteContactProps } from './types';

export const FavoriteContact: FC<FavoriteContactProps> = ({
  className,
  project,
}: FavoriteContactProps) => {
  const [contactInfoModalOpen, setIsContactInfoModalOpen] = useState<boolean>(false);

  const handleFavoriteClick = () => {};

  // NOTE: This is a placeholder. When adding the contact modal, we need to take into
  //       account that if there are multiple project developers involved with the project
  //       we need to display the contact details for all of them.
  const { contact_email: email, contact_phone: phone } = project?.project_developer;

  return (
    <div className={className}>
      <div className="flex flex-col items-start gap-4 mt-5 xl:items-center xl:flex-row">
        <Button
          disabled={!phone && !email}
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
        <Link href={`${Paths.Project}/${project.id}`}>
          <a className="px-1 text-sm transition-all text-green-dark hover:text-green-light rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark">
            <FormattedMessage defaultMessage="Know more" id="+JVDMC" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default FavoriteContact;
