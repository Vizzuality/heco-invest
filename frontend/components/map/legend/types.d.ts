export interface LegendProps {
  className?: string;
  children: React.ReactNode;
  maxHeight?: string | number;
  onChangeOrder: (id: string[]) => void;
}

export type LegendItem = {
  color: string;
  label?: string;
  opacity?: number;
};

export type LegendType = 'basic' | 'choropleth' | 'gradient';

export type Legend = {
  id: string;
  name: string;
  items: LegendItem[];
  type: LegendType;
};
