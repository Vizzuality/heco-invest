import { FC } from 'react';

import Link from 'next/link';

import { CellProjectDeveloperProps } from './types';

export const CellProjectDeveloper: FC<CellProjectDeveloperProps> = ({
  row,
  cell,
}: CellProjectDeveloperProps) => {
  const {
    original: { projectDeveloper },
  } = row;

  const { value } = cell;

  return (
    <div className="flex flex-col">
      <span className="text-gray-600">{value}</span>
      <span>
        <Link href={`mailto:${projectDeveloper?.contact_email}`}>
          <a
            className="px-2 py-1 -mx-2 underline transition-all text-green-dark focus-visible:outline-green-dark rounded-2xl"
            target="_blank"
          >
            {projectDeveloper?.contact_email}
          </a>
        </Link>
      </span>
    </div>
  );
};

export default CellProjectDeveloper;
