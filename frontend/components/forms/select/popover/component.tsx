import React, { useRef } from 'react';

import { useOverlay, DismissButton, FocusScope } from 'react-aria';

import cx from 'classnames';

import { PopoverProps } from './types';

export const Popover = (props: PopoverProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { popoverRef = ref, isOpen, onClose, children } = props;

  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur: true,
      isDismissable: true,
    },
    popoverRef
  );

  return (
    <FocusScope restoreFocus>
      <div
        {...overlayProps}
        ref={popoverRef}
        className={cx(
          'z-30 w-full absolute left-0 transform bg-white shadow-2xl rounded-md overflow-hidden',
          props.direction === 'top' ? '-top-2 -translate-y-full' : '-bottom-2 translate-y-full'
        )}
      >
        {children}
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  );
};

export default Popover;
