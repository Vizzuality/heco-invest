import { FC } from 'react';

import { useHover } from 'react-aria';
import { Trash2 as TrashIcon } from 'react-feather';

import { motion, AnimatePresence } from 'framer-motion';

import Icon from 'components/icon';
import Loading from 'components/loading';

import { CardHoverToDeleteProps } from './types';

export const CardHoverToDelete: FC<CardHoverToDeleteProps> = ({
  children,
  loading = false,
  onClick,
}: CardHoverToDeleteProps) => {
  const { hoverProps, isHovered } = useHover({});

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.25 },
  };

  return (
    <div className="relative" {...hoverProps}>
      {isHovered && (
        <AnimatePresence>
          <motion.span className="absolute top-0 z-10 -translate-y-1/2 right-5" {...variants}>
            <button
              type="button"
              onClick={onClick}
              disabled={loading}
              className="relative flex items-center justify-center w-8 h-8 bg-white border rounded-full pointer border-green-dark"
            >
              <span className="absolute top-0 left-0 w-full h-full transition rounded-full hover:bg-green-light hover:bg-opacity-20" />
              <Loading visible={loading} />
              {!loading && <Icon className="w-3.5 h-3.5 text-green-dark" icon={TrashIcon} />}
            </button>
          </motion.span>
        </AnimatePresence>
      )}
      {children}
    </div>
  );
};

export default CardHoverToDelete;
