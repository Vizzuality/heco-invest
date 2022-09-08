import { FC } from 'react';

import Link from 'next/link';

import { OpenCallStatus, Paths } from 'enums';

import { CellApplicationsProps } from './types';

export const CellApplications: FC<CellApplicationsProps> = ({
  row,
  value,
}: CellApplicationsProps) => {
  const {
    original: { slug, status },
  } = row;

  if (status === OpenCallStatus.Draft) return null;

  return (
    <>
      <Link href={`${Paths.DashboardOpenCallDetails}/${slug}`}>
        <a className="inline-flex gap-2 px-2 underline transition-all rounded-full text-green-light focus-visible:outline focus-visible:outline-green-dark focus-visible:outline-2 focus-visible:outline-offset-2">
          {value}
        </a>
      </Link>
    </>
  );
};

export default CellApplications;
