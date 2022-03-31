import React from 'react';

import { useIntl } from 'react-intl';

import Input from '../input';
import Label from '../label';

interface SocialMediaImputsProps {
  register: any;
}

const socialMedias = ['website', 'facebook', 'linkedin', 'instagram', 'twitter'];

const SocialMediaImputs = ({ register }: SocialMediaImputsProps) => {
  const { formatMessage } = useIntl();

  return (
    <div className="w-full md:grid md:grid-cols-2 md:gap-x-6">
      {socialMedias.map((item) => (
        <div key={item}>
          <Label htmlFor={item}>
            {item} {formatMessage({ defaultMessage: 'optional', id: 'V4KNjk' })}
            <Input
              className="mt-2.5 mb-4.5"
              name={item}
              id={item}
              type="text"
              register={register}
              placeholder={formatMessage({
                defaultMessage: 'insert URL',
                id: 'et2m37',
              })}
            />
          </Label>
        </div>
      ))}
    </div>
  );
};

export default SocialMediaImputs;
