import { FC, useMemo } from 'react';

import { AlertTriangle as AlertTriangleIcon, CheckCircle as CheckCircleIcon } from 'react-feather';

import cx from 'classnames';

import { motion, AnimatePresence } from 'framer-motion';

import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';

import type { AlertProps } from './types';

export const Alert: FC<AlertProps> = ({
  className,
  withLayoutContainer = false,
  type = 'warning',
  children,
}: AlertProps) => {
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const alertClassNames = 'flex items-start py-4 text-sm text-black';

  const alertIconColor = useMemo(() => {
    switch (type) {
      case 'success':
        return 'text-green-dark';
      default:
        return 'text-red-700';
    }
  }, [type]);

  const alertIcon = useMemo(() => {
    switch (type) {
      case 'success':
        return CheckCircleIcon;
      default:
        return AlertTriangleIcon;
    }
  }, [type]);

  const alertContent = () => (
    <>
      <Icon
        className={cx({
          'w-5 h-5 mr-2': true,
          [alertIconColor]: true,
        })}
        icon={alertIcon}
      />
      {children}
    </>
  );

  return (
    <AnimatePresence>
      <motion.div
        {...variants}
        role="alert"
        className={cx({
          [className]: !!className,
        })}
      >
        <div
          className={cx({
            'rounded-lg': !withLayoutContainer,
            'bg-red-50': type === 'warning',
            'bg-green-light': type === 'success',
          })}
        >
          {withLayoutContainer ? (
            <LayoutContainer className={alertClassNames}>{alertContent()}</LayoutContainer>
          ) : (
            <div
              className={cx({
                [alertClassNames]: true,
                'px-4': true,
              })}
            >
              {alertContent()}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;
