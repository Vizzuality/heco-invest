import React from 'react';

import { Info } from 'react-feather';

import Tooltip from 'components/tooltip';

import { FieldInfoProps } from './types';

const FieldInfo = ({ infoText }: FieldInfoProps) => {
  return (
    <Tooltip
      placement="right"
      arrow
      arrowClassName="bg-black"
      className="max-w-md"
      content={
        <div className="max-w-md p-2 font-sans text-sm font-normal text-white bg-black rounded-sm">
          {infoText}
        </div>
      }
    >
      <Info className="inline cursor-pointer" size={14.67} />
    </Tooltip>
  );
};

export default FieldInfo;
