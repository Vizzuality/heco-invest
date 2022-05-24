export type ProfileCardProps = {
  /** Classes to apply to the container */
  className?: string;
  /** ProjectDeveloper or Investor `type` */
  type: string;
  /** Picture to display in the card */
  picture: string;
  /** Name to display on the card */
  name: string;
  /** Whether the card is for a project-developer or an investor. Will be used as a subtitle */
  profileType: 'project-developer' | 'investor';
  /** Description to show on the card */
  description: string;
  /** Link to the url the card links to */
  link: string;
  /** Impacts to display as tags */
  impacts?: string[];
};
