export type LayerInfoModalProps = {
  layer: {
    id: string;
    name: string;
    description: string;
    overview?: string | string[];
    dataSource: string;
    dataSourceUrl: string;
  };
};
