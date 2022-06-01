import { Impacts } from 'enums';

export type ImpactChartProps = {
  /** Classes to apply to the container */
  className?: string;
  /** Impact id value pairs to display on the chart. Defaults to `{}` */
  impact?: Record<Impacts, number>;
  /** Impact category id */
  category: string;
  /** Whether to display the chart in compact mode. Defaults to `false` */
  compactMode?: boolean;
};
