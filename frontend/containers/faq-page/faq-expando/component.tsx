import { FC, useState, useRef, useEffect, useCallback } from 'react';

import { ChevronUp as ChevronUpIcon } from 'react-feather';

import cx from 'classnames';

import { useScrollToElement } from 'hooks/useScrollToElement';

import Expando from 'components/expando';

import type { FaqExpandoProps } from './types';
import Button from 'components/button';

export const FaqExpando: FC<FaqExpandoProps> = ({
  className,
  defaultOpen = false,
  questionId: id,
  question,
  children: answer,
}: FaqExpandoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const scrollToElement = useScrollToElement();

  useEffect(() => {
    if (defaultOpen) scrollToElement(containerRef, 96);
  }, [defaultOpen, scrollToElement]);

  return (
    <div
      key={id}
      ref={containerRef}
      className={cx({
        'bg-white border-b border-bg-dark': true,
        [className]: !!className,
      })}
    >
      <Expando
        defaultOpen={isOpen}
        duration={0.4}
        onChange={setIsOpen}
        title={
          <div className="flex items-center justify-between w-full px-6 py-5 text-left">
            <span className="text-lg font-semibold text-black">{question}</span>
            <Button theme="naked" size="smallest">
              <ChevronUpIcon
                className={cx({
                  'w-6 h-6 transition-all duration-500': true,
                  'rotate-180': !isOpen,
                  'rotate-0': isOpen,
                })}
              />
            </Button>
          </div>
        }
      >
        <div className="px-6 pb-5">{answer}</div>
      </Expando>
    </div>
  );
};

export default FaqExpando;
