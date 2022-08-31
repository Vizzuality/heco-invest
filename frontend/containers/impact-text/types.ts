import { ImpactAreas, Impacts } from 'enums';

export type ImpactTextProps = {
  /** Class to apply to the container */
  className?: string;
  /** Area based on which the impact score should be displayed */
  area: ImpactAreas;
  /** Whether the impact score has already been calculated */
  impactCalculated: boolean;
  /** Impact scores for each dimension + the total */
  impact: Record<Impacts | 'total', number>;
  /** Whether to display a link to the FAQ. Defaults to `false`. */
  linkToFAQ?: boolean;
  /** Whether to display a shorter version of the text. Defaults to `false`. */
  shortText?: boolean;
};
