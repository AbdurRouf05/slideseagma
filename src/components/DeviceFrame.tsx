'use client';

import { motion } from 'framer-motion';
import { Smartphone, Play } from 'lucide-react';

interface DeviceFrameProps {
  videoUrl?: string;
  isLive?: boolean;
}

export default function DeviceFrame({ videoUrl, isLive = false }: DeviceFrameProps) {
  return (
    <div className="relative mx-auto" style={{ width: '180px', height: '380px' }}>
      {/* Device Body */}
      <div className="absolute inset-0 bg-neutral-900 border-[4px] border-black shadow-[10px_10px_0px_0px_var(--accent-blue)] overflow-hidden">
        {/* Notch Area (Stylized) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-black z-20" />
        
        {/* Screen Content */}
        <div className="absolute inset-0 z-10 bg-black flex items-center justify-center">
          {videoUrl ? (
            <video 
              src={`/videos/${videoUrl}`} 
              className="w-full h-full object-cover"
              autoPlay 
              loop 
              muted 
              playsInline
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-center px-4">
              <div className="w-12 h-12 bg-accent-yellow border-2 border-black flex items-center justify-center text-black">
                <Smartphone size={24} />
              </div>
              <div>
                <p className="text-white text-xs font-black uppercase mb-1">
                  {isLive ? 'Live Ready' : 'Demo Slot'}
                </p>
              </div>
              {!isLive && (
                <div className="mt-2 p-1 bg-white border-2 border-black flex items-center gap-2">
                  <Play size={10} className="text-black" />
                  <span className="text-[8px] text-black font-mono font-bold uppercase">{videoUrl || 'demo.mp4'}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
