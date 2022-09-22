import { Legend } from 'components/map/legend/types';

export type LayerLegendProps = {
  layersLegends: Legend[];
  className: string;
  maxHeight?: number | string;
  onCloseLegend: (id: string) => void;
};
