import React, { cloneElement } from 'react';

import cx from 'classnames';

import { useButton } from '@react-aria/button';
import { useMenuTrigger } from '@react-aria/menu';
import { useMenuTriggerState } from '@react-stately/menu';

import Popup from './popup';
import { MenuProps } from './types';

export const Menu: React.FC<MenuProps> = ({
  className,
  Trigger,
  children,
  disabledKeys = [],
  expandedKeys = [],
  onAction,
  ...rest
}: MenuProps) => {
  const triggerRef = React.useRef(null);

  const state = useMenuTriggerState(rest);
  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, triggerRef);
  const { buttonProps } = useButton(
    {
      ...menuTriggerProps,
      elementType: Trigger.type as React.JSXElementConstructor<any> | React.ElementType<any>,
    },
    triggerRef
  );

  return (
    <div className={cx('relative', className)}>
      {cloneElement(Trigger, { ref: triggerRef, ...buttonProps })}
      {state.isOpen && (
        <Popup
          triggerRef={triggerRef}
          align={rest.align ?? 'start'}
          direction={rest.direction ?? 'bottom'}
          domProps={menuProps}
          autoFocus={state.focusStrategy}
          disabledKeys={disabledKeys}
          expandedKeys={expandedKeys}
          onClose={() => state.close()}
          onAction={onAction}
        >
          {children}
        </Popup>
      )}
    </div>
  );
};

export default Menu;
