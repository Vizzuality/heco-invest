import React from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import Loading from 'components/loading';

export const MultiPageLayoutLoading: React.FC = () => {
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      <motion.div {...variants} className="h-screen">
        <main className="flex items-center justify-center w-full h-full">
          <Loading visible={true} iconClassName="w-10 h-10" />
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default MultiPageLayoutLoading;
