import { ImpactAreas, Impacts } from 'enums';

export type ImpactTextProps = {
  className?: string;
  area: ImpactAreas;
  impact: Record<Impacts | 'total', number>;
};
