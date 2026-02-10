// ================================================
// ATTRACTION DETAIL MODAL
// Expands a tourist attraction into a full-screen overlay
// ================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Camera, ArrowRight } from 'lucide-react';

interface Attraction {
  name: string;
  image: string;
  distance: string;
  description: string;
  highlight?: boolean;
}

// Extended info for each attraction (keyed by name)
const ATTRACTION_DETAILS: Record<string, {
  longDescription: string;
  gallery: string[];
  highlights: string[];
  bestTime: string;
  tips: string;
}> = {
  'Boabeng-Fiema Monkey Sanctuary': {
    longDescription:
      'The Boabeng-Fiema Monkey Sanctuary is one of Ghana\'s most unique wildlife reserves, home to over 700 mona monkeys and black-and-white colobus monkeys that roam freely among the village and surrounding forest. The monkeys are considered sacred by the local communities and are protected by traditional taboo. Guided tours led by knowledgeable local caretakers take you through shaded forest paths where monkeys play overhead and sometimes approach visitors directly. The sanctuary also features a small museum and a cemetery where deceased monkeys are given traditional burials.',
    gallery: [
      'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1463852247062-1bbca38f7805?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: ['700+ sacred monkeys', 'Guided forest walks', 'Monkey burial grounds museum', 'Bird watching opportunities'],
    bestTime: 'Early morning (6–9 AM) when monkeys are most active',
    tips: 'Wear comfortable shoes for forest trails. No flash photography near the monkeys.',
  },
  'Kintampo Waterfalls': {
    longDescription:
      'Kintampo Waterfalls, situated on the Pumpu River, is one of the highest waterfalls in Ghana at about 70 meters. The falls cascade through lush, dense tropical rainforest canopy, creating a spectacular three-stage drop that fills the air with cool mist. Wooden staircases and viewing platforms let you get close to each tier. The surrounding forest is rich in birds, butterflies, and plant life, making it a natural escape for adventure seekers and photographers alike. Local guides narrate the cultural significance of the falls and the surrounding landscape.',
    gallery: [
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507400492013-162706c8c05e?auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: ['70-metre multi-stage cascade', 'Rainforest canopy walk', 'Natural swimming area', 'Photography hotspot'],
    bestTime: 'Rainy season (June–September) for peak water flow',
    tips: 'Bring waterproof bags for electronics. Wear sandals with grip for wet steps.',
  },
  'Boti Falls': {
    longDescription:
      'Boti Falls is a stunning twin waterfall located in the Eastern Region of Ghana. The male and female falls merge during the rainy season into one powerful cascade. An umbrella-shaped rock formation sits nearby alongside a sacred cave. The site offers natural swimming pools at the base and is surrounded by dense forest with excellent bird-watching. The 30-minute hike to the falls is scenic and moderately easy, passing through cocoa farms and forest paths.',
    gallery: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: ['Twin male & female falls', 'Umbrella rock formation', 'Natural swimming pools', 'Scenic forest hike'],
    bestTime: 'July–October when both falls merge into one',
    tips: 'Wear hiking shoes. The hike is about 30 minutes each way.',
  },
  'Bono Manso Palace': {
    longDescription:
      'Bono Manso is a significant historical site in the Bono East Region, once the capital of the medieval Bono Kingdom, one of the earliest Akan states in West Africa. The palace preserves centuries of royal history, traditional regalia, and artefacts from the Bono people. Visitors can tour the grounds, view traditional architecture, and learn about the Bono Kingdom\'s trade routes, governance, and cultural contributions to Ghanaian society. Festivals and cultural performances are regularly held here, offering an immersive heritage experience.',
    gallery: [
      'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: ['Medieval Bono Kingdom history', 'Royal artefacts & regalia', 'Traditional architecture', 'Cultural festivals'],
    bestTime: 'Year-round; festival season in December is extraordinary',
    tips: 'Ask for a local guide at the palace entrance for the full story.',
  },
};

interface AttractionModalProps {
  attraction: Attraction | null;
  isOpen: boolean;
  onClose: () => void;
}

const AttractionModal: React.FC<AttractionModalProps> = ({ attraction, isOpen, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);

  React.useEffect(() => {
    setActiveImageIndex(0);
  }, [attraction]);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!attraction) return null;

  const details = ATTRACTION_DETAILS[attraction.name];
  const gallery = details?.gallery || [attraction.image];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gallery / Hero Image */}
            <div className="relative h-72 md:h-96 overflow-hidden rounded-t-3xl">
              {gallery.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                    idx === activeImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                {attraction.highlight && (
                  <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full mb-3">
                    MUST VISIT
                  </span>
                )}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">{attraction.name}</h2>
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Bono East Region</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {attraction.distance} drive</span>
                </div>
              </div>

              {/* Gallery dots */}
              {gallery.length > 1 && (
                <div className="absolute bottom-6 right-6 flex gap-2">
                  {gallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx === activeImageIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:p-10">
              {/* Thumbnail strip */}
              {gallery.length > 1 && (
                <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition ${
                        idx === activeImageIndex ? 'border-amber-500 ring-2 ring-amber-200' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${img})` }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              <p className="text-slate-700 text-lg leading-relaxed mb-8">
                {details?.longDescription || attraction.description}
              </p>

              {/* Highlights */}
              {details?.highlights && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-amber-500" /> Highlights
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {details.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 bg-amber-50 rounded-xl px-4 py-3">
                        <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span className="text-slate-700 text-sm">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practical info */}
              {details && (
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-slate-50 rounded-xl p-5">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Best Time to Visit</p>
                    <p className="text-slate-800 text-sm">{details.bestTime}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tips</p>
                    <p className="text-slate-800 text-sm">{details.tips}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AttractionModal;
