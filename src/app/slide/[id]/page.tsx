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
  Fingerprint,
  ExternalLink,
  Camera,
  AlertTriangle,
  WifiOff,
  FileSpreadsheet,
  Users,
  Database,
  RefreshCw,
  ShieldCheck,
  History,
  MapPin,
  Settings,
  FileText,
  Smartphone,
  Lightbulb,
  Sparkles,
  MessageCircle,
  HelpCircle
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

  const isCover = slide.type === 'cover';
  const isSS = slide.label === 'SCREENSHOT';
  const isLive = slide.label === 'LIVE';
  const isWideGallery = Boolean(slide.imageUrls && slide.imageUrls.length > 1);
  const layoutDirection = isCover || (!isSS && !isLive) || isWideGallery ? 'column' : 'row';

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
          className={`glass-card flex flex-col ${isCover ? 'items-center text-center py-8 md:py-12' : 'items-start text-left'}`}
          style={{ 
            height: 'fit-content',
            maxWidth: isCover ? '600px' : (isWideGallery ? '850px' : (slide.imageUrls && slide.imageUrls.length > 2 ? '920px' : (isLive ? '880px' : (isSS ? '750px' : '600px'))))
          }}
        >
          {/* Header (Top) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className={`w-full mb-8 ${layoutDirection === 'column' ? 'text-center flex justify-center' : ''}`}
          >
            <ShinyText 
                text={slide.title} 
                className={`title-reveal ${isCover ? 'large' : ''}`} 
                speed={2} 
            />
          </motion.div>

          {/* Master Layout */}
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: layoutDirection,
              alignItems: layoutDirection === 'column' && !isWideGallery ? 'center' : 'flex-start',
              justifyContent: 'space-between',
              width: '100%',
              gap: isWideGallery ? '2rem' : '2rem'
            }}
          >
            
            {/* Left Column */}
            {!isCover && (
              <div style={{ 
                flexDirection: 'column', 
                display: 'flex',
                gap: '1.5rem',
                width: layoutDirection === 'row' ? (isLive ? '460px' : '320px') : '100%',
                flexShrink: 0
              }}>
                  {/* Badges & Subtitle */}
                  {(isSS || isLive) && (
                     <div style={{ 
                       display: 'flex', 
                       flexDirection: 'column', 
                       gap: '0.75rem', 
                       alignItems: layoutDirection === 'column' ? 'center' : 'flex-start' 
                     }}>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 border-2 border-black font-black text-xs uppercase w-fit ${isLive ? 'bg-emerald-400' : 'bg-blue-400'}`}>
                          {isLive ? <ExternalLink size={14} /> : <Camera size={14} />}
                          {isLive ? 'LIVE DEMO' : 'SS WALKTHROUGH'}
                        </div>
                        {slide.subtitle && (
                          <div className="subtitle" style={{ fontSize: '1.1rem', backgroundColor: 'var(--accent-yellow)', color: 'black', textAlign: 'center' }}>
                            {slide.subtitle}
                          </div>
                        )}
                     </div>
                  )}

                {/* List Items */}
                {(slide.type === 'list' || slide.type === 'conclusion') && (
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '0.75rem',
                    width: '100%',
                    maxWidth: (isSS || isLive) ? '100%' : '750px',
                    margin: (isSS || isLive) ? '0' : '0 auto'
                  }}>
                    {slide.points?.map((point, idx) => {
                      let Icon = CheckCircle2;
                      const p = point.toLowerCase();
                      
                      // Keyword mapping for UI icons
                      if (p.includes('manual') || p.includes('manipulasi') || p.includes('titip')) Icon = AlertTriangle;
                      else if (p.includes('fake gps')) Icon = MapPinOff;
                      else if (p.includes('lokasi')) Icon = MapPin;
                      else if (p.includes('offline') || p.includes('sinyal')) Icon = WifiOff;
                      else if (p.includes('rekap') || p.includes('excel')) Icon = FileSpreadsheet;
                      else if (p.includes('karyawan') || p.includes('user')) Icon = Users;
                      else if (p.includes('dashboard') || p.includes('diagnostik')) Icon = Layout;
                      else if (p.includes('profil') || p.includes('reset') || p.includes('shift')) Icon = UserCog;
                      else if (p.includes('riwayat')) Icon = History;
                      else if (p.includes('approval') || slide.type === 'conclusion') Icon = CheckCircle2;
                      else if (p.includes('monitoring') || p.includes('emulator')) Icon = MonitorSmartphone;
                      else if (p.includes('ekspor') || p.includes('laporan')) Icon = FileText;
                      else if (p.includes('anti-fraud') || p.includes('deteksi') || p.includes('secure') || p.includes('root')) Icon = ShieldAlert;
                      else if (p.includes('sync')) Icon = RefreshCw;
                      else if (p.includes('waktu') || p.includes('ntp')) Icon = Clock;
                      else if (p.includes('perangkat') || p.includes('device')) Icon = Smartphone;

                      // Color mapping
                      const isProblem = slide.title.toLowerCase().includes('masalah');
                      const iconColor = slide.type === 'conclusion' ? '#10b981' : (isProblem ? '#ef4444' : 'var(--accent-blue)');

                      // Check if point has a description separated by colon
                      const colonIndex = point.indexOf(': ');
                      const hasDesc = colonIndex !== -1;
                      const titleText = hasDesc ? point.substring(0, colonIndex) : point;
                      const descText = hasDesc ? point.substring(colonIndex + 2) : '';

                      // Specific sizing logic to prevent overflow on heavy slides
                      const isHeavySlide = id === 8 || id === 5 || id === 10 || id === 9 || id === 2;
                      const boxPadding = hasDesc ? (isHeavySlide ? '0.5rem 0.75rem' : '0.75rem 1rem') : '0.5rem 1rem';
                      const titleSize = hasDesc ? (isHeavySlide ? '0.8rem' : '0.95rem') : '0.875rem';
                      const descSize = isHeavySlide ? '0.65rem' : '0.75rem';
                      const iconSize = isHeavySlide ? 16 : 20;

                      return (
                        <div key={idx} className="list-item-card" style={{ alignItems: hasDesc ? 'flex-start' : 'center', padding: boxPadding, marginBottom: isHeavySlide ? '0' : '0.25rem' }}>
                          <div className="shrink-0" style={{ color: iconColor, marginTop: hasDesc ? '4px' : '0' }}>
                            <Icon size={iconSize} strokeWidth={3} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: titleSize, fontWeight: 900, letterSpacing: '-0.02em', paddingTop: '2px', lineHeight: 1.2 }}>
                              {titleText}
                            </span>
                            {hasDesc && (
                              <span style={{ fontSize: descSize, fontWeight: 700, color: '#475569', marginTop: '2px', lineHeight: 1.3 }}>
                                {descText}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Diagram */}
                {slide.type === 'diagram' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                      { icon: Layout, title: "OFFLINE-FIRST", desc: "Menggunakan Isar Database lokal yang sangat cepat. Karyawan tetap bisa melakukan presensi normal meski berada di area site/pelosok tanpa sinyal seluler." },
                      { icon: Share2, title: "AUTO-SYNC", desc: "Sistem mendeteksi saat koneksi internet kembali stabil. Background worker akan otomatis mengunggah seluruh data presensi offline ke server pusat (PocketBase) tanpa intervensi user." },
                      { icon: Layers, title: "SECURE VALIDATION", desc: "Perlindungan fraud berlapis. Mulai dari sinkronisasi Network Time Protocol (NTP) mandiri, Anti-Fake GPS, hingga verifikasi sidik jari/wajah bawaan perangkat keras (Biometrics)." }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 border-2 border-black bg-white flex items-start gap-3 shadow-[3px_3px_0px_0px_#000]">
                        <item.icon size={16} className="shrink-0 mt-1" />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <h4 style={{ fontSize: '0.875rem', fontWeight: 900, marginBottom: '2px' }}>{item.title}</h4>
                          <p style={{ fontSize: '10px', fontWeight: 700, color: '#64748b' }}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Right Column (The Visuals) */}
            {(isSS || isLive || isCover) && (
              <div style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: (isCover || isWideGallery) ? 'column' : 'row', 
                alignItems: 'center', 
                justifyContent: (isCover || isWideGallery) ? 'center' : 'center',
                gap: isCover ? '2rem' : '1rem',
                minHeight: (isSS && !isWideGallery) || isLive ? '400px' : 'auto',
                width: '100%'
              }}>
                
                {/* For Cover: Subtitle */}
                {isCover && slide.subtitle && (
                   <motion.div 
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     className="px-6 py-2 border-[3px] border-black font-black text-xl text-center uppercase whitespace-pre-wrap"
                     style={{ 
                       backgroundColor: id === 11 ? 'var(--accent-blue)' : 'var(--accent-yellow)',
                       color: id === 11 ? 'white' : 'black',
                       boxShadow: '4px 4px 0px 0px #000',
                       transform: id === 11 ? 'rotate(-2deg)' : 'rotate(2deg)'
                     }}
                   >
                     {slide.subtitle}
                   </motion.div>
                )}
                
                {/* Screenshots Trio */}
                {isSS && slide.imageUrls && (
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    flexWrap: 'nowrap', 
                    gap: '12px', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: '100%'
                  }}>
                    {slide.imageUrls.map((url, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <DeviceFrame 
                          imageUrl={url} 
                          width={slide.imageUrls && slide.imageUrls.length > 3 ? "125px" : "150px"} 
                          height={slide.imageUrls && slide.imageUrls.length > 3 ? "270px" : "320px"} 
                          isLive={false} 
                        />
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Single Screenshot */}
                {isSS && !slide.imageUrls && (
                   <DeviceFrame imageUrl={slide.imageUrl} width="220px" height="460px" />
                )}

                {/* Live Demo Banner */}
                {isLive && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                    <div className="py-4 px-12 border-4 border-emerald-500 bg-emerald-50 text-emerald-700 font-black uppercase tracking-widest text-2xl rotate-2 shadow-[10px_10px_0px_0px_#000] flex items-center gap-4">
                      <div className="w-3 h-3 bg-emerald-600 rounded-full animate-ping" />
                      READY FOR LIVE DEMO
                    </div>
                  </div>
                )}

                {/* Cover Graphic */}
                {isCover && (
                   <div className="flex gap-6 items-center justify-center mt-2">
                      <motion.div 
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-32 h-32 bg-accent-yellow border-[4px] border-black flex items-center justify-center shadow-[6px_6px_0px_0px_var(--accent-blue)]"
                      >
                        {id === 11 ? <HelpCircle size={60} strokeWidth={2.5} className="text-black" /> : (id === 7 ? <UserCog size={60} strokeWidth={2.5} className="text-black" /> : <Fingerprint size={60} strokeWidth={2.5} className="text-black" />)}
                      </motion.div>
                      
                      {id === 1 && (
                        <motion.div 
                         initial={{ y: 20, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         transition={{ delay: 0.5 }}
                         className="flex flex-col gap-3"
                        >
                           <div className="px-5 py-2 border-[3px] border-black bg-emerald-400 font-black text-sm uppercase shadow-[3px_3px_0px_0px_#000] flex items-center gap-2"><ShieldCheck size={16}/> Secure</div>
                           <div className="px-5 py-2 border-[3px] border-black bg-white font-black text-sm uppercase shadow-[3px_3px_0px_0px_#000] flex items-center gap-2"><WifiOff size={16}/> Offline Ready</div>
                        </motion.div>
                      )}

                      {id === 11 && (
                        <motion.div 
                         initial={{ x: 20, opacity: 0 }}
                         animate={{ x: 0, opacity: 1 }}
                         transition={{ delay: 0.3 }}
                         className="px-6 py-4 border-[4px] border-black bg-emerald-400 font-black text-2xl uppercase shadow-[6px_6px_0px_0px_#000] rotate-3 text-black flex items-center gap-2"
                        >
                           <MessageCircle size={28}/> Q & A SESSION
                        </motion.div>
                      )}
                   </div>
                )}
              </div>
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
