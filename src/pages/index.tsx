// ================================================
// WINNERS GOLD HOTEL - PREMIUM LANDING PAGE
// Inspired by top hotel websites worldwide
// ================================================

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ROOM_TYPES, CONFERENCE_ROOM } from '@/lib/constants';
import { 
  AkanPatternBackground, 
  ExploreVector,
  AmenityBadge
} from '@/assets/svgAssets';
import BoardroomIllustration from '@/components/BoardroomIllustration';
import ConferenceBookingForm from '@/components/ConferenceBookingForm';
import WelcomeAnimation from '@/components/WelcomeAnimation';
import HistoricalFactsCarousel from '@/components/HistoricalFactsCarousel';
import DidYouKnowPopup from '@/components/DidYouKnowPopup';
import AttractionModal from '@/components/AttractionModal';
import RoomDetailModal from '@/components/RoomDetailModal';
import CurrencySelector, { PriceDisplay } from '@/components/CurrencySelector';
import { CurrencyCode } from '@/lib/currency';

// High-quality photography assets - Ghanaian landscapes and culture
// Techiman and Bono East region scenes for hero carousel
const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=2000&q=80', // African market scene
  'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2000&q=80', // African landscape sunset
  'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=2000&q=80', // African savanna landscape
  'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2000&q=80', // African rural landscape
];

const KINTAMPO_IMAGE = 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1600&q=80';
const FULLER_FALLS_IMAGE = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80';
const FIEMA_MONKEY_IMAGE = 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1600&q=80';
const BONO_PALACE_IMAGE = 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1600&q=80';

// Local Attractions - Swiss design aesthetic with clean, professional photography
const ATTRACTIONS = [
  {
    name: 'Boabeng-Fiema Monkey Sanctuary',
    image: FIEMA_MONKEY_IMAGE,
    distance: '45 min',
    description: 'Home to over 700 mona and colobus monkeys roaming freely in sacred groves. Guided tours by local caretakers offer intimate wildlife encounters.',
    highlight: true
  },
  {
    name: 'Kintampo Waterfalls',
    image: KINTAMPO_IMAGE,
    distance: '35 min',
    description: 'Ghana\'s most spectacular 70-meter cascade with lush rainforest canopy. Perfect for adventure and photography.'
  },
  {
    name: 'Boti Falls',
    image: FULLER_FALLS_IMAGE,
    distance: '1 hour',
    description: 'Twin waterfalls in the Eastern Region with stunning natural beauty. Sacred site with umbrella rock formation and natural swimming pools.'
  },
  {
    name: 'Bono Manso Palace',
    image: BONO_PALACE_IMAGE,
    distance: '25 min',
    description: 'Historic royal palace preserving centuries of Bono Kingdom heritage and cultural traditions.'
  }
];

// Room amenities map
const ROOM_AMENITIES: Record<string, string[]> = {
  standard: ['ac', 'wifi', 'tv', 'shower'],
  executive: ['ac', 'wifi', 'tv', 'shower', 'breakfast', 'room_service'],
  presidential: ['ac', 'wifi', 'tv', 'shower', 'breakfast', 'room_service', 'mountain_view', 'parking'],
  chalet: ['ac', 'wifi', 'tv', 'shower', 'breakfast', 'parking', 'mountain_view', 'security']
};

const ROOM_GALLERY: Record<string, string> = {
  standard: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80', // African-inspired room
  executive: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80', // Modern African bedroom
  presidential: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', // Luxury African suite
  chalet: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80' // African villa bedroom
};

