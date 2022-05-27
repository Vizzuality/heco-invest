export type ImpactChartProps = {
  /** Classes to apply to the container */
  className?: string;
  impact?: number[];
  category: string;
  /** Whether to display the chart in compact mode. Defaults to `false` */
  compactMode?: boolean;
};
