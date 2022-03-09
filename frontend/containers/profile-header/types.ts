import { WebsiteSocialContactProps } from 'containers/website-social-contact';

export type ProfileHeaderProps = {
  /** Classnames to apply to the container */
  className?: string;
  /** Logo to display */
  logo?: string;
  /** Title to display */
  title: string;
  /** Subtitle to display */
  subtitle: string;
  /** Text to display */
  text: string;
  /** Original language in which the profile was written in */
  originalLanguage?: string;
  /** Num projects waiting funded */
  numNotFunded?: number;
  /** Num projects funded */
  numFunded?: number;
  /** Callback for when the favorite button is clicked */
  onFavoriteClick?: () => void;
  /** Callback for when the contact button is clicked */
  onContactClick?: () => void;
} & Pick<WebsiteSocialContactProps, 'website' | 'social' | 'contact'>;
