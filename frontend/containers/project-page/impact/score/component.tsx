import React from 'react';

import { FormattedMessage } from 'react-intl';

import Tooltip from 'components/tooltip';

export const Score = () => {
  return (
    <div className="flex flex-col items-center p-6 font-semibold bg-white w-52 rounded-xl">
      <p className="text-green-dark">
        <span className="text-2xl">30</span>/ 100
      </p>
      <div className="flex items-center space-x-2">
        <p className="text-base text-gray-800">
          <FormattedMessage defaultMessage="Impact score" id="2GBpne" />
        </p>

        <Tooltip
          placement="right"
          arrow
          arrowClassName="bg-black"
          content={
            <div className="max-w-md p-2 font-sans text-sm font-normal text-white bg-black rounded-sm w-72">
              <FormattedMessage
                defaultMessage="Integration of project impact in each dimension (climate, biodiversity, water community) into a single score, ranging from 0 to 100."
                id="sFn7MX"
              />
            </div>
          }
        >
          <button
            type="button"
            className="box-border flex items-center justify-center w-4 h-4 text-gray-800 border border-gray-800 rounded-full pointer"
          >
            <p className="text-xs">i</p>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Score;
