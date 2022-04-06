import { WebsiteSocialContactProps } from 'containers/social-contact/website-social-contact';

export type DeveloperAboutProps = {
  /** Classnames to apply to the container */
  className?: string;
  /** Id of the developer (to be used to link to their profile) */
  developerId: string;
  /** Name of the project developer */
  developerName: string;
  /** Path to a photo of the project developer */
  developerPhoto?: string;
  /** Text to display */
  text: string;
  /** Optional buttons to display below the website/social/contact information */
  buttons?: JSX.Element;
} & Pick<WebsiteSocialContactProps, 'website' | 'social'>;
