'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

interface NavigationProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  showTP: boolean;
  setShowTP: (v: boolean) => void;
}

export function SlideNav({ current, total, onPrev, onNext, showTP, setShowTP }: NavigationProps) {
  return (
    <div className="nav-controls">
      <button 
        className="nav-btn" 
        onClick={() => setShowTP(!showTP)}
        title="Toggle Talking Points (T)"
      >
        <MessageSquare size={20} className={showTP ? 'text-emerald-500' : 'text-slate-400'} />
      </button>
      <button 
        className="nav-btn" 
        onClick={onPrev} 
        disabled={current <= 1}
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        className="nav-btn" 
        onClick={onNext} 
        disabled={current >= total}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

export function ProgressBar({ current, total }: { current: number, total: number }) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="progress-container">
      <motion.div 
        className="progress-bar"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      />
    </div>
  );
}
