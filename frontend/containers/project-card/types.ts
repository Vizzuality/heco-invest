export type ProjectCardProps = {
  /** Classnames to apply to the wrapper */
  className?: string;
  /** Id of the project */
  id: string;
  /** Investment category */
  category: string;
  /** Project name */
  name: string;
  /** Instrument type */
  instrument: string;
  /** Amount of money invested (in USD) */
  amount: number;
};
