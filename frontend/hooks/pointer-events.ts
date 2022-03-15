import { useCallback, useRef, PointerEventHandler } from 'react';

// Based on: https://github.com/adobe/react-spectrum/issues/2100#issuecomment-940937008
export const usePropagablePointerEventHandler = <T>(
  eventType: 'pointerdown' | 'pointerup' | 'pointermove',
  onPointerEvent: PointerEventHandler<T> | undefined
) => {
  const isEventRealRef = useRef(true);

  const handlePointerEvent: PointerEventHandler<T> = useCallback(
    (event) => {
      const { target, nativeEvent } = event;
      const clonedNativeEvent = new PointerEvent(eventType, nativeEvent);

      if (!isEventRealRef.current) {
        isEventRealRef.current = true;
        return;
      }

      onPointerEvent?.(event);

      if (event.isPropagationStopped()) {
        isEventRealRef.current = false;
        target.dispatchEvent(clonedNativeEvent);
      }
    },
    [eventType, onPointerEvent]
  );

  return handlePointerEvent;
};
