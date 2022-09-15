import React from 'react';

import { ErrorMessageProps } from './types';

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorText, id }) => {
  return errorText ? (
    <span id={id} className="block mt-1.5 ml-1.5 text-red-600 text-xs">
      {errorText}
    </span>
  ) : null;
};

export default ErrorMessage;