export default function Home() {
  const router = useRouter();
  const [currency, setCurrency] = useState<CurrencyCode>('GHS');
  const [mounted, setMounted] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [conferenceModalOpen, setConferenceModalOpen] = useState(false);
  const [showWelcome] = useState(true); // Welcome animation on first load
  const [didYouKnowOpen, setDidYouKnowOpen] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState<typeof ATTRACTIONS[0] | null>(null);
  const [selectedRoomKey, setSelectedRoomKey] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferred_currency') as CurrencyCode;
      if (saved) setCurrency(saved);
    }
  }, []);

  // Hero carousel auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred_currency', newCurrency);
    }
  };

  const handleBookNow = (roomType: string) => {
    router.push(`/booking?room=${roomType}`);
  };

  return (
    <>
      {showWelcome && <WelcomeAnimation />}
      
      <Head>
        <title>Winners Gold Hotel - Premium Mountain Resort in Techiman, Ghana</title>
        <meta name="description" content="Luxury accommodation with breathtaking mountain views in Techiman, Bono East. Experience authentic Ghanaian hospitality at Winners Gold Hotel." />
      </Head>

      <div className="min-h-screen bg-mountain-50">
        {/* Navigation - Compact Design */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-mountain-900/95 backdrop-blur-md text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-sunrise-400 to-sunrise-600 rounded-lg flex items-center justify-center shadow group-hover:scale-105 transition">
                <span className="text-lg">🏔️</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-sm leading-tight">Winners Gold</h1>
                <p className="text-[10px] text-mountain-400">Techiman</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-5 text-sm">
                <a href="#rooms" className="text-mountain-300 hover:text-white transition">Rooms</a>
                <a href="#conference" className="text-mountain-300 hover:text-white transition">Conference</a>
                <a href="#explore" className="text-mountain-300 hover:text-white transition">Explore</a>
                <a href="#heritage" className="text-mountain-300 hover:text-white transition">Heritage</a>
              </div>
              
              {mounted && (
                <div className="flex items-center">
                  <CurrencySelector 
                    value={currency} 
                    onChange={handleCurrencyChange}
                    variant="toggle"
                  />
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Section - Carousel */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Carousel Images */}
          {HERO_IMAGES.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 scale-105 ${
                index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
          
          <div className="absolute inset-0 bg-gradient-to-b from-mountain-900/60 via-mountain-800/40 to-mountain-900/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-mountain-900/40 to-transparent" />
          
          {/* Mist Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-mountain-50 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-3 mb-8"
            >
              <p className="text-2xl md:text-3xl font-light tracking-[0.3em] text-amber-400/90 uppercase">
                Winners Gold Hotel
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
                <p className="text-sm font-light text-slate-300 italic">
                  Where heritage meets hospitality
                </p>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
              </div>
              <p className="text-base text-slate-400 font-light max-w-md mx-auto mt-2">
                Experience serenity in the heart of Bono East
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a href="#rooms">
                <button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold transition-all flex items-center gap-2 mx-auto border-2 border-amber-400">
                  <span>🛏️</span> Book Your Stay
                </button>
              </a>
              <a href="#explore">
                <button className="px-8 py-3 bg-slate-800/60 backdrop-blur-md border-2 border-amber-500/30 text-amber-400 font-semibold hover:bg-slate-700/60 hover:border-amber-500/50 transition-all flex items-center gap-2 mx-auto">
                  <span>🌍</span> Explore Heritage
                </button>
              </a>
            </motion.div>
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {HERO_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeroIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentHeroIndex 
                    ? 'bg-white w-8' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </section>

        {/* Room Categories */}
        <section id="rooms" className="py-20 bg-gradient-to-b from-mountain-50 to-white relative">
          <AkanPatternBackground opacity={0.015} color="#1e293b" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-sm font-semibold text-forest-600 uppercase tracking-wide mb-2">Accommodations</h3>
              <h2 className="text-3xl md:text-4xl font-bold text-mountain-900 mb-3">Find Your Perfect Room</h2>
              <p className="text-mountain-500 max-w-xl mx-auto">
                From cozy retreats to luxurious suites, designed for comfort and tranquility
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {Object.entries(ROOM_TYPES).map(([key, room]) => {
                const amenities = ROOM_AMENITIES[key] || ['ac', 'wifi', 'tv'];
                return (
                  <div 
                    key={key} 
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-mountain-100 cursor-pointer"
                    onClick={() => setSelectedRoomKey(key)}
                  >
                    {/* Room Photography */}
                    <div className="h-48 relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${ROOM_GALLERY[key]})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-mountain-900/70 via-mountain-900/20 to-transparent" />
                      {key === 'presidential' && (
                        <div className="absolute top-3 right-3 px-2 py-0.5 bg-sunrise-500 text-white text-[10px] font-bold rounded-full">
                          PREMIUM
                        </div>
                      )}
                      <div className="absolute bottom-3 left-4 text-white">
                        <p className="text-lg font-semibold">{room.name}</p>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-mountain-900 mb-3">{room.name}</h3>
                      
                      {/* Amenity Icons */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {amenities.slice(0, 5).map((amenity) => (
                          <div 
                            key={amenity} 
                            className="w-8 h-8 rounded-lg bg-mountain-50 flex items-center justify-center"
                            title={amenity.replace('_', ' ')}
                          >
                            <AmenityBadge type={amenity} size={16} className="text-forest-600" />
                          </div>
                        ))}
                        {amenities.length > 5 && (
                          <div className="w-8 h-8 rounded-lg bg-mountain-50 flex items-center justify-center text-xs text-mountain-500">
                            +{amenities.length - 5}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-baseline gap-1 mb-4">
                        {mounted && (
                          <PriceDisplay 
                            amount={room.price} 
                            currency={currency} 
                            size="lg"
                            className="text-forest-700 font-bold"
                          />
                        )}
                        <span className="text-mountain-400 text-sm">/night</span>
                      </div>
                      
                      <div className="flex gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedRoomKey(key); }}
                        className="flex-1 py-2.5 bg-mountain-100 text-mountain-700 font-semibold rounded-xl hover:bg-mountain-200 transition-all text-sm"
                      >
                        View Room
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleBookNow(key); }}
                        className="flex-1 py-2.5 bg-gradient-to-r from-forest-600 to-forest-700 text-white font-semibold rounded-xl hover:from-forest-700 hover:to-forest-800 transition-all text-sm"
                      >
                        Book Now
                      </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Conference Room */}
        <section id="conference" className="py-20 bg-white relative overflow-hidden">
          <AkanPatternBackground opacity={0.02} color="#334155" />
          
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-sm font-semibold text-mist-600 uppercase tracking-wide mb-2">Business & Events</h3>
                <h2 className="text-3xl md:text-4xl font-bold text-mountain-900 mb-4">{CONFERENCE_ROOM.name}</h2>
                <p className="text-mountain-600 text-lg mb-6">
                  Host impactful meetings, conferences, and events in our state-of-the-art facility with stunning mountain backdrop.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-mountain-50 rounded-xl p-4">
                    <p className="text-2xl font-bold text-mountain-900">{CONFERENCE_ROOM.capacity}</p>
                    <p className="text-mountain-500 text-sm">Seat Capacity</p>
                  </div>
                  <div className="bg-mountain-50 rounded-xl p-4">
                    {mounted && (
                      <PriceDisplay 
                        amount={CONFERENCE_ROOM.hourlyRate} 
                        currency={currency}
                        size="lg"
                        className="text-mountain-900 font-bold"
                      />
                    )}
                    <p className="text-mountain-500 text-sm">Per Hour</p>
                  </div>
                </div>

                {/* Conference Amenities */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {['projector', 'microphone', 'wifi', 'ac'].map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 bg-forest-50 px-3 py-1.5 rounded-full">
                      <AmenityBadge type={amenity} size={16} className="text-forest-600" />
                      <span className="text-xs text-forest-700 font-medium capitalize">{amenity.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setConferenceModalOpen(true)}
                  className="px-6 py-3 bg-gradient-to-r from-mist-600 to-mist-700 text-white font-bold rounded-xl hover:from-mist-700 hover:to-mist-800 transition-all shadow-lg"
                >
                  Request Booking
                </button>
              </div>

              <div className="flex justify-center">
                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                  <BoardroomIllustration className="w-full max-w-lg h-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Explore Region */}
        <section id="explore" className="py-20 bg-gradient-to-b from-mountain-50 to-white relative">
          <AkanPatternBackground opacity={0.015} color="#334155" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-sm font-semibold text-mist-600 uppercase tracking-wide mb-2">Discover</h3>
              <h2 className="text-3xl md:text-4xl font-bold text-mountain-900 mb-3">Explore Bono East</h2>
              <p className="text-mountain-500 max-w-xl mx-auto">
                Waterfalls, sacred groves, and rich cultural heritage await just minutes away
              </p>
            </div>

            <div className="flex justify-center mb-10">
              <ExploreVector className="w-28 h-28 opacity-90" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {ATTRACTIONS.map((place, i) => (
                <div 
                  key={i} 
                  className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border ${
                    place.highlight ? 'border-sunrise-400 ring-2 ring-sunrise-100' : 'border-mountain-100'
                  }`}
                  onClick={() => setSelectedAttraction(place)}
                >
                  <div 
                    className="h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${place.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-mountain-900/80 to-transparent" />
                    {place.highlight && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-sunrise-500 text-white text-xs font-bold rounded-full">
                        MUST VISIT
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold text-base">{place.name}</p>
                      <p className="text-mountain-200 text-xs">{place.distance} drive</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-mountain-600 text-sm leading-relaxed mb-3">{place.description}</p>
                    <span className="text-forest-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn more →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Heritage & History Section */}
        <section id="heritage" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500 blur-3xl" />
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-teal-500 blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-amber-400 font-semibold mb-2 tracking-widest uppercase text-sm">Heritage & History</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Discover Bono Region
                </h2>
                <p className="text-slate-400 text-lg max-w-3xl mx-auto">
                  From ancient kingdoms to modern economic hubs, explore the rich cultural tapestry and historical significance of Bono East Region and Techiman.
                </p>
              </motion.div>
            </div>

            {/* Historical Facts Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HistoricalFactsCarousel />
            </motion.div>

            {/* Key Highlights Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 grid md:grid-cols-3 gap-6"
            >
              <div className="bg-slate-800/60 backdrop-blur-sm border-2 border-amber-500/20 p-6 text-center hover:border-amber-500/40 transition">
                <div className="text-5xl mb-3">👑</div>
                <h4 className="text-xl font-bold text-white mb-2">Ancient Kingdom</h4>
                <p className="text-slate-400 text-sm">Birthplace of Akan civilization with 800+ years of royal heritage</p>
              </div>
              
              <div className="bg-slate-800/60 backdrop-blur-sm border-2 border-emerald-500/20 p-6 text-center hover:border-emerald-500/40 transition">
                <div className="text-5xl mb-3">🏪</div>
                <h4 className="text-xl font-bold text-white mb-2">Economic Powerhouse</h4>
                <p className="text-slate-400 text-sm">Home to West Africa's largest agricultural market with 50,000+ weekly traders</p>
              </div>
              
              <div className="bg-slate-800/60 backdrop-blur-sm border-2 border-rose-500/20 p-6 text-center hover:border-rose-500/40 transition">
                <div className="text-5xl mb-3">⚱️</div>
                <h4 className="text-xl font-bold text-white mb-2">Cultural Heritage</h4>
                <p className="text-slate-400 text-sm">Origin of Adinkra symbols and traditional Akan customs</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Contact Bar */}
        <section className="py-10 bg-gradient-to-r from-forest-600 to-forest-700 text-white">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">Ready to Book Your Stay?</h3>
              <p className="text-forest-100 text-sm">Contact us directly for reservations</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+233245678900" className="px-4 py-2 bg-white text-forest-700 font-semibold rounded-lg hover:bg-mountain-50 transition text-sm">
                📞 +233 24 567 8900
              </a>
              <a href="mailto:manager@winnersgoldhotel.com" className="px-4 py-2 bg-sunrise-500 text-white font-semibold rounded-lg hover:bg-sunrise-600 transition text-sm">
                ✉️ Email Us
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-mountain-900 text-white relative">
          <AkanPatternBackground opacity={0.06} color="#94a3b8" />
          
          <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
            <div className="grid md:grid-cols-4 gap-8 mb-10">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-sunrise-400 to-sunrise-600 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🏔️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Winners Gold Hotel</h3>
                    <p className="text-mountain-400 text-xs">Mountain View Resort</p>
                  </div>
                </div>
                <p className="text-mountain-400 text-sm max-w-sm">
                  Nestled in the heart of Bono East, offering an escape to tranquility with modern comforts and authentic Ghanaian hospitality.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sunrise-400 mb-4 text-sm">Quick Links</h4>
                <ul className="space-y-2 text-mountain-300 text-sm">
                  <li><a href="#rooms" className="hover:text-white transition">Our Rooms</a></li>
                  <li><a href="#conference" className="hover:text-white transition">Conference Hall</a></li>
                  <li><a href="#explore" className="hover:text-white transition">Explore Region</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-sunrise-400 mb-4 text-sm">Contact</h4>
                <ul className="space-y-2 text-mountain-300 text-sm">
                  <li>📍 Techiman, Bono East</li>
                  <li>📞 +233 24 567 8900 (Manager)</li>
                  <li>📞 +233 20 123 4567 (Reception)</li>
                  <li>✉️ manager@winnersgoldhotel.com</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-mountain-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
              <p className="text-mountain-500 text-xs">
                © 2026 Winners Gold Hotel. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-mountain-500 text-xs">
                <span>Eco-certified hideaway</span>
                <span className="opacity-40">•</span>
                <span>Curated Bono East excursions</span>
              </div>
              <p className="text-mountain-600 text-xs">
                Crafted with love in Techiman
              </p>
            </div>
          </div>
        </footer>

        {/* Conference Booking Modal */}
        {conferenceModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-mountain-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-mountain-900">Conference Room Booking</h2>
                <button 
                  onClick={() => setConferenceModalOpen(false)}
                  className="text-mountain-400 hover:text-mountain-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <ConferenceBookingForm onClose={() => setConferenceModalOpen(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Did You Know Popup */}
        <DidYouKnowPopup 
          isOpen={didYouKnowOpen} 
          onClose={() => setDidYouKnowOpen(false)}
          autoRotate={true}
        />

        {/* Attraction Detail Modal */}
        <AttractionModal
          attraction={selectedAttraction}
          isOpen={!!selectedAttraction}
          onClose={() => setSelectedAttraction(null)}
        />

        {/* Room Detail Modal */}
        <RoomDetailModal
          roomKey={selectedRoomKey}
          room={selectedRoomKey ? (ROOM_TYPES as any)[selectedRoomKey] : null}
          amenities={selectedRoomKey ? (ROOM_AMENITIES[selectedRoomKey] || ['ac', 'wifi', 'tv']) : []}
          isOpen={!!selectedRoomKey}
          onClose={() => setSelectedRoomKey(null)}
          onBook={handleBookNow}
          priceDisplay={
            selectedRoomKey && mounted ? (
              <PriceDisplay
                amount={(ROOM_TYPES as any)[selectedRoomKey]?.price || 0}
                currency={currency}
                size="lg"
                className="text-forest-700 font-bold"
              />
            ) : undefined
          }
        />
      </div>
    </>
  );
}
