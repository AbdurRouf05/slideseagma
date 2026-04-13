'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function InteractiveBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset values for subtle movement
      mouseX.set(e.clientX * 0.1);
      mouseY.set(e.clientY * 0.1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="bg-mesh">
      <motion.div 
        className="mesh-circle circle-1"
        style={{ x: springX, y: springY }}
      />
      <motion.div 
        className="mesh-circle circle-2"
        style={{ x: springY, y: springX }} // Slightly different movement
      />
      
      {/* Additional stationary glow points for depth */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
          filter: 'blur(50px)'
        }} 
      />
    </div>
  );
}
