import { EnumTypes } from 'enums';

export type Enum = {
  id: string;
  type: EnumTypes;
  name: string;
  color?: string;
  description?: string;
  image?: string;
};

export type GroupedEnums = {
  [key in EnumTypes]: Enum[];
};
