import { FC, useRef } from 'react';

import cx from 'classnames';

import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { useOverlay, usePreventScroll, useModal, OverlayContainer } from '@react-aria/overlays';
import { AnimatePresence, motion } from 'framer-motion';

import Button from 'components/button';
import Icon from 'components/icon';

import XIcon from 'svgs/x.svg?sprite';

import { CONTENT_CLASSES, OVERLAY_CLASSES } from './constants';
import type { ModalProps } from './types';

export const Modal: FC<ModalProps> = ({
  title,
  open,
  dismissable = true,
  size = 'default',
  children,
  className,
  scrollable = true,
  onDismiss,
}: ModalProps) => {
  const containerRef = useRef();
  const { overlayProps } = useOverlay(
    {
      isKeyboardDismissDisabled: !dismissable,
      isDismissable: dismissable,
      isOpen: open,
      onClose: onDismiss,
    },
    containerRef
  );
  const { modalProps } = useModal();
  const { dialogProps } = useDialog({ 'aria-label': title }, containerRef);

  usePreventScroll({ isDisabled: !open });

  return (
    <AnimatePresence>
      {open && (
        <OverlayContainer>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0.125,
              },
            }}
            className={cx({ [OVERLAY_CLASSES]: true })}
          >
            <FocusScope contain restoreFocus autoFocus>
              <div {...overlayProps} {...dialogProps} {...modalProps} ref={containerRef}>
                <motion.div
                  initial={{
                    opacity: 0,
                    y: '-60%',
                    x: '-50%',
                  }}
                  animate={{
                    opacity: 1,
                    y: '-50%',
                    x: '-50%',
                    transition: {
                      delay: 0.125,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: '-60%',
                    x: '-50%',
                    transition: {
                      delay: 0,
                    },
                  }}
                  className={cx({ [CONTENT_CLASSES[size]]: true, [className]: !!className })}
                  style={{
                    maxHeight: '90%',
                  }}
                >
                  {dismissable && (
                    <div className="relative">
                      <Button
                        theme="naked"
                        onClick={onDismiss}
                        className="absolute top-0 text-gray-400 -translate-y-full md:top-4 -right-3 md:-right-4 focus:text-black hover:text-black group"
                      >
                        <span className="sr-only">Close</span>
                        <Icon
                          icon={XIcon}
                          className="inline-block w-6 h-6 transition-all fill-current group-hover:rotate-180 group-focus-within:rotate-180"
                        />
                      </Button>
                    </div>
                  )}

                  {!scrollable && children}
                  {scrollable && <div className="overflow-y-auto flex-grow-1">{children}</div>}
                </motion.div>
              </div>
            </FocusScope>
          </motion.div>
        </OverlayContainer>
      )}
    </AnimatePresence>
  );
};

export default Modal;
