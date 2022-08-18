import { FC } from 'react';

import { CellInstrumentTypesProps } from '.';

export const CellInstrumentTypes: FC<CellInstrumentTypesProps> = ({ value }) => {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {value?.map((value) => (
        <span
          className="whitespace-nowrap inline border border-beige text-sm px-2.5 py-0.5 rounded-2xl"
          key={value}
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default CellInstrumentTypes;
