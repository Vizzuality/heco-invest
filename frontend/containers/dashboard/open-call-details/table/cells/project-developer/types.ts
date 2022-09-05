import { ProjectDeveloper } from 'types/projectDeveloper';

export type CellProjectDeveloperProps = {
  cell: {
    value: string;
  };
  row: {
    original: {
      projectDeveloper: ProjectDeveloper;
    };
  };
};
