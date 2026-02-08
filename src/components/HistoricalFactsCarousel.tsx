// ================================================
// BONO REGION & TECHIMAN - HISTORICAL FACTS CAROUSEL
// Cultural heritage and historical significance with matte colors
// ================================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeritageCharacterIllustration, MarketVendorIllustration } from './FlatIllustrations';

interface HistoricalFact {
  title: string;
  period: string;
  description: string;
  icon: string;
  category: 'ancient' | 'colonial' | 'modern' | 'culture' | 'economy';
}

const HISTORICAL_FACTS: HistoricalFact[] = [
  {
    title: 'Ancient Bono-Manso Kingdom',
    period: '11th - 19th Century',
    description: 'The Bono people established one of the earliest Akan kingdoms, with Bono-Manso as the capital. They were renowned for gold mining and trade, influencing the region\'s wealth and cultural development.',
    icon: '👑',
    category: 'ancient'
  },
  {
    title: 'Techiman Market - West Africa\'s Largest',
    period: 'Present Day',
    description: 'Techiman Market stands as one of the largest agricultural markets in West Africa, attracting over 50,000 traders weekly. It serves as a major economic hub connecting Ghana\'s northern and southern regions.',
    icon: '🏪',
    category: 'economy'
  },
  {
    title: 'Center of Akan Civilization',
    period: '13th - 15th Century',
    description: 'Bono Region was the birthplace of Akan civilization and culture. The kingdom pioneered gold mining techniques and established trade routes that connected West Africa to North African markets.',
    icon: '⚱️',
    category: 'ancient'
  },
  {
    title: 'Techiman Traditional Council',
    period: 'Established 1700s',
    description: 'The Omanhene (paramount chief) of Techiman has historically played a crucial role in regional governance. The traditional council maintains customs dating back centuries, preserving Bono cultural identity.',
    icon: '🪶',
    category: 'culture'
  },
  {
    title: 'Colonial Resistance & Independence',
    period: '1874 - 1957',
    description: 'Bono Region actively participated in Ghana\'s independence movement. The region\'s strategic location made it vital in anti-colonial resistance and the formation of modern Ghana.',
    icon: '🕊️',
    category: 'colonial'
  },
  {
    title: 'Techiman Sacred Grove',
    period: 'Ancient - Present',
    description: 'Sacred groves around Techiman have been protected for centuries as spiritual sites. These forests house traditional shrines and serve as cultural heritage sites for the Bono people.',
    icon: '🌳',
    category: 'culture'
  },
  {
    title: 'Agricultural Breadbasket',
    period: '1960s - Present',
    description: 'Bono East Region produces over 30% of Ghana\'s staple foods including yam, maize, and cassava. Techiman\'s fertile lands and strategic location make it Ghana\'s agricultural heart.',
    icon: '🌾',
    category: 'economy'
  },
  {
    title: 'Adinkra Symbols Origin',
    period: 'Pre-Colonial Era',
    description: 'The Bono people developed the Adinkra symbolic language, visual representations of concepts and proverbs. These symbols are now recognized globally as African cultural heritage.',
    icon: '⚡',
    category: 'culture'
  },
  {
    title: 'Gold Trade Routes',
    period: '15th - 19th Century',
    description: 'Bono Kingdom controlled trans-Saharan gold trade routes, exchanging gold, kola nuts, and slaves with North African and European merchants, establishing the region\'s economic foundation.',
    icon: '🪙',
    category: 'ancient'
  },
  {
    title: 'Modern Transportation Hub',
    period: '1990s - Present',
    description: 'Techiman\'s central location makes it a crucial junction connecting northern and southern Ghana. The region serves as a transit point for 70% of cargo moving between North and South.',
    icon: '🚛',
    category: 'modern'
  }
];

interface HistoricalFactsCarouselProps {
  compact?: boolean;
}

export default function HistoricalFactsCarousel({ compact = false }: HistoricalFactsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HISTORICAL_FACTS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [autoPlay]);

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

  if (compact) {
    return (
      <div className="bg-slate-900/80 backdrop-blur-sm border border-amber-500/20 p-6 shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <div className="text-5xl">{currentFact.icon}</div>
              <div className="flex-1">
                <div className={`inline-block px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r ${categoryColors[currentFact.category]} mb-2`}>
                  {categoryLabels[currentFact.category]}
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{currentFact.title}</h4>
                <p className="text-xs text-amber-400/70 mb-2">{currentFact.period}</p>
                <p className="text-sm text-slate-300 leading-relaxed">{currentFact.description}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Compact Navigation */}
        <div className="flex justify-center gap-1 mt-4">
          {HISTORICAL_FACTS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setAutoPlay(false);
              }}
              className={`h-1 transition-all ${
                index === currentIndex ? 'w-8 bg-amber-500' : 'w-1 bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/80 backdrop-blur-sm border-2 border-amber-500/20 p-8 md:p-12 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Illustration or Icon Section */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              {currentFact.category === 'culture' ? (
                <div className="w-48 h-48">
                  <HeritageCharacterIllustration className="w-full h-full" />
                </div>
              ) : currentFact.category === 'economy' ? (
                <div className="w-48 h-48">
                  <MarketVendorIllustration className="w-full h-full" />
                </div>
              ) : (
                <div className="w-48 h-48 bg-slate-800/60 backdrop-blur-sm border-2 border-amber-500/30 flex items-center justify-center">
                  <div className="text-8xl">{currentFact.icon}</div>
                </div>
              )}
            </motion.div>

            {/* Content Section */}
            <div className="flex-1 text-center md:text-left">
              <div className={`inline-block px-4 py-2 text-sm font-bold text-white bg-gradient-to-r ${categoryColors[currentFact.category]} mb-3 shadow-lg`}>
                {categoryLabels[currentFact.category]}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {currentFact.title}
              </h3>
              <p className="text-amber-400/80 text-lg font-semibold mb-4">
                {currentFact.period}
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                {currentFact.description}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + HISTORICAL_FACTS.length) % HISTORICAL_FACTS.length)}
          className="w-12 h-12 bg-slate-800/60 hover:bg-slate-700/60 border-2 border-amber-500/30 text-amber-400 flex items-center justify-center transition shadow-lg text-2xl"
        >
          ‹
        </button>

        <div className="flex gap-2">
          {HISTORICAL_FACTS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setAutoPlay(false);
              }}
              className={`h-2 transition-all ${
                index === currentIndex 
                  ? 'w-12 bg-amber-500' 
                  : 'w-2 bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % HISTORICAL_FACTS.length)}
          className="w-12 h-12 bg-slate-800/60 hover:bg-slate-700/60 border-2 border-amber-500/30 text-amber-400 flex items-center justify-center transition shadow-lg text-2xl"
        >
          ›
        </button>
      </div>

      {/* Auto-play Toggle */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className="text-sm text-slate-400 hover:text-amber-400 transition"
        >
          {autoPlay ? '⏸ Pause Auto-play' : '▶ Resume Auto-play'}
        </button>
      </div>
    </div>
  );
}

// Export facts for use in hero carousel overlays
export { HISTORICAL_FACTS };
export type { HistoricalFact };
