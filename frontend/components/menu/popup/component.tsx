import React from 'react';

import cx from 'classnames';

import { FocusScope } from '@react-aria/focus';
import { useMenu } from '@react-aria/menu';
import { useOverlay, DismissButton } from '@react-aria/overlays';
import { mergeProps } from '@react-aria/utils';
import { useTreeState } from '@react-stately/tree';

import Item from '../item';
import Section from '../section';

import { PopupProps } from './types';

export const Popup: React.FC<PopupProps> = ({
  triggerRef,
  overlayRef,
  autoFocus,
  domProps,
  children,
  disabledKeys,
  expandedKeys,
  onClose,
  onAction,
  header,
  hiddenSections = {},
  ...otherProps
}: PopupProps) => {
  const ref = React.useRef(null);

  const state = useTreeState({ children, selectionMode: 'none', disabledKeys, expandedKeys });
  const { menuProps } = useMenu({ autoFocus, children }, state, ref);
  const { overlayProps } = useOverlay(
    {
      onClose,
      shouldCloseOnBlur: true,
      isOpen: true,
      isDismissable: true,
      // Without the next line, users on iOS 12.5 (at minimum), some Android users and even us
      // testing using the responsive mode of Firefox have found an issue where the menu auto-closes
      // right after being triggered.
      // It seems that after the click on the trigger has been registered, another event is
      // dispatched later when the popup menu has already opened. Since the trigger is not part of
      // it, React Aria detects it as a click on an external element and closes the popup
      // immediately.
      // The problem does not come from this code but React Aria itself unfortunately. The same
      // issue can be replicated using their own menu example:
      // https://react-spectrum.adobe.com/react-aria/useMenuTrigger.html#example
      shouldCloseOnInteractOutside: (el) => !triggerRef.current.contains(el),
    },
    overlayRef
  );

  return (
    <FocusScope restoreFocus>
      <div {...mergeProps(overlayProps, otherProps)} ref={overlayRef} className="!z-30">
        <DismissButton onDismiss={onClose} />
        <div
          {...mergeProps(menuProps, domProps)}
          ref={ref}
          className="overflow-hidden bg-white rounded-md shadow-2xl whitespace-nowrap"
        >
          {header && (
            <div id="popup-header" className="p-4 pb-0">
              {header}
            </div>
          )}
          <ul className={cx({ 'pl-16 pr-4 pb-4': !!header })}>
            {Array.from(state.collection).map((item) => {
              if (item.type === 'section') {
                return (
                  <Section
                    key={item.key}
                    section={item}
                    state={state}
                    onAction={onAction}
                    onClose={onClose}
                    hidden={hiddenSections?.[item.key]}
                  />
                );
              }
              return (
                <Item
                  key={item.key}
                  item={item}
                  state={state}
                  onAction={onAction}
                  onClose={onClose}
                />
              );
            })}
          </ul>
        </div>
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  );
};

export default Popup;
