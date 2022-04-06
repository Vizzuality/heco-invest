export enum EnumTypes {
  'category',
  'instrument_type',
  'ticket_size',
  'impact',
  'project_developer_type',
  'investor_type',
  'location_type',
}

export type Enum = {
  id: string;
  type: string;
  attributes: {
    name: string;
    color?: string;
    description?: string;
  };
};
