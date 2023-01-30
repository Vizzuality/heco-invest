import { LAYER_GROUPS } from 'hooks/useLayers';

import { Legend } from 'components/map/legend/types';

import { SelectLayerInfoType } from '../types';

export type LayerLegendProps = {
  layersLegends: Legend[];
  className: string;
  maxHeight?: number | string;
  onCloseLegend: (layerGroup: LAYER_GROUPS) => void;
  setSelectedLayerInfo: (layer: SelectLayerInfoType) => void;
};
