import React from 'react';

import Image from 'next/image';

import { CellUserProps } from './types';

export const CellUser = ({ row }: CellUserProps) => {
  if (!row) return null;
  const {
    original: { first_name, last_name, picture },
  } = row;
  return (
    <div className="flex items-center space-x-6">
      <Image src={picture} alt={first_name} width={32} height={32} className="rounded-full" />
      <p>{`${first_name} ${last_name}`}</p>
    </div>
  );
};

export default CellUser;
