import { FC } from 'react';

import classnames from 'classnames';

import Button from 'components/button';
import Icon from 'components/icon';
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
}: ConfirmationPromptProps) => (
  <Modal open={open} title={title} size="default" dismissable={dismissible} onDismiss={onDismiss}>
    <div className="flex flex-col items-center px-8 py-4">
      <div className="font-serif text-3xl font-semibold text-center text-black">{title}</div>
      <p
        dangerouslySetInnerHTML={{ __html: description }}
        className="mt-4 font-sans text-base text-center text-black"
      />
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
          Cancel
        </Button>
        <Button
          theme="primary-red"
          size="small"
          className="flex-shrink-0 sm:mr-5"
          onClick={onAccept}
        >
          Delete
        </Button>

        {icon && (
          <Icon icon={icon} className="hidden ml-auto sm:block flex-shrink-1 flex-grow-1 w-36" />
        )}
      </div>
    </div>
  </Modal>
);

export default ConfirmationPrompt;
