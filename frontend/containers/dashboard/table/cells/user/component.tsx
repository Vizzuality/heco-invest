import React from 'react';

import Image from 'next/image';

import { CellUserProps } from './types';

export const CellUser = ({ row }: CellUserProps) => {
  if (!row) return null;
  const {
    original: { displayName, image },
  } = row;
  return (
    <div className="flex items-center space-x-6">
      <Image src={image} alt={displayName} width={32} height={32} className="rounded-full" />
      <p>{displayName}</p>
    </div>
  );
};

export default CellUser;
