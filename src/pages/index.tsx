// ================================================
// WINNERS GOLD HOTEL - PREMIUM LANDING PAGE
// Inspired by top hotel websites worldwide
// ================================================

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Mountain, BedDouble, Globe, Phone, Mail, MapPin, Star, ArrowRight, ChevronRight, Users, Leaf } from 'lucide-react';
import { ROOM_TYPES, CONFERENCE_ROOM } from '@/lib/constants';
import { 
  AkanPatternBackground, 
  AmenityBadge,
  AirConditioningIcon,
  WifiIcon,
  BreakfastIcon,
  TvIcon,
  SecurityIcon,
  ParkingIcon
} from '@/lib/svgAssets';
import BoardroomIllustration from '@/components/BoardroomIllustration';
import ConferenceBookingForm from '@/components/ConferenceBookingForm';
import { HISTORICAL_FACTS } from '@/components/HistoricalFactsCarousel';
import DidYouKnowPopup from '@/components/DidYouKnowPopup';
import CurrencySelector, { PriceDisplay } from '@/components/CurrencySelector';
import { CurrencyCode } from '@/lib/currency';

// High-quality photography assets - Ghanaian landscapes and culture
// Techiman and Bono East region scenes for hero carousel
const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80', // Luxury hotel pool terrace
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2000&q=80', // Resort exterior at dusk
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=80', // Grand hotel lobby
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=80', // Hotel room with mountain view
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
  standard: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80', // Clean modern room
  executive: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80', // Executive suite
  presidential: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', // Luxury presidential suite
  chalet: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1200&q=80' // Mountain chalet cabin
};

