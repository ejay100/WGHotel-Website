// ================================================
// ROOM DETAIL MODAL
// Full-screen overlay with image carousel and room details
// ================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, BedDouble, Users } from 'lucide-react';
import { AmenityBadge, AMENITY_LABELS } from '@/lib/svgAssets';

interface RoomType {
  name: string;
  price: number;
  quantity: number;
  capacity: number;
}

// Multiple images per room type for carousel
const ROOM_GALLERIES: Record<string, { images: string[]; description: string; features: string[] }> = {
  standard: {
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Our Standard Room offers a peaceful retreat with modern furnishings, a queen-size bed with premium linens, an en-suite bathroom with rain shower, and a workspace for business travellers. Each room features views of the hotel gardens or inner courtyard.',
    features: [
      'Queen-size bed with premium linens',
      'En-suite bathroom with rain shower',
      'Work desk with USB charging',
      'Flatscreen Smart TV',
      'Climate-controlled air conditioning',
      'Complimentary high-speed Wi-Fi',
    ],
  },
  executive: {
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'The Executive Room elevates your stay with a spacious layout, king-size bed, separate sitting area, and complimentary breakfast for two. Enjoy premium bathroom amenities and partial mountain views from select rooms.',
    features: [
      'King-size bed with luxury mattress',
      'Separate sitting area with sofa',
      'Complimentary breakfast for two',
      'Premium bathroom with bathtub & shower',
      'In-room safe and minibar',
      'Room service (6 AM – 11 PM)',
    ],
  },
  presidential: {
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Our Presidential Suite is the pinnacle of luxury — a full apartment-style suite with a master bedroom, living room, dining area, and private balcony overlooking the Bono East mountain range. Personalised butler service and exclusive amenities make this an unforgettable experience.',
    features: [
      'Master bedroom with panoramic mountain views',
      'Full living room and dining area',
      'Private balcony with lounge seating',
      'Butler service & welcome amenities',
      'Complimentary airport transfers',
      'Premium minibar restocked daily',
    ],
  },
  chalet: {
    images: [
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'The Mountain Chalet is a standalone cabin nestled in the hotel\'s private garden, offering complete seclusion and direct views of the surrounding hills. It features a rustic-luxe interior with a fireplace nook, full kitchenette, private porch, and dedicated parking.',
    features: [
      'Standalone private cabin',
      'Fireplace nook with seating',
      'Full kitchenette with espresso machine',
      'Private porch with mountain views',
      'Dedicated parking spot',
      '24/7 security & concierge',
    ],
  },
};

interface RoomDetailModalProps {
  roomKey: string | null;
  room: RoomType | null;
  amenities: string[];
  isOpen: boolean;
  onClose: () => void;
  onBook: (roomKey: string) => void;
  priceDisplay?: React.ReactNode;
}

const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  roomKey,
  room,
  amenities,
  isOpen,
  onClose,
  onBook,
  priceDisplay,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const gallery = roomKey ? (ROOM_GALLERIES[roomKey] || ROOM_GALLERIES.standard) : ROOM_GALLERIES.standard;
  const images = gallery.images;

  const goNext = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    setActiveIndex(0);
    setFullscreen(false);
  }, [roomKey]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') {
        if (fullscreen) setFullscreen(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  if (!roomKey || !room) return null;

  // Fullscreen image viewer
  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-black z-[60] flex items-center justify-center">
        <button onClick={() => setFullscreen(false)} className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition">
          <X className="w-5 h-5" />
        </button>
        <button onClick={goPrev} className="absolute left-4 z-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={goNext} className="absolute right-4 z-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition">
          <ChevronRight className="w-6 h-6" />
        </button>
        <img
          src={images[activeIndex]}
          alt={`${room.name} view ${activeIndex + 1}`}
          className="max-w-full max-h-full object-contain"
        />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === activeIndex ? 'bg-white w-6' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

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
            className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Carousel */}
            <div className="relative h-72 md:h-[420px] overflow-hidden rounded-t-3xl group">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                    idx === activeIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

              {/* Controls */}
              <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition z-10">
                <X className="w-5 h-5" />
              </button>
              <button onClick={() => setFullscreen(true)} className="absolute top-4 right-16 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition z-10" title="View fullscreen">
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Prev / Next arrows */}
              <button onClick={goPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition opacity-0 group-hover:opacity-100">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={goNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition opacity-0 group-hover:opacity-100">
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Room name overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  {roomKey === 'presidential' && (
                    <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full mb-2">PREMIUM</span>
                  )}
                  <h2 className="text-3xl md:text-4xl font-bold text-white">{room.name}</h2>
                  <div className="flex items-center gap-3 text-white/80 text-sm mt-1">
                    <span className="flex items-center gap-1"><BedDouble className="w-4 h-4" /> {room.quantity} rooms</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Up to {room.capacity} guests</span>
                  </div>
                </div>
              </div>

              {/* Dots */}
              <div className="absolute bottom-6 right-6 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === activeIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="px-6 md:px-10 pt-6 flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition ${
                    idx === activeIndex ? 'border-amber-500 ring-2 ring-amber-200' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 md:p-10">
              {/* Description */}
              <p className="text-slate-700 text-lg leading-relaxed mb-8">{gallery.description}</p>

              {/* Features grid */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Room Features</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {gallery.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 bg-mountain-50 rounded-xl px-4 py-3">
                      <div className="w-2 h-2 rounded-full bg-forest-500 flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenity icons */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Amenities</h3>
                <div className="flex flex-wrap gap-3">
                  {amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 bg-forest-50 px-4 py-2 rounded-full">
                      <AmenityBadge type={amenity} size={16} className="text-forest-600" />
                      <span className="text-sm text-forest-700 font-medium capitalize">
                        {(AMENITY_LABELS as Record<string, string>)[amenity] || amenity.replace(/_/g, ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-mountain-200">
                <div className="flex items-baseline gap-2">
                  {priceDisplay}
                  <span className="text-mountain-400 text-sm">/night</span>
                </div>
                <button
                  onClick={() => { onBook(roomKey); onClose(); }}
                  className="px-10 py-3.5 bg-gradient-to-r from-forest-600 to-forest-700 text-white font-bold rounded-xl hover:from-forest-700 hover:to-forest-800 transition-all shadow-lg shadow-forest-600/25 flex items-center gap-2"
                >
                  <BedDouble className="w-5 h-5" /> Book This Room
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoomDetailModal;
