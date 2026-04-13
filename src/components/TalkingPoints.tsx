'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

interface TalkingPointsProps {
  content: string;
  isVisible: boolean;
}

export default function TalkingPoints({ content, isVisible }: TalkingPointsProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="talking-points-panel"
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="tp-title">
            <Info size={16} />
            <span>Presenter Notes</span>
          </div>
          <p className="tp-content">{content}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
