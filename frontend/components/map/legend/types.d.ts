import { LAYER_GROUPS } from 'hooks/useLayers';

export interface LegendProps {
  className?: string;
  children: React.ReactNode;
  maxHeight?: string | number;
}

export type LegendItem = {
  color: string;
  label?: string;
  opacity?: number;
};

export type LegendType = 'basic' | 'choropleth' | 'gradient' | 'monocolor';

export type Legend = {
  id: string;
  description: string;
  name: string;
  legend: {
    items: LegendItem[];
    type: LegendType;
  };
  group: LAYER_GROUPS;
  isResourceWatch: boolean;
  dataSource: string;
  dataSourceUrl: string;
  overview: string;
  specification: string;
};
