import { RegisterOptions, UseFormRegister } from 'react-hook-form';

import { LAYER_GROUPS } from 'hooks/useLayers';

export type MapLayersSelectorProps = {
  /** Classes to apply to the container */
  className?: string;
  /** UseForm register function */
  register: UseFormRegister<MapLayersSelectorForm>;
  /** UseForm register options */
  registerOptions: RegisterOptions<MapLayersSelectorForm>;
  /** Number of visible layers on map */
  visibleLayers?: number;
};

export type MapLayersSelectorForm = {
  [key in LAYER_GROUPS]: [string];
};

export type SelectedLayerTooltip = {
  id: string;
  name: string;
  description: string;
  overview?: string | string[];
  dataSource: string;
  dataSourceUrl: string;
};
