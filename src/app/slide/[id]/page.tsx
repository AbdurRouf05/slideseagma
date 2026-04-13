'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { slides } from '@/data/slides';
import { SlideNav, ProgressBar } from '@/components/Navigation';
import TalkingPoints from '@/components/TalkingPoints';
import DeviceFrame from '@/components/DeviceFrame';
import ShinyText from '@/components/react-bits/ShinyText';
import { 
  CheckCircle2, 
  AlertCircle, 
  Layout, 
  Share2, 
  Layers, 
  ShieldAlert, 
  MapPinOff, 
  MonitorSmartphone, 
  Clock, 
  Link,
  UserCog,
  Fingerprint
} from 'lucide-react';

export default function SlidePage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string) || 1;
  const slideIndex = id - 1;
  const slide = slides[slideIndex];

  const [showTP, setShowTP] = useState(false);
  const [direction, setDirection] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        navigate(1);
      } else if (e.key === 'ArrowLeft') {
        navigate(-1);
      } else if (e.key.toLowerCase() === 't') {
        setShowTP(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [id]);

  const navigate = (dir: number) => {
    const newId = id + dir;
    if (newId >= 1 && newId <= slides.length) {
      setDirection(dir);
      router.push(`/slide/${newId}`);
    }
  };

  if (!slide) return <div className="p-10 text-emerald-500">Slide not found...</div>;

  return (
    <div className="slide-container">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={id}
          custom={direction}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className={`glass-card flex flex-col ${slide.type === 'cover' ? 'items-center text-center py-12 md:py-20' : 'items-start text-left'}`}
        >
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full"
          >
            <ShinyText 
                text={slide.title} 
                className={`title-reveal ${slide.type === 'cover' ? 'large' : ''}`} 
                speed={2} 
            />
            {slide.subtitle && (
              <div className={`mt-2 mb-8 ${slide.type === 'cover' ? 'flex justify-center' : ''}`}>
                <span className="subtitle" style={{ 
                  color: slide.type === 'cover' ? 'white' : 'var(--accent-blue)',
                  fontSize: slide.type === 'cover' ? '1.5rem' : '1.25rem'
                }}>{slide.subtitle}</span>
              </div>
            )}
          </motion.div>

          {/* Content Area */}
          <div className={`w-full flex flex-col ${slide.type === 'cover' ? 'items-center justify-center mt-10' : 'md:flex-row items-start justify-between mt-2'} gap-10`}>
            
            {/* List Type Content */}
            {(slide.type === 'list' || slide.type === 'conclusion') && (
              <div className="flex flex-col gap-2 text-left w-full max-w-2xl">
                {slide.points?.map((point, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className="list-item-card"
                  >
                    <div className="text-black shrink-0">
                      {slide.type === 'conclusion' ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        id === 19 ? (
                          idx === 0 ? <ShieldAlert size={18} /> : 
                          idx === 1 ? <MapPinOff size={18} /> :
                          idx === 2 ? <MonitorSmartphone size={18} /> :
                          idx === 3 ? <Clock size={14} /> :
                          <Link size={18} />
                        ) : (
                          <div className="w-3 h-3 bg-black" />
                        )
                      )}
                    </div>
                    <span className="text-base font-black tracking-tight">{point}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Diagram Type Content */}
            {slide.type === 'diagram' && (
              <div className="grid grid-cols-1 gap-3 w-full">
                {[
                  { icon: Layout, title: "OFFLINE-FIRST", desc: "Penyimpanan lokal dengan Isar DB. Tetap bisa absen tanpa sinyal.", color: "var(--accent-blue)" },
                  { icon: Share2, title: "AUTO-SYNC", desc: "Sinkronisasi background otomatis ke PocketBase saat internet aktif.", color: "var(--accent-yellow)" },
                  { icon: Layers, title: "SECURE VALIDATION", desc: "Pengecekan berlapis: NTP Time, Fake GPS, dan Device ID unik.", color: "black" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="p-4 border-2 border-black bg-white flex items-start gap-5 shadow-[4px_4px_0px_0px_#000]"
                  >
                    <div className="shrink-0 py-1" style={{ color: item.color === 'black' ? '#000' : item.color }}>
                      <item.icon size={28} strokeWidth={3} />
                    </div>
                    <div className="flex flex-col text-left">
                      <h4 className="text-xl font-black tracking-tight leading-none mb-1">{item.title}</h4>
                      <p className="text-sm font-bold text-slate-500 leading-tight">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Video Type Content */}
            {slide.type === 'video' && (
              <motion.div 
                initial={{ opacity: 0, rotate: -2 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full flex justify-center py-2"
                style={{ filter: 'drop-shadow(10px 10px 0px #000)' }}
              >
                <DeviceFrame videoUrl={slide.videoUrl} />
              </motion.div>
            )}

            {/* Cover Graphic */}
            {slide.type === 'cover' && (
               <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`w-32 h-32 md:w-40 md:h-40 bg-accent-yellow border-[4px] border-black flex items-center justify-center shadow-[6px_6px_0px_0px_var(--accent-blue)] ${id === 1 ? 'pulse-icon' : ''}`}
               >
                  {id === 13 ? (
                    <UserCog size={60} strokeWidth={3} className="text-black" />
                  ) : (
                    <Fingerprint size={80} strokeWidth={3} className="text-black" />
                  )}
               </motion.div>
            )}

          </div>
        </motion.div>
      </AnimatePresence>

      <TalkingPoints content={slide.talkingPoint} isVisible={showTP} />
      
      <SlideNav 
        current={id} 
        total={slides.length} 
        onPrev={() => navigate(-1)} 
        onNext={() => navigate(1)}
        showTP={showTP}
        setShowTP={setShowTP}
      />
      
      <ProgressBar current={id} total={slides.length} />
    </div>
  );
}
