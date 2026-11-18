import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useLocation, useOutlet } from 'react-router';
import { pageTransition } from '@/shared/motion/transitions';
import { useCompleteLogoutOnArrival } from '@/shared/session/useCompleteLogoutOnArrival';
import { Toast } from '@/shared/ui/Toast';

function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozenOutlet] = useState(outlet);
  return frozenOutlet;
}

export function RootLayout() {
  const location = useLocation();
  useCompleteLogoutOnArrival();

  return (
    <div className="min-h-dvh overflow-x-clip bg-night text-frost">
      <Toast />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-dvh"
        >
          <FrozenOutlet />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
