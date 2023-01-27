export interface DiscoverMapProps {
  onSelectProjectPin: (projectId: string) => void;
}

export type SelectLayerInfoType = {
  id: string;
  name: string;
  description: string;
  overview?: string | string[];
  dataSource: string;
  dataSourceUrl: string;
};
