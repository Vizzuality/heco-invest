import { WebsiteSocialContactProps } from 'containers/social-contact/website-social-contact';

import { LanguageType } from 'types';

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
  originalLanguage: LanguageType;
  /** Num projects waiting funded */
  numNotFunded?: number;
  /** Num projects funded */
  numFunded?: number;
  /** If the project Developer is Favorite */
  isFavorite: boolean;
  /** Callback for when the favorite button is clicked */
  onFavoriteClick?: () => void;
  /** If the favorite Button shoulb be on loading state */
  favoriteLoading: boolean;
  /** Callback for when the contact button is clicked */
  onContactClick?: () => void;
} & Pick<WebsiteSocialContactProps, 'website' | 'social' | 'contact'>;
