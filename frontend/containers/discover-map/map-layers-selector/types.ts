import { UseFormRegister } from 'react-hook-form';

export type MapLayersSelectorProps = {
  /** Classes to apply to the container */
  className?: string;
  /** List of active layers */
  initialActiveLayers: string[];

  register: UseFormRegister<any>;
};

export type MapLayersSelectorForm = {
  activeLayers: string[];
};

export type SelectedLayerTooltip = {
  id: string;
  name: string;
  description: string;
  overview?: string | string[];
  dataSource: string;
  dataSourceUrl: string;
};
