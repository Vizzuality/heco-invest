import React from 'react';

import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { InvitationStatus } from 'enums';

import { CellInvitationProps } from './types';

export const CellInvitation = ({ value }: CellInvitationProps) => {
  if (value === undefined) return null;

  const getInvitationStatus = (status: string) => {
    switch (status) {
      case InvitationStatus.Completed:
        return <FormattedMessage defaultMessage="Accepted" id="aFyFm0" />;
      case InvitationStatus.Waiting:
        return <FormattedMessage defaultMessage="Waiting" id="dZd8H/" />;
      case InvitationStatus.Expired:
        return <FormattedMessage defaultMessage="Expired" id="RahCRH" />;
      default:
        return null;
    }
  };

  console.log(value);

  return (
    <div
      className={cx({
        'items-center inline-block px-2.5 py-0.5 bg-opacity-20 rounded-2xl': true,
        'bg-green-light': value === InvitationStatus.Completed,
        'bg-orange ml-2': value === InvitationStatus.Waiting,
        'bg-red-300 ml-2': value === InvitationStatus.Expired,
      })}
    >
      <p
        className={cx('text-sm', {
          'text-green-dark': value === InvitationStatus.Completed,
          'text-orange': value === InvitationStatus.Waiting,
          'text-red-700': value === InvitationStatus.Expired,
        })}
      >
        {getInvitationStatus(value)}
      </p>
    </div>
  );
};

export default CellInvitation;
