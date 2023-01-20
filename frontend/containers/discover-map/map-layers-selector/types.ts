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
  /** Whether the layer selector is open */
  layerSelectorOpen: boolean;
  /** Function to change if the layer selector is open */
  setLayerSelectorOpen: (isOpen: boolean) => void;
};

export type MapLayersSelectorForm = {
  [key in LAYER_GROUPS]: [string];
};
