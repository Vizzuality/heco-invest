import { OpenCallStatus } from 'enums';

export type CellActionsProps = {
  row: {
    original: {
      id: string;
      slug: string;
      openCallName: string;
    };
  };
};
