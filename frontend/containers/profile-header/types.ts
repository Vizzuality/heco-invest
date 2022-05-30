import { ContactItemType } from 'containers/social-contact/contact-information-modal';
import { WebsiteSocialProps } from 'containers/social-contact/website-social';

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
  /** If the entity is favorite */
  isFavorite?: boolean;
  /** Number of projects waiting funding */
  projectsWaitingFunding?: number;
  /** Number of projects */
  totalProjects?: number;
  /** Contact information for the project developer */
  contact?: ContactItemType;
  /** Callback for when the favorite button is clicked */
  onFavoriteClick?: () => void;
  /** If the favorite Button shoulb be on loading state */
  favoriteLoading?: boolean;
  /** Callback for when the contact button is clicked */
  onContactClick?: () => void;
} & Pick<WebsiteSocialProps, 'website' | 'social'>;