export default function Home() {
  const router = useRouter();
  const [currency, setCurrency] = useState<CurrencyCode>('GHS');
  const [mounted, setMounted] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [conferenceModalOpen, setConferenceModalOpen] = useState(false);
  const [didYouKnowOpen, setDidYouKnowOpen] = useState(false);

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
      <Head>
        <title>Winners Gold Hotel - Premium Mountain Resort in Techiman, Ghana</title>
        <meta name="description" content="Luxury accommodation with breathtaking mountain views in Techiman, Bono East. Experience authentic Ghanaian hospitality at Winners Gold Hotel." />
      </Head>

      <div className="min-h-screen bg-mountain-50">
        {/* Navigation - Compact Design */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-mountain-900/80 backdrop-blur-xl text-white border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-sunrise-400 to-sunrise-600 rounded-lg flex items-center justify-center shadow group-hover:scale-105 transition">
                <Mountain className="w-5 h-5 text-white" />
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
              
              <Link href="/admin" className="px-3 py-1.5 bg-sunrise-500/90 hover:bg-sunrise-500 rounded-lg text-xs font-medium transition">
                Staff
              </Link>
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
          
          <div className="absolute inset-0 bg-gradient-to-b from-mountain-950/70 via-mountain-900/50 to-mountain-950/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-mountain-950/50 to-transparent" />
          
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
              <p className="text-2xl md:text-4xl font-light tracking-[0.25em] text-amber-400/90 uppercase">
                Winners Gold Hotel
              </p>
              <div className="flex items-center justify-center gap-4 my-3">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/60" />
                <p className="text-sm font-light text-white/70 italic tracking-wide">
                  Where heritage meets hospitality
                </p>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/60" />
              </div>
              <p className="text-base md:text-lg text-white/60 font-light max-w-lg mx-auto">
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
                <button className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold transition-all flex items-center gap-2 mx-auto rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30">
                  <BedDouble className="w-5 h-5" /> Book Your Stay
                </button>
              </a>
              <a href="#explore">
                <button className="px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 transition-all flex items-center gap-2 mx-auto rounded-xl">
                  <Globe className="w-5 h-5" /> Explore Heritage
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
        <section id="rooms" className="py-24 bg-gradient-to-b from-mountain-50 to-white relative">
          <AkanPatternBackground opacity={0.015} color="#1e293b" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-forest-600 uppercase tracking-[0.2em] mb-3">Accommodations</p>
              <h2 className="text-3xl md:text-5xl font-bold text-mountain-900 mb-4">Find Your Perfect Room</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-sunrise-400 to-sunrise-600 mx-auto mb-4 rounded-full" />
              <p className="text-mountain-500 max-w-xl mx-auto text-lg">
                From cozy retreats to luxurious suites, designed for comfort and tranquility
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {Object.entries(ROOM_TYPES).map(([key, room]) => {
                const amenities = ROOM_AMENITIES[key] || ['ac', 'wifi', 'tv'];
                return (
                  <div 
                    key={key} 
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-mountain-100"
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
                      
                      <button 
                        onClick={() => handleBookNow(key)}
                        className="w-full py-2.5 bg-gradient-to-r from-forest-600 to-forest-700 text-white font-semibold rounded-xl hover:from-forest-700 hover:to-forest-800 transition-all text-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Did You Know - Historical Facts Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
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
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                    <Star className="w-7 h-7 text-amber-400" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Did You Know?
                  </h2>
                </div>
                <p className="text-slate-400 text-lg max-w-3xl mx-auto mb-8">
                  Discover the rich history and cultural heritage of Bono East Region and Techiman
                </p>
              </motion.div>
            </div>

            {/* Interactive Facts Preview Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              {HISTORICAL_FACTS.slice(0, 3).map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800/60 backdrop-blur-sm border-2 border-amber-500/20 p-6 hover:border-amber-500/40 transition-all group cursor-pointer"
                  onClick={() => setDidYouKnowOpen(true)}
                >
                  <div className="text-5xl mb-4">{fact.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition">
                    {fact.title}
                  </h3>
                  <p className="text-amber-400/70 text-sm mb-3">{fact.period}</p>
                  <p className="text-slate-400 text-sm line-clamp-3">{fact.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-amber-400 text-sm font-medium group-hover:gap-3 transition-all">
                    <span>Learn more</span>
                    <span>→</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* View All Button */}
            <div className="text-center">
              <button
                onClick={() => setDidYouKnowOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold transition-all rounded-xl inline-flex items-center gap-3 group shadow-lg shadow-amber-500/25"
              >
                <Globe className="w-5 h-5" />
                <span>Explore All {HISTORICAL_FACTS.length} Historical Facts</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
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
                  className="px-8 py-3.5 bg-gradient-to-r from-mist-600 to-mist-700 text-white font-bold rounded-xl hover:from-mist-700 hover:to-mist-800 transition-all shadow-lg shadow-mist-600/25 flex items-center gap-2"
                >
                  <Users className="w-5 h-5" /> Request Booking
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
        <section id="explore" className="py-24 bg-gradient-to-b from-mountain-50 to-white relative">
          <AkanPatternBackground opacity={0.015} color="#334155" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-mist-600 uppercase tracking-[0.2em] mb-3">Discover</p>
              <h2 className="text-3xl md:text-5xl font-bold text-mountain-900 mb-4">Explore Bono East</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-mist-400 to-forest-500 mx-auto mb-4 rounded-full" />
              <p className="text-mountain-500 max-w-xl mx-auto text-lg">
                Waterfalls, sacred groves, and rich cultural heritage await just minutes away
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {ATTRACTIONS.map((place, i) => (
                <div 
                  key={i} 
                  className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border ${
                    place.highlight ? 'border-sunrise-400 ring-2 ring-sunrise-100' : 'border-mountain-100'
                  }`}
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
                    <p className="text-mountain-600 text-sm leading-relaxed">{place.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Signature Amenities */}
        <section className="py-16 bg-white relative overflow-hidden">
          <AkanPatternBackground opacity={0.02} color="#334155" />
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-mountain-400 mb-2">Essentials Curated For You</p>
              <h3 className="text-2xl md:text-3xl font-semibold text-mountain-900">Concierge-level Amenities</h3>
              <div className="w-12 h-1 bg-gradient-to-r from-forest-400 to-forest-600 mx-auto mt-3 rounded-full" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { Icon: AirConditioningIcon, label: 'Climate Control' },
                { Icon: WifiIcon, label: 'Fiber WiFi' },
                { Icon: BreakfastIcon, label: 'Chef Breakfast' },
                { Icon: TvIcon, label: 'Smart TV' },
                { Icon: SecurityIcon, label: '24/7 Security' },
                { Icon: ParkingIcon, label: 'Valet Parking' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-mountain-50 transition group">
                  <item.Icon size={30} color="#166534" className="group-hover:scale-110 transition" />
                  <span className="text-xs text-mountain-600 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-mountain-900 via-forest-900 to-mountain-900 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-forest-500/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full" />
          </div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Leaf className="w-10 h-10 text-forest-400 mx-auto mb-4" />
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready for an Unforgettable Stay?</h2>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                Experience the perfect blend of nature, culture, and comfort in the heart of Bono East
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+233245678900" className="px-6 py-3.5 bg-white text-forest-700 font-bold rounded-xl hover:bg-mountain-50 transition shadow-xl flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> +233 24 567 8900
                </a>
                <a href="mailto:manager@winnersgoldhotel.com" className="px-6 py-3.5 bg-gradient-to-r from-sunrise-500 to-sunrise-600 text-white font-bold rounded-xl hover:from-sunrise-600 hover:to-sunrise-700 transition shadow-xl flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" /> Email Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-mountain-950 text-white relative">
          <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
            <div className="grid md:grid-cols-4 gap-10 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 bg-gradient-to-br from-sunrise-400 to-sunrise-600 rounded-xl flex items-center justify-center">
                    <Mountain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Winners Gold Hotel</h3>
                    <p className="text-mountain-500 text-xs">Mountain View Resort</p>
                  </div>
                </div>
                <p className="text-mountain-400 text-sm max-w-sm leading-relaxed">
                  Nestled in the heart of Bono East, offering an escape to tranquility with modern comforts and authentic Ghanaian hospitality.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sunrise-400 mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-3 text-mountain-300 text-sm">
                  <li><a href="#rooms" className="hover:text-white transition flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Our Rooms</a></li>
                  <li><a href="#conference" className="hover:text-white transition flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Conference Hall</a></li>
                  <li><a href="#explore" className="hover:text-white transition flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Explore Region</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-sunrise-400 mb-5 text-sm uppercase tracking-wider">Contact</h4>
                <ul className="space-y-3 text-mountain-300 text-sm">
                  <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-mountain-500 flex-shrink-0" /> Techiman, Bono East</li>
                  <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-mountain-500 flex-shrink-0" /> +233 24 567 8900</li>
                  <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-mountain-500 flex-shrink-0" /> +233 20 123 4567</li>
                  <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-mountain-500 flex-shrink-0" /> manager@winnersgoldhotel.com</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-mountain-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-mountain-500 text-xs">
                &copy; 2026 Winners Gold Hotel. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-mountain-500 text-xs">
                <span className="flex items-center gap-1"><Leaf className="w-3 h-3" /> Eco-certified hideaway</span>
                <span className="opacity-40">&bull;</span>
                <span>Curated Bono East excursions</span>
              </div>
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
      </div>
    </>
  );
}
