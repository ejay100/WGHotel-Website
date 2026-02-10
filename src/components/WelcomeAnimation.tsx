// ================================================
// WINNERS GOLD HOTEL - MINIMALIST ANIMATED WELCOME
// Centered carousel with matte color palette
// ================================================

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const WELCOME_FACTS = [
  { icon: '🏪', title: "West Africa's Largest Market", subtitle: '50,000+ traders weekly' },
  { icon: '👑', title: 'Ancient Bono Kingdom', subtitle: '800+ years of heritage' },
  { icon: '⚱️', title: 'Birthplace of Akan Culture', subtitle: 'Origin of Adinkra symbols' },
  { icon: '🌾', title: 'Agricultural Powerhouse', subtitle: "30% of Ghana's food supply" },
];

export default function WelcomeAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % WELCOME_FACTS.length);
    }, 1750);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const currentFact = WELCOME_FACTS[factIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden"
        style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
      >
        {/* Minimalist Geometric Background */}
        <div className="absolute inset-0">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
          
          {/* Floating Accent Shapes */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-amber-500/10 to-yellow-600/5 blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-32 right-24 w-40 h-40 rounded-full bg-gradient-to-br from-teal-500/10 to-cyan-600/5 blur-2xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-rose-500/10 to-pink-600/5 blur-2xl"
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          />
        </div>

        {/* Central Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative">
              
              {/* Background Rotating Facts Carousel */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={factIndex}
                    initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    animate={{ opacity: 0.15, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    transition={{ duration: 0.6 }}
                    className="absolute w-[600px] h-[600px] flex items-center justify-center"
                  >
                    <div className="relative w-full h-full">
                      {/* Large Icon Background */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-[280px] leading-none opacity-30 blur-sm">
                          {currentFact.icon}
                        </div>
                      </div>
                      
                      {/* Circular Text Path */}
                      <svg viewBox="0 0 400 400" className="w-full h-full absolute inset-0 opacity-40">
                        <defs>
                          <path
                            id="circlePath"
                            d="M 200, 200 m -150, 0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0"
                          />
                        </defs>
                        <text className="fill-amber-400 text-sm font-light tracking-[0.3em]">
                          <textPath href="#circlePath" startOffset="0">
                            {currentFact.title.toUpperCase()} • {currentFact.subtitle.toUpperCase()} •
                          </textPath>
                        </text>
                      </svg>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Minimalist WGH Logo - Front and Center */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 80 }}
                className="relative z-20 text-center"
              >
                {/* Geometric Gold Frame */}
                <div className="relative inline-block">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                    }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 -m-4"
                  >
                    <div className="w-full h-full border-2 border-amber-500/20" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }} />
                  </motion.div>
                  
                  {/* Main WGH */}
                  <div className="relative px-16 py-10 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm">
                    {/* Gold Accent Corners */}
                    <div className="absolute top-0 left-0 w-3 h-3 bg-amber-500" />
                    <div className="absolute top-0 right-0 w-3 h-3 bg-amber-500" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 bg-amber-500" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-amber-500" />
                    
                    <motion.h1 
                      className="text-8xl md:text-9xl font-black tracking-tighter"
                      style={{
                        background: 'linear-gradient(135deg, #d4af37 0%, #f4e7c3 50%, #d4af37 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textShadow: '0 0 40px rgba(212, 175, 55, 0.3)'
                      }}
                    >
                      WGH
                    </motion.h1>
                  </div>
                </div>

                {/* Hotel Name - Minimalist Typography */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="mt-8 space-y-1"
                >
                  <p className="text-xl md:text-2xl font-light tracking-[0.5em] text-amber-400/80 uppercase">
                    Winners Gold Hotel
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/50" />
                    <p className="text-sm font-light text-slate-400 italic">
                      Where heritage meets hospitality
                    </p>
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/50" />
                  </div>
                </motion.div>

                {/* Current Fact Display - Subtle */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={factIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="mt-12"
                  >
                    <div className="inline-block px-6 py-3 bg-slate-800/50 backdrop-blur-sm border border-amber-500/20">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-amber-400/60 font-medium tracking-widest uppercase">Did you know?</span>
                        <div className="w-1 h-1 bg-amber-500/40 rounded-full" />
                        <span className="text-sm text-slate-300 font-light">{currentFact.title}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Progress Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 0.5 }}
                  className="mt-8 flex justify-center gap-2"
                >
                  {WELCOME_FACTS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 transition-all duration-300 ${
                        i === factIndex ? 'w-8 bg-amber-500' : 'w-1 bg-slate-600'
                      }`}
                    />
                  ))}
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
