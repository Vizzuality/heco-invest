import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import classnames from 'classnames';

import Alert from 'components/alert';
import Button from 'components/button';
import Icon from 'components/icon';
import Loading from 'components/loading';
import Modal from 'components/modal';

import type { ConfirmationPromptProps } from './types';

export const ConfirmationPrompt: FC<ConfirmationPromptProps> = ({
  title,
  description,
  open,
  dismissible = true,
  icon,
  onDismiss,
  onAccept,
  onRefuse,
  onAcceptLoading = false,
  confirmationError,
}: ConfirmationPromptProps) => (
  <Modal open={open} title={title} size="default" dismissable={dismissible} onDismiss={onDismiss}>
    <div className="flex flex-col items-center px-8 py-4">
      <div className="font-serif text-3xl font-semibold text-center text-black">{title}</div>
      <p className="mt-4 font-sans text-base text-center text-black">{description}</p>
      {!!confirmationError && (
        <div className="w-full mt-6">
          <Alert type="warning" withLayoutContainer={true}>
            {confirmationError}
          </Alert>
        </div>
      )}
      <div
        className={classnames({
          'flex justify-start items-end': true,
          'mt-10 sm:mt-12': !icon && !description,
          'mt-8': !icon && !!description,
          'mt-10 sm:mt-1': !!icon && !description,
          'mt-8 sm:-mt-2': !!icon && !!description,
        })}
      >
        <Button
          theme="secondary-green"
          size="small"
          className="flex-shrink-0 mr-5"
          onClick={onRefuse}
        >
          <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
        </Button>
        <Button
          theme="primary-red"
          size="small"
          className="flex-shrink-0 sm:mr-5"
          onClick={onAccept}
          disabled={onAcceptLoading}
        >
          <Loading className="mr-2" visible={onAcceptLoading} />
          {!confirmationError ? (
            <FormattedMessage defaultMessage="Delete" id="K3r6DQ" />
          ) : (
            <FormattedMessage defaultMessage="Try again" id="FazwRl" />
          )}
        </Button>

        {icon && (
          <Icon icon={icon} className="hidden ml-auto sm:block flex-shrink-1 flex-grow-1 w-36" />
        )}
      </div>
    </div>
  </Modal>
);

export default ConfirmationPrompt;
