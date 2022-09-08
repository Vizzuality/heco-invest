import { OpenCallApplication } from 'types/open-call-applications';

export type CellStatusProps = {
  cell: {
    value: string;
  };
  row: {
    original: {
      openCallApplication: OpenCallApplication;
    };
  };
};
