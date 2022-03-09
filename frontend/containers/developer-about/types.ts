import { WebsiteSocialContactProps } from 'containers/website-social-contact';

export type DeveloperAboutProps = {
  /** Classnames to apply to the container */
  className?: string;
  /** Name of the project developer */
  developerName: string;
  /** Path to a photo of the project developer */
  developerPhoto?: string;
  /** Text to display */
  text: string;
  /** Optional buttons to display below the website/social/contact information */
  buttons?: JSX.Element;
} & Pick<WebsiteSocialContactProps, 'website' | 'social'>;
