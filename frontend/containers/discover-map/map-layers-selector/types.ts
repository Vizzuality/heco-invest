export type MapLayersSelectorProps = {
  /** Classes to apply to the container */
  className?: string;
  /** Callback returning an array active layers */
  onActiveLayersChange: (activeLayers: string[]) => void;
};

export type MapLayersSelectorForm = {
  activeLayers: string[];
};
