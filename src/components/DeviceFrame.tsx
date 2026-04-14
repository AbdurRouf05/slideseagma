'use client';

import { Smartphone, Wifi, Battery, Signal } from 'lucide-react';

interface DeviceFrameProps {
  imageUrl?: string;
  isLive?: boolean;
  width?: string;
  height?: string;
}

export default function DeviceFrame({ 
  imageUrl, 
  isLive = false, 
  width = '220px', 
  height = '460px' 
}: DeviceFrameProps) {
  
  // Responsive scaling for text/border based on width
  const isSmall = parseInt(width) < 180;
  const borderSize = isSmall ? '6px' : '10px';
  const roundedSize = isSmall ? '1.5rem' : '2.5rem';
  const innerRounded = isSmall ? '1rem' : '1.8rem';

  return (
    <div className="relative shrink-0 flex items-center justify-center p-1" style={{ width, height }}>
      {/* Physical Device Frame */}
      <div 
        className="relative bg-black shadow-[10px_10px_0px_0px_rgba(0,0,0,0.8)] overflow-hidden w-full h-full z-20"
        style={{ 
          border: `${borderSize} solid #222`,
          borderRadius: roundedSize
        }}
      >
        {/* Notch / Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black z-50 rounded-b-xl border-x border-b border-white/5" 
             style={{ width: isSmall ? '50%' : '60%', height: isSmall ? '15px' : '25px' }}
        />

        {/* Status Bar */}
        {!isSmall && (
          <div className="absolute top-7 left-0 w-full px-5 flex justify-between items-center z-40 opacity-30">
            <span className="text-[7px] font-black text-white uppercase tracking-tighter">9:41</span>
            <div className="flex items-center gap-1 text-white">
                <Signal size={6} />
                <Wifi size={6} />
                <Battery size={6} />
            </div>
          </div>
        )}

        {/* Screen Content Area */}
        <div className="absolute inset-x-0 inset-y-0 z-30 bg-neutral-900 overflow-hidden flex items-center justify-center border-[1px] border-white/5"
             style={{ borderRadius: innerRounded }}
        >
          {imageUrl ? (
            <img 
              src={`/${imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl}`} 
              alt="App Screenshot" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
              <div 
                className="bg-accent-yellow border-2 border-black flex items-center justify-center text-black rotate-2"
                style={{ width: isSmall ? '30px' : '50px', height: isSmall ? '30px' : '50px' }}
              >
                 <Smartphone size={isSmall ? 18 : 28} strokeWidth={3} />
              </div>
              {!isSmall && (
                <span className="text-white text-[8px] font-black uppercase tracking-widest bg-emerald-500 px-2 py-0.5">
                  {isLive ? 'LIVE' : 'NO ASSET'}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Gloss Overlay */}
        <div className="absolute inset-0 pointer-events-none z-50 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30" />
      </div>

      {/* Decorative Buttons */}
      {!isSmall && (
        <>
          <div className="absolute left-[-2px] top-24 w-[3px] h-10 bg-[#222] rounded-l-md z-10" />
          <div className="absolute right-[-2px] top-32 w-[3px] h-16 bg-[#222] rounded-r-md z-10" />
        </>
      )}
    </div>
  );
}
