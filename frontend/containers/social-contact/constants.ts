import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Linkedin as LinkedinIcon,
  Instagram as InstagramIcon,
  Icon,
} from 'react-feather';

import { SocialType } from './website-social';

export const SOCIAL_DATA: { id: SocialType['id']; title: string; icon: Icon }[] = [
  {
    id: 'twitter',
    title: 'Twitter',
    icon: TwitterIcon,
  },
  {
    id: 'facebook',
    title: 'Facebook',
    icon: FacebookIcon,
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    icon: LinkedinIcon,
  },
  {
    id: 'instagram',
    title: 'Instagram',
    icon: InstagramIcon,
  },
];
