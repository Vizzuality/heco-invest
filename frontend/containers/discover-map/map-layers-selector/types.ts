import { UseFormRegister } from 'react-hook-form';
import { string } from 'yup/lib/locale';

export type MapLayersSelectorProps = {
  /** Classes to apply to the container */
  className?: string;
  /** Callback returning an array active layers */
  onActiveLayersChange: (activeLayers: string[]) => void;
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
