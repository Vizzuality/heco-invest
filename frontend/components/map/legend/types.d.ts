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
  name: string;
  items: LegendItem[];
  type: LegendType;
  group: LAYER_GROUPS;
  isResourceWatch: boolean;
};
