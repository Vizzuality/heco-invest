import React from 'react';

import { FormattedMessage } from 'react-intl';

import { CellRoleProps } from './types';

export const CellRole = ({ value }: CellRoleProps) => {
  if (value === undefined) return null;

  return (
    <div className="items-center">
      <p>
        {value && <FormattedMessage defaultMessage="Owner" id="zINlao" />}
        {!value && <FormattedMessage defaultMessage="User" id="EwRIOm" />}
      </p>
    </div>
  );
};

export default CellRole;
