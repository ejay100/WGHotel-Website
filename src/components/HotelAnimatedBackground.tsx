// ================================================
// ANIMATED HOTEL BACKGROUND
// Inspired by Cratelock's moving icons concept
// Hotel-themed floating elements with framer-motion
// ================================================

'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HotelAnimatedBackground: React.FC = () => {
  // Hotel-themed icons and elements
  const hotelElements = [
    // Row 1 - Top
    { icon: '🏨', size: 60, x: '5%', delay: 0, duration: 25 },
    { icon: '🛏️', size: 50, x: '15%', delay: 2, duration: 28 },
    { icon: '🔑', size: 45, x: '25%', delay: 1, duration: 22 },
    { icon: '🌟', size: 40, x: '35%', delay: 3, duration: 30 },
    { icon: '🍽️', size: 55, x: '45%', delay: 1.5, duration: 26 },
    { icon: '☕', size: 48, x: '55%', delay: 2.5, duration: 24 },
    { icon: '🧳', size: 52, x: '65%', delay: 0.5, duration: 27 },
    { icon: '🏔️', size: 58, x: '75%', delay: 3.5, duration: 29 },
    { icon: '🌺', size: 42, x: '85%', delay: 1, duration: 23 },
    { icon: '📞', size: 46, x: '95%', delay: 2, duration: 25 },
    
    // Row 2 - Middle
    { icon: '🛎️', size: 54, x: '8%', delay: 1.5, duration: 27 },
    { icon: '🏊', size: 50, x: '18%', delay: 3, duration: 24 },
    { icon: '🍾', size: 44, x: '28%', delay: 0.5, duration: 28 },
    { icon: '🎭', size: 56, x: '38%', delay: 2.5, duration: 26 },
    { icon: '🌴', size: 48, x: '48%', delay: 1, duration: 30 },
    { icon: '🧖', size: 52, x: '58%', delay: 3.5, duration: 23 },
    { icon: '🎪', size: 46, x: '68%', delay: 0.8, duration: 29 },
    { icon: '🏰', size: 60, x: '78%', delay: 2.2, duration: 25 },
    { icon: '🌙', size: 42, x: '88%', delay: 1.8, duration: 27 },
    
    // Row 3 - Bottom
    { icon: '🎵', size: 44, x: '12%', delay: 2, duration: 26 },
    { icon: '🍹', size: 50, x: '22%', delay: 0.5, duration: 24 },
    { icon: '🌸', size: 46, x: '32%', delay: 3, duration: 28 },
    { icon: '🏖️', size: 54, x: '42%', delay: 1.5, duration: 25 },
    { icon: '🎨', size: 48, x: '52%', delay: 2.8, duration: 29 },
    { icon: '🦋', size: 40, x: '62%', delay: 0.3, duration: 23 },
    { icon: '🌻', size: 52, x: '72%', delay: 3.2, duration: 27 },
    { icon: '🎪', size: 56, x: '82%', delay: 1.2, duration: 30 },
    { icon: '🏵️', size: 44, x: '92%', delay: 2.5, duration: 26 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
      {hotelElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: element.x,
            fontSize: `${element.size}px`,
          }}
          initial={{ y: -100, opacity: 0, rotate: 0 }}
          animate={{
            y: ['0vh', '110vh'],
            opacity: [0, 0.6, 0.8, 0.6, 0],
            rotate: [0, 360],
            scale: [0.8, 1, 0.9, 1, 0.8],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {element.icon}
        </motion.div>
      ))}
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      
      {/* Animated light rays */}
      <motion.div
        className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-sunrise-300/20 via-sunrise-400/10 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scaleX: [1, 1.5, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-forest-300/20 via-forest-400/10 to-transparent"
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scaleX: [1, 1.5, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-sunrise-400/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default HotelAnimatedBackground;
