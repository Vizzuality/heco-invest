import React from 'react';

import { Info } from 'react-feather';

import Tooltip from 'components/tooltip';

import { FieldInfoProps } from './types';

export const FieldInfo = ({ infoText }: FieldInfoProps) => {
  return (
    <Tooltip
      placement="right"
      arrow
      arrowClassName="bg-black"
      content={
        <div className="max-w-md p-2 font-sans text-sm font-normal text-white bg-black rounded-sm">
          {infoText}
        </div>
      }
    >
      <Info
        className="inline rounded cursor-pointer focus:border focus:border-green-dark focus:outline-none"
        size={14.67}
      />
    </Tooltip>
  );
};

export default FieldInfo;
