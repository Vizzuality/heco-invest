import { WebsiteSocialContactProps } from 'containers/website-social-contact';

export type ProfileAboutProps = {
  /** Classnames to apply to the container */
  className?: string;
  /** Text to display */
  text: string;
  /** Optional buttons to display below the website/social/contact information */
  buttons?: JSX.Element;
} & Pick<WebsiteSocialContactProps, 'website' | 'social' | 'contact'>;
