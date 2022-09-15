import React, { cloneElement, useEffect } from 'react';

import { OverlayContainer, useOverlayPosition } from 'react-aria';

import cx from 'classnames';

import { useButton } from '@react-aria/button';
import { useMenuTrigger } from '@react-aria/menu';
import { useMenuTriggerState } from '@react-stately/menu';
import { noop } from 'lodash-es';

import Popup from './popup';
import { MenuProps } from './types';

export const Menu: React.FC<MenuProps> = ({
  className,
  Trigger,
  children,
  disabledKeys = [],
  expandedKeys = [],
  onAction,
  header,
  hiddenSections,
  onOpen = noop,
  onClose = noop,
  ...rest
}: MenuProps) => {
  const triggerRef = React.useRef(null);
  const overlayRef = React.useRef(null);

  const state = useMenuTriggerState(rest);
  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, triggerRef);
  const { buttonProps } = useButton(
    {
      ...menuTriggerProps,
      elementType: Trigger.type as React.JSXElementConstructor<any> | React.ElementType<any>,
    },
    triggerRef
  );

  const align = rest.align ?? 'start';
  const direction = rest.direction ?? 'bottom';

  let { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: `${direction} ${align}`,
    offset: 8,
    isOpen: state.isOpen,
  });

  useEffect(() => {
    if (state.isOpen) {
      onOpen();
    } else {
      onClose();
    }
  }, [onClose, onOpen, state.isOpen]);

  return (
    <div className={cx('relative', className)}>
      {cloneElement(Trigger, { ref: triggerRef, ...buttonProps })}
      {state.isOpen && (
        <OverlayContainer>
          <Popup
            {...positionProps}
            overlayRef={overlayRef}
            triggerRef={triggerRef}
            domProps={menuProps}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={state.focusStrategy}
            disabledKeys={disabledKeys}
            expandedKeys={expandedKeys}
            onClose={() => state.close()}
            onAction={onAction}
            header={header}
            hiddenSections={hiddenSections}
          >
            {children}
          </Popup>
        </OverlayContainer>
      )}
    </div>
  );
};

export default Menu;
