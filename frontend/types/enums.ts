import { EnumTypes } from 'enums';

export type Enum = {
  id: string;
  type: EnumTypes;
  attributes: {
    name: string;
    color?: string;
    description?: string;
  };
};

export type GroupedEnums = {
  [key in EnumTypes]: Enum[];
};
