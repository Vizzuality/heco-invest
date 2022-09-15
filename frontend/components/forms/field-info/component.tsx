import React from 'react';

import { Info } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import Button from 'components/button';
import Tooltip from 'components/tooltip';

import { FieldInfoProps } from './types';

export const FieldInfo = ({ content }: FieldInfoProps) => {
  return (
    <Tooltip
      placement="auto"
      arrow
      arrowClassName="bg-black"
      content={
        <div className="max-w-xs p-2 font-sans text-sm font-normal text-white bg-black rounded-sm sm:max-w-md">
          {content}
        </div>
      }
      // This is needed in cases where, for example, we have a link inside the tooltip
      interactive
    >
      <Button size="smallest" theme="naked" className="inline-flex align-middle">
        <span className="sr-only">
          <FormattedMessage defaultMessage="Info" id="we4Lby" />
        </span>
        <Info
          className="inline rounded cursor-pointer focus:border focus:border-green-dark focus:outline-none"
          size={14.67}
        />
      </Button>
    </Tooltip>
  );
};

export default FieldInfo;
