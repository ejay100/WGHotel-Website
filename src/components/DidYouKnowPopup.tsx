// ================================================
// DID YOU KNOW POPUP - Historical Facts Modal
// Popup with navigation for Bono Region history
// ================================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HISTORICAL_FACTS } from './HistoricalFactsCarousel';
import { HeritageCharacterIllustration, MarketVendorIllustration } from './FlatIllustrations';

interface DidYouKnowPopupProps {
  isOpen: boolean;
  onClose: () => void;
  autoRotate?: boolean;
}

export default function DidYouKnowPopup({ isOpen, onClose, autoRotate = true }: DidYouKnowPopupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentFact = HISTORICAL_FACTS[currentIndex];

  const categoryColors = {
    ancient: 'from-amber-600/80 to-amber-700/80',
    colonial: 'from-slate-600/80 to-slate-700/80',
    modern: 'from-teal-600/80 to-cyan-700/80',
    culture: 'from-rose-600/80 to-pink-700/80',
    economy: 'from-emerald-600/80 to-emerald-700/80'
  };

  const categoryLabels = {
    ancient: 'Ancient History',
    colonial: 'Colonial Era',
    modern: 'Modern Times',
    culture: 'Cultural Heritage',
    economy: 'Economic Legacy'
  };

  // Auto-rotate facts
  useEffect(() => {
    if (!isOpen || !autoRotate || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HISTORICAL_FACTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isOpen, autoRotate, isPaused]);

  // Reset index when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setIsPaused(false);
    }
  }, [isOpen]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HISTORICAL_FACTS.length);
    setIsPaused(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HISTORICAL_FACTS.length) % HISTORICAL_FACTS.length);
    setIsPaused(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Popup Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90%] md:max-w-3xl z-50"
          >
            <div className="bg-slate-900 border-2 border-amber-500/30 shadow-2xl h-full md:h-auto max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{currentFact.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Did You Know?</h3>
                    <p className="text-xs text-slate-400">Discover Bono Region Heritage</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center bg-slate-800/60 hover:bg-slate-700/60 border border-amber-500/30 text-amber-400 transition"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Category Badge */}
                    <div className={`inline-block px-4 py-2 text-sm font-bold text-white bg-gradient-to-r ${categoryColors[currentFact.category]}`}>
                      {categoryLabels[currentFact.category]}
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      {/* Illustration */}
                      <div className="flex-shrink-0">
                        {currentFact.category === 'culture' ? (
                          <div className="w-40 h-40 md:w-48 md:h-48">
                            <HeritageCharacterIllustration className="w-full h-full" />
                          </div>
                        ) : currentFact.category === 'economy' ? (
                          <div className="w-40 h-40 md:w-48 md:h-48">
                            <MarketVendorIllustration className="w-full h-full" />
                          </div>
                        ) : (
                          <div className="w-40 h-40 md:w-48 md:h-48 bg-slate-800/60 backdrop-blur-sm border-2 border-amber-500/30 flex items-center justify-center">
                            <div className="text-7xl">{currentFact.icon}</div>
                          </div>
                        )}
                      </div>

                      {/* Text Content */}
                      <div className="flex-1 space-y-3">
                        <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                          {currentFact.title}
                        </h2>
                        <p className="text-amber-400/80 text-base font-semibold">
                          {currentFact.period}
                        </p>
                        <p className="text-slate-300 text-base leading-relaxed">
                          {currentFact.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Footer */}
              <div className="px-6 py-4 border-t border-amber-500/20 bg-slate-800/40">
                <div className="flex items-center justify-between gap-4">
                  {/* Previous Button */}
                  <button
                    onClick={handlePrev}
                    className="w-12 h-12 bg-slate-800/60 hover:bg-slate-700/60 border-2 border-amber-500/30 text-amber-400 flex items-center justify-center transition text-2xl"
                  >
                    ‹
                  </button>

                  {/* Progress Dots */}
                  <div className="flex gap-2 flex-wrap justify-center">
                    {HISTORICAL_FACTS.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentIndex(index);
                          setIsPaused(true);
                        }}
                        className={`h-2 transition-all ${
                          index === currentIndex 
                            ? 'w-12 bg-amber-500' 
                            : 'w-2 bg-slate-600 hover:bg-slate-500'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    className="w-12 h-12 bg-slate-800/60 hover:bg-slate-700/60 border-2 border-amber-500/30 text-amber-400 flex items-center justify-center transition text-2xl"
                  >
                    ›
                  </button>
                </div>

                {/* Counter */}
                <div className="text-center mt-3">
                  <p className="text-xs text-slate-400">
                    {currentIndex + 1} of {HISTORICAL_FACTS.length}
                    {!isPaused && autoRotate && (
                      <span className="ml-2 text-amber-400/60">● Auto-playing</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
