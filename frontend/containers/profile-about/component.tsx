import { FC } from 'react';

import cx from 'classnames';

import WebsiteSocialContact from 'containers/website-social-contact';

import type { ProfileAboutProps } from './types';

export const ProfileAbout: FC<ProfileAboutProps> = ({
  className,
  text,
  website,
  social,
  contact,
  buttons,
}: ProfileAboutProps) => (
  <div
    className={cx({
      'flex flex-col gap-16 md:flex-row': true,
      [className]: true,
    })}
  >
    <p>{text}</p>
    <div className="gap-2 min-w-fit">
      <WebsiteSocialContact website={website} social={social} contact={contact} />
      <div className="flex justify-start gap-4 mt-10 md:justify-end md:text-right">{buttons}</div>
    </div>
  </div>
);

export default ProfileAbout;
