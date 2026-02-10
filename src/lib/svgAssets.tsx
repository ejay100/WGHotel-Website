// ================================================
// HIGH-QUALITY SVG ASSETS - Premium Vectors & Icons
// ================================================

interface IconProps {
  className?: string;
  color?: string;
  size?: number;
}

// ================================================
// PREMIUM AMENITY ICONS
// ================================================

export const AirConditioningIcon = ({ className = '', color = 'currentColor', size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="10" rx="2" fill="none"/>
    <path d="M6 14v4M12 14v6M18 14v4M8 18h8M6 8h12"/>
    <circle cx="8" cy="8" r="1" fill={color}/>
    <circle cx="12" cy="8" r="1" fill={color}/>
    <circle cx="16" cy="8" r="1" fill={color}/>
    <path d="M4 6h16" strokeWidth="1.5"/>
  </svg>
);

export const WifiIcon = ({ className = '', color = 'currentColor', size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
    <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
    <circle cx="12" cy="20" r="1.5" fill={color}/>
    <path d="M12 20v-2" strokeWidth="1.5"/>
  </svg>
);

export const BreakfastIcon = ({ className = '', color = 'currentColor', size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="14" y1="1" x2="14" y2="4"/>
    <path d="M8 12h8"/>
    <circle cx="12" cy="16" r="1" fill={color}/>
  </svg>
);

export const TvIcon = ({ className = '', color = 'currentColor', size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="14" rx="2"/>
    <path d="M8 22h8M12 18v4"/>
    <circle cx="7" cy="9" r="1" fill={color}/>
    <rect x="9" y="7" width="6" height="4" rx="1" fill="none"/>
    <circle cx="12" cy="9" r="0.5" fill={color}/>
  </svg>
);

export const ParkingIcon = ({ className = '', color = 'currentColor', size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>
    <path d="M9 13h4"/>
    <circle cx="6" cy="20" r="1" fill={color}/>
    <circle cx="18" cy="20" r="1" fill={color}/>
  </svg>
);

export const SecurityIcon = ({ className = '', color = 'currentColor', size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
    <circle cx="12" cy="8" r="1" fill={color}/>
    <path d="M8 8h8"/>
  </svg>
);

export const RoomServiceIcon = ({ className = '', color = 'currentColor', size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 18h20M4 18v-2a8 8 0 0 1 16 0v2"/>
    <circle cx="12" cy="8" r="2"/>
    <path d="M12 6V3"/>
    <path d="M8 10h8"/>
    <circle cx="9" cy="12" r="0.5" fill={color}/>
    <circle cx="15" cy="12" r="0.5" fill={color}/>
  </svg>
);

export const ShowerIcon = ({ className = '', color = 'currentColor', size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16M12 4v4"/>
    <circle cx="12" cy="11" r="3"/>
    <path d="M8 16l-1 4M16 16l1 4M10 16v4M14 16v4M12 16v4"/>
    <path d="M12 11v5"/>
    <circle cx="12" cy="8" r="1" fill={color}/>
  </svg>
);

export const ProjectorIcon = ({ className = '', color = 'currentColor', size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="16" height="12" rx="2"/>
    <circle cx="10" cy="12" r="3"/>
    <path d="M18 10h4v4h-4M22 12h-2M6 18v2M14 18v2"/>
    <circle cx="10" cy="12" r="1" fill={color}/>
    <path d="M10 9v6"/>
  </svg>
);

export const MicrophoneIcon = ({ className = '', color = 'currentColor', size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="2" width="6" height="12" rx="3"/>
    <path d="M5 10v2a7 7 0 0 0 14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="22"/>
    <line x1="8" y1="22" x2="16" y2="22"/>
    <circle cx="12" cy="8" r="1" fill={color}/>
  </svg>
);

export const MountainViewIcon = ({ className = '', color = 'currentColor', size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3l4 8 5-5 5 15H2L8 3z"/>
    <circle cx="18" cy="5" r="2"/>
    <path d="M14 8l2 2"/>
    <path d="M10 12l3 3"/>
  </svg>
);

export const BedIcon = ({ className = '', color = 'currentColor', size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16M22 4v16M2 12h20M2 20h20"/>
    <path d="M6 12v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
    <circle cx="7" cy="8" r="1"/>
    <circle cx="17" cy="8" r="1"/>
    <path d="M6 16h12"/>
  </svg>
);

// ================================================
// PREMIUM SCENE ILLUSTRATIONS
// ================================================

// Ghanaian Mountain Landscape - Kwahu/Wenchi Style
export const MountainSceneVector = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 500 300" className={className} fill="none">
    {/* Sky gradient with sunrise */}
    <defs>
      <linearGradient id="ghanaSky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF6B35"/>
        <stop offset="30%" stopColor="#F7931E"/>
        <stop offset="70%" stopColor="#FFD23F"/>
        <stop offset="100%" stopColor="#06FFA5"/>
      </linearGradient>
      <radialGradient id="fogGradient" cx="50%" cy="80%" r="60%">
        <stop offset="0%" stopColor="white" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="white" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2D5016"/>
        <stop offset="50%" stopColor="#4A7C2A"/>
        <stop offset="100%" stopColor="#1A3A0F"/>
      </linearGradient>
    </defs>

    {/* Sky background */}
    <rect width="500" height="300" fill="url(#ghanaSky)"/>

    {/* Distant mountains */}
    <path d="M0 180 Q100 120 200 160 T400 140 L500 180 L500 300 L0 300 Z" fill="#1A3A0F" opacity="0.6"/>
    <path d="M50 200 Q150 140 250 180 T450 160 L500 200 L500 300 L50 300 Z" fill="#2D5016" opacity="0.4"/>

    {/* Main Kwahu-style mountains with green vegetation */}
    <path d="M0 220 Q80 160 160 200 Q240 180 320 220 Q400 200 480 240 L500 240 L500 300 L0 300 Z" fill="url(#mountainGradient)"/>
    <path d="M20 240 Q100 180 180 220 Q260 200 340 240 Q420 220 500 260 L500 300 L20 300 Z" fill="#4A7C2A" opacity="0.8"/>

    {/* Mountain peaks with snow caps */}
    <polygon points="120,180 140,160 160,180" fill="white" opacity="0.9"/>
    <polygon points="280,200 300,180 320,200" fill="white" opacity="0.8"/>
    <polygon points="400,220 420,200 440,220" fill="white" opacity="0.7"/>

    {/* Green vegetation patches on mountains */}
    <ellipse cx="80" cy="210" rx="25" ry="15" fill="#22C55E" opacity="0.7"/>
    <ellipse cx="200" cy="230" rx="30" ry="20" fill="#16A34A" opacity="0.6"/>
    <ellipse cx="350" cy="240" rx="35" ry="18" fill="#15803D" opacity="0.8"/>
    <ellipse cx="450" cy="250" rx="20" ry="12" fill="#166534" opacity="0.9"/>

    {/* Trees scattered on mountains */}
    <g opacity="0.8">
      <polygon points="60,220 65,200 70,220" fill="#166534"/>
      <polygon points="180,240 185,220 190,240" fill="#15803D"/>
      <polygon points="320,250 325,230 330,250" fill="#22C55E"/>
      <polygon points="420,260 425,240 430,260" fill="#16A34A"/>
    </g>

    {/* Layered fog effects */}
    <ellipse cx="250" cy="270" rx="200" ry="25" fill="url(#fogGradient)"/>
    <ellipse cx="200" cy="280" rx="180" ry="20" fill="white" opacity="0.4"/>
    <ellipse cx="300" cy="275" rx="150" ry="18" fill="white" opacity="0.3"/>
    <ellipse cx="150" cy="285" rx="120" ry="15" fill="white" opacity="0.5"/>

    {/* Sun rays */}
    <g opacity="0.3">
      <line x1="450" y1="50" x2="480" y2="30" stroke="white" strokeWidth="2"/>
      <line x1="460" y1="70" x2="485" y2="60" stroke="white" strokeWidth="1.5"/>
      <line x1="440" y1="90" x2="470" y2="85" stroke="white" strokeWidth="1"/>
    </g>

    {/* Sun */}
    <circle cx="420" cy="60" r="25" fill="#FFD23F" opacity="0.9"/>
    <circle cx="420" cy="60" r="20" fill="#F7931E" opacity="0.7"/>
  </svg>
);

// Premium Hotel Building Vector
export const HotelBuildingVector = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 300 250" className={className} fill="none">
    {/* Building shadow */}
    <ellipse cx="150" cy="240" rx="140" ry="8" fill="#1F2937" opacity="0.3"/>

    {/* Main building structure */}
    <rect x="60" y="80" width="180" height="140" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1"/>
    <rect x="50" y="70" width="200" height="20" fill="#F59E0B" stroke="#D97706" strokeWidth="1"/>

    {/* Windows grid with lights */}
    {[0,1,2,3,4].map(floor => (
      [0,1,2,3,4,5].map(window => {
        const x = 75 + window * 25;
        const y = 90 + floor * 20;
        const isLit = Math.random() > 0.3;
        return (
          <rect
            key={`${floor}-${window}`}
            x={x}
            y={y}
            width="15"
            height="12"
            fill={isLit ? "#FEF3C7" : "#374151"}
            stroke="#6B7280"
            strokeWidth="0.5"
            rx="1"
          />
        );
      })
    ))}

    {/* Entrance with awning */}
    <rect x="125" y="200" width="50" height="20" fill="#1F2937" rx="2"/>
    <rect x="115" y="195" width="70" height="8" fill="#DC2626" rx="4"/>
    <text x="150" y="210" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">HOTEL</text>

    {/* Decorative elements */}
    <rect x="55" y="65" width="190" height="8" fill="#F59E0B" rx="4"/>
    <circle cx="80" cy="75" r="3" fill="#EF4444"/>
    <circle cx="220" cy="75" r="3" fill="#EF4444"/>

    {/* Side wings */}
    <rect x="30" y="100" width="40" height="80" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="1"/>
    <rect x="230" y="100" width="40" height="80" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="1"/>

    {/* Windows for side wings */}
    {[0,1,2].map(floor => (
      <rect
        key={`left-${floor}`}
        x="35"
        y={110 + floor * 20}
        width="12"
        height="10"
        fill="#FEF3C7"
        stroke="#6B7280"
        strokeWidth="0.5"
        rx="1"
      />
    ))}
    {[0,1,2].map(floor => (
      <rect
        key={`right-${floor}`}
        x="253"
        y={110 + floor * 20}
        width="12"
        height="10"
        fill="#FEF3C7"
        stroke="#6B7280"
        strokeWidth="0.5"
        rx="1"
      />
    ))}
  </svg>
);

// Premium Conference Room Vector
export const ConferenceRoomVector = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 400 280" className={className} fill="none">
    {/* Room floor with wood pattern */}
    <defs>
      <pattern id="woodFloor" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="#D4A574"/>
        <rect x="0" y="0" width="40" height="2" fill="#B8956A"/>
        <rect x="0" y="38" width="40" height="2" fill="#B8956A"/>
      </pattern>
      <linearGradient id="tableGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>

    {/* Floor */}
    <rect x="0" y="200" width="400" height="80" fill="url(#woodFloor)"/>

    {/* Walls */}
    <rect x="0" y="0" width="400" height="200" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2"/>

    {/* Modern conference table */}
    <ellipse cx="200" cy="180" rx="120" ry="25" fill="url(#tableGradient)"/>
    <ellipse cx="200" cy="175" rx="120" ry="25" fill="#6D28D9" opacity="0.8"/>

    {/* Table surface details */}
    <rect x="80" y="165" width="240" height="4" fill="#4C1D95" rx="2"/>
    <circle cx="200" cy="170" r="8" fill="#EDE9FE" opacity="0.6"/>

    {/* Premium office chairs */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const centerX = 200;
      const centerY = 180;
      const radius = 110;
      const x = centerX + Math.cos(rad) * radius;
      const y = centerY + Math.sin(rad) * radius;

      return (
        <g key={i}>
          {/* Chair base */}
          <circle cx={x} cy={y + 8} r="12" fill="#374151"/>
          {/* Chair seat */}
          <ellipse cx={x} cy={y} rx="14" ry="8" fill="#6B7280"/>
          {/* Chair back */}
          <rect x={x - 12} y={y - 18} width="24" height="16" fill="#4B5563" rx="2"/>
          {/* Chair arms */}
          <rect x={x - 16} y={y - 5} width="4" height="10" fill="#6B7280" rx="2"/>
          <rect x={x + 12} y={y - 5} width="4" height="10" fill="#6B7280" rx="2"/>
        </g>
      );
    })}

    {/* Large screen/projector */}
    <rect x="120" y="20" width="160" height="90" fill="#1F2937" stroke="#374151" strokeWidth="3" rx="4"/>
    <rect x="125" y="25" width="150" height="80" fill="#0F172A"/>
    <circle cx="200" cy="65" r="15" fill="#3B82F6" opacity="0.8"/>
    <rect x="185" y="60" width="30" height="10" fill="#60A5FA" rx="2"/>

    {/* Presentation equipment */}
    <rect x="180" y="130" width="40" height="8" fill="#374151" rx="2"/>
    <circle cx="190" cy="134" r="2" fill="#EF4444"/>
    <circle cx="200" cy="134" r="2" fill="#22C55E"/>
    <circle cx="210" cy="134" r="2" fill="#F59E0B"/>

    {/* Plants for ambiance */}
    <g opacity="0.7">
      <rect x="20" y="150" width="8" height="40" fill="#166534"/>
      <circle cx="24" cy="145" r="12" fill="#22C55E"/>
      <circle cx="20" cy="140" r="8" fill="#16A34A"/>
      <circle cx="28" cy="140" r="10" fill="#15803D"/>
    </g>

    <g opacity="0.7">
      <rect x="372" y="150" width="8" height="40" fill="#166534"/>
      <circle cx="376" cy="145" r="12" fill="#22C55E"/>
      <circle cx="372" cy="140" r="8" fill="#16A34A"/>
      <circle cx="380" cy="140" r="10" fill="#15803D"/>
    </g>

    {/* Lighting */}
    <circle cx="100" cy="30" r="8" fill="#FEF3C7" opacity="0.8"/>
    <circle cx="300" cy="30" r="8" fill="#FEF3C7" opacity="0.8"/>
  </svg>
);

// High-resolution conference badge vector
export const ConferenceBadgeVector = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 320 320" className={className} fill="none">
    <defs>
      <linearGradient id="conferenceGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#312E81" />
        <stop offset="60%" stopColor="#4338CA" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
      <radialGradient id="conferenceCore" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#EEF2FF" />
        <stop offset="100%" stopColor="#C7D2FE" stopOpacity="0.2" />
      </radialGradient>
    </defs>

    {/* Outer badge */}
    <circle cx="160" cy="160" r="150" fill="#0F172A" />
    <circle cx="160" cy="160" r="138" fill="url(#conferenceGlow)" opacity="0.9" />
    <circle cx="160" cy="160" r="120" fill="#1E1B4B" stroke="#A5B4FC" strokeWidth="2" />

    {/* Inner glow */}
    <circle cx="160" cy="150" r="95" fill="url(#conferenceCore)" />

    {/* Table */}
    <ellipse cx="160" cy="190" rx="100" ry="35" fill="#312E81" />
    <ellipse cx="160" cy="185" rx="100" ry="35" fill="#3B82F6" opacity="0.5" />
    <rect x="80" y="170" width="160" height="10" fill="#1E40AF" rx="5" />

    {/* Chairs */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
      const rad = (angle * Math.PI) / 180;
      const cx = 160 + Math.cos(rad) * 110;
      const cy = 190 + Math.sin(rad) * 38;
      return (
        <g key={idx}>
          <ellipse cx={cx} cy={cy} rx="18" ry="10" fill="#0F172A" stroke="#818CF8" strokeWidth="2" />
          <rect x={cx - 14} y={cy - 30} width="28" height="18" fill="#1E1B4B" stroke="#C7D2FE" strokeWidth="1" rx="4" />
          <circle cx={cx} cy={cy - 21} r="4" fill="#A5B4FC" />
        </g>
      );
    })}

    {/* Screen */}
    <rect x="95" y="60" width="130" height="80" rx="10" fill="#0F172A" stroke="#C7D2FE" strokeWidth="3" />
    <rect x="105" y="70" width="110" height="60" rx="8" fill="#1D4ED8" opacity="0.6" />
    <circle cx="160" cy="100" r="14" fill="#93C5FD" />
    <rect x="140" y="95" width="40" height="10" rx="4" fill="#BFDBFE" />

    {/* Accent lights */}
    <circle cx="90" cy="60" r="10" fill="#FDE68A" opacity="0.8" />
    <circle cx="230" cy="60" r="10" fill="#FDE68A" opacity="0.8" />
    <circle cx="50" cy="160" r="6" fill="#E0E7FF" opacity="0.6" />
    <circle cx="270" cy="160" r="6" fill="#E0E7FF" opacity="0.6" />

    {/* Text labels */}
    <text x="160" y="265" textAnchor="middle" fill="#C7D2FE" fontSize="20" fontWeight="600" letterSpacing="2">
      EXECUTIVE BOARDROOM
    </text>
  </svg>
);

// Premium Bedroom Suite Vector
export const BedroomSuiteVector = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 350 250" className={className} fill="none">
    {/* Room floor */}
    <rect x="0" y="200" width="350" height="50" fill="#F5F5F4"/>

    {/* Walls */}
    <rect x="0" y="0" width="350" height="200" fill="#FEFEFE" stroke="#E5E7EB" strokeWidth="1"/>

    {/* King size bed frame */}
    <rect x="50" y="120" width="180" height="70" fill="#8B5CF6" rx="4"/>
    <rect x="45" y="115" width="190" height="10" fill="#7C3AED" rx="4"/>

    {/* Mattress and bedding */}
    <rect x="55" y="125" width="170" height="50" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" rx="2"/>
    <rect x="55" y="140" width="170" height="25" fill="#F3F4F6" rx="2"/>
    <rect x="55" y="155" width="170" height="20" fill="#E5E7EB" rx="2"/>

    {/* Pillows */}
    <ellipse cx="85" cy="135" rx="18" ry="10" fill="#FEF3C7"/>
    <ellipse cx="115" cy="135" rx="18" ry="10" fill="#FEF3C7"/>
    <ellipse cx="265" cy="135" rx="18" ry="10" fill="#FEF3C7"/>
    <ellipse cx="295" cy="135" rx="18" ry="10" fill="#FEF3C7"/>

    {/* Headboard */}
    <rect x="45" y="80" width="190" height="40" fill="#1F2937" rx="4"/>
    <rect x="50" y="85" width="180" height="30" fill="#374151" rx="2"/>
    <circle cx="75" cy="100" r="3" fill="#F59E0B"/>
    <circle cx="105" cy="100" r="3" fill="#F59E0B"/>
    <circle cx="135" cy="100" r="3" fill="#F59E0B"/>
    <circle cx="165" cy="100" r="3" fill="#F59E0B"/>
    <circle cx="195" cy="100" r="3" fill="#F59E0B"/>
    <circle cx="225" cy="100" r="3" fill="#F59E0B"/>

    {/* Nightstands */}
    <rect x="20" y="150" width="30" height="40" fill="#D1D5DB" rx="2"/>
    <rect x="300" y="150" width="30" height="40" fill="#D1D5DB" rx="2"/>

    {/* Lamps */}
    <rect x="25" y="140" width="6" height="15" fill="#F59E0B" rx="1"/>
    <ellipse cx="28" cy="135" rx="8" ry="5" fill="#FEF3C7" opacity="0.8"/>
    <rect x="305" y="140" width="6" height="15" fill="#F59E0B" rx="1"/>
    <ellipse cx="308" cy="135" rx="8" ry="5" fill="#FEF3C7" opacity="0.8"/>

    {/* Window with curtains */}
    <rect x="250" y="30" width="80" height="100" fill="#87CEEB" stroke="#6B7280" strokeWidth="2" rx="2"/>
    <rect x="240" y="25" width="100" height="110" fill="#4B5563" opacity="0.8"/>
    <rect x="245" y="30" width="90" height="100" fill="#1F2937" opacity="0.6"/>
    <rect x="250" y="30" width="80" height="100" fill="#60A5FA" opacity="0.4"/>

    {/* Curtains */}
    <path d="M240 25 Q235 135 240 135" fill="#8B5CF6" opacity="0.7"/>
    <path d="M340 25 Q345 135 340 135" fill="#8B5CF6" opacity="0.7"/>

    {/* Wall art */}
    <rect x="120" y="40" width="60" height="40" fill="#1F2937" rx="2"/>
    <rect x="125" y="45" width="50" height="30" fill="#F3F4F6"/>
    <circle cx="150" cy="60" r="8" fill="#8B5CF6" opacity="0.6"/>

    {/* Carpet */}
    <ellipse cx="175" cy="220" rx="80" ry="25" fill="#8B5CF6" opacity="0.3"/>
  </svg>
);

// Premium Waterfall Vector
export const WaterfallVector = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 300 250" className={className} fill="none">
    {/* Sky */}
    <rect width="300" height="150" fill="#87CEEB"/>
    <rect width="300" height="50" fill="#4FC3F7" opacity="0.3"/>

    {/* Background mountains */}
    <path d="M0 100 Q50 60 100 90 T200 70 L300 100 L300 150 L0 150 Z" fill="#2E7D32"/>
    <path d="M50 120 Q100 80 150 110 T250 90 L300 120 L300 150 L50 150 Z" fill="#388E3C"/>
    <path d="M100 130 Q150 100 200 125 T300 110 L300 150 L100 150 Z" fill="#43A047"/>

    {/* Cliff */}
    <rect x="100" y="80" width="80" height="120" fill="#795548"/>
    <rect x="90" y="75" width="100" height="10" fill="#5D4037"/>

    {/* Waterfall */}
    <rect x="120" y="85" width="40" height="100" fill="#29B6F6" opacity="0.9"/>
    <rect x="125" y="85" width="30" height="100" fill="#03A9F4" opacity="0.8"/>
    <rect x="130" y="85" width="20" height="100" fill="#0288D1" opacity="0.7"/>

    {/* Water flow animation effect */}
    <rect x="135" y="90" width="10" height="20" fill="#81D4FA" opacity="0.6"/>
    <rect x="135" y="120" width="10" height="20" fill="#81D4FA" opacity="0.5"/>
    <rect x="135" y="150" width="10" height="20" fill="#81D4FA" opacity="0.4"/>

    {/* Pool */}
    <ellipse cx="150" cy="200" rx="60" ry="25" fill="#29B6F6"/>
    <ellipse cx="150" cy="195" rx="50" ry="20" fill="#03A9F4" opacity="0.8"/>
    <ellipse cx="150" cy="190" rx="40" ry="15" fill="#0288D1" opacity="0.6"/>

    {/* Water ripples */}
    <circle cx="150" cy="190" r="30" fill="none" stroke="#81D4FA" strokeWidth="1" opacity="0.4"/>
    <circle cx="150" cy="190" r="45" fill="none" stroke="#81D4FA" strokeWidth="1" opacity="0.3"/>
    <circle cx="150" cy="190" r="60" fill="none" stroke="#81D4FA" strokeWidth="1" opacity="0.2"/>

    {/* Rocks in pool */}
    <ellipse cx="130" cy="205" rx="8" ry="4" fill="#795548"/>
    <ellipse cx="170" cy="208" rx="6" ry="3" fill="#5D4037"/>
    <ellipse cx="145" cy="212" rx="5" ry="3" fill="#8D6E63"/>

    {/* Trees */}
    <g opacity="0.8">
      <rect x="30" y="120" width="8" height="30" fill="#2E7D32"/>
      <circle cx="34" cy="115" r="15" fill="#43A047"/>
      <circle cx="30" cy="110" rx="12" ry="8" fill="#388E3C"/>
      <circle cx="38" cy="110" rx="10" ry="6" fill="#4CAF50"/>
    </g>

    <g opacity="0.8">
      <rect x="250" y="110" width="8" height="30" fill="#2E7D32"/>
      <circle cx="254" cy="105" r="15" fill="#43A047"/>
      <circle cx="250" cy="100" rx="12" ry="8" fill="#388E3C"/>
      <circle cx="258" cy="100" rx="10" ry="6" fill="#4CAF50"/>
    </g>

    {/* Mist */}
    <ellipse cx="150" cy="175" rx="25" ry="8" fill="white" opacity="0.6"/>
    <ellipse cx="150" cy="180" rx="20" ry="6" fill="white" opacity="0.4"/>
    <ellipse cx="150" cy="185" rx="15" ry="4" fill="white" opacity="0.3"/>
  </svg>
);

// Premium Suitcase Vector
export const SuitcaseVector = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none">
    {/* Main suitcase body */}
    <rect x="20" y="30" width="80" height="70" rx="8" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2"/>
    <rect x="15" y="25" width="90" height="10" rx="5" fill="#1E40AF"/>

    {/* Handle */}
    <rect x="50" y="15" width="20" height="15" rx="3" fill="#6B7280"/>
    <rect x="55" y="10" width="10" height="10" fill="#9CA3AF" rx="2"/>

    {/* Straps and details */}
    <rect x="20" y="55" width="80" height="6" fill="#1E40AF"/>
    <rect x="20" y="75" width="80" height="6" fill="#1E40AF"/>

    {/* Wheels */}
    <circle cx="35" cy="105" r="8" fill="#1F2937"/>
    <circle cx="35" cy="105" r="4" fill="#6B7280"/>
    <circle cx="85" cy="105" r="8" fill="#1F2937"/>
    <circle cx="85" cy="105" r="4" fill="#6B7280"/>

    {/* Lock */}
    <rect x="55" y="48" width="10" height="8" fill="#F59E0B" rx="1"/>
    <circle cx="60" cy="52" r="1.5" fill="#92400E"/>

    {/* Tags */}
    <rect x="25" y="35" width="15" height="8" fill="white" rx="1"/>
    <text x="32.5" y="41" textAnchor="middle" fill="#1F2937" fontSize="5" fontWeight="bold">VIP</text>

    {/* Side pockets */}
    <rect x="15" y="40" width="10" height="20" fill="#60A5FA" rx="2"/>
    <rect x="95" y="40" width="10" height="20" fill="#60A5FA" rx="2"/>
  </svg>
);

// Premium Explore Vector
export const ExploreVector = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none">
    {/* Outer ring with details */}
    <circle cx="60" cy="60" r="50" fill="none" stroke="#374151" strokeWidth="3"/>
    <circle cx="60" cy="60" r="45" fill="none" stroke="#6B7280" strokeWidth="1"/>
    <circle cx="60" cy="60" r="40" fill="none" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="2,2"/>

    {/* Direction markers */}
    <text x="60" y="25" textAnchor="middle" fill="#1F2937" fontSize="12" fontWeight="bold">N</text>
    <text x="60" y="105" textAnchor="middle" fill="#6B7280" fontSize="10">S</text>
    <text x="15" y="65" textAnchor="middle" fill="#6B7280" fontSize="10">W</text>
    <text x="105" y="65" textAnchor="middle" fill="#6B7280" fontSize="10">E</text>

    {/* Degree markers */}
    <line x1="60" y1="15" x2="60" y2="20" stroke="#9CA3AF" strokeWidth="1"/>
    <line x1="95" y1="25" x2="100" y2="30" stroke="#9CA3AF" strokeWidth="1"/>
    <line x1="105" y1="60" x2="110" y2="60" stroke="#9CA3AF" strokeWidth="1"/>
    <line x1="95" y1="95" x2="100" y2="90" stroke="#9CA3AF" strokeWidth="1"/>
    <line x1="60" y1="105" x2="60" y2="110" stroke="#9CA3AF" strokeWidth="1"/>
    <line x1="25" y1="95" x2="20" y2="90" stroke="#9CA3AF" strokeWidth="1"/>
    <line x1="15" y1="60" x2="10" y2="60" stroke="#9CA3AF" strokeWidth="1"/>
    <line x1="25" y1="25" x2="20" y2="30" stroke="#9CA3AF" strokeWidth="1"/>

    {/* Compass needle */}
    <polygon points="60,25 55,60 60,65 65,60" fill="#DC2626"/>
    <polygon points="60,95 55,60 60,55 65,60" fill="#1F2937"/>

    {/* Center mechanism */}
    <circle cx="60" cy="60" r="8" fill="#F59E0B"/>
    <circle cx="60" cy="60" r="5" fill="#D97706"/>
    <circle cx="60" cy="60" r="2" fill="#92400E"/>

    {/* Decorative elements */}
    <circle cx="60" cy="35" r="1.5" fill="#9CA3AF"/>
    <circle cx="60" cy="85" r="1.5" fill="#9CA3AF"/>
    <circle cx="35" cy="60" r="1.5" fill="#9CA3AF"/>
    <circle cx="85" cy="60" r="1.5" fill="#9CA3AF"/>
  </svg>
);

// ================================================
// PREMIUM AKAN ADINKRA SYMBOLS
// ================================================

export const GyeNyame = ({ className = '', color = 'currentColor' }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none">
    {/* Outer circle with intricate border */}
    <circle cx="60" cy="60" r="55" fill="none" stroke={color} strokeWidth="3"/>
    <circle cx="60" cy="60" r="50" fill="none" stroke={color} strokeWidth="1" opacity="0.6"/>
    <circle cx="60" cy="60" r="45" fill="none" stroke={color} strokeWidth="1" opacity="0.4"/>

    {/* Central symbol */}
    <circle cx="60" cy="60" r="25" fill={color} opacity="0.9"/>
    <circle cx="60" cy="60" r="18" fill="white"/>
    <circle cx="60" cy="60" r="12" fill={color} opacity="0.8"/>
    <circle cx="60" cy="60" r="6" fill="white"/>

    {/* Radiating lines */}
    <g stroke={color} strokeWidth="2" opacity="0.7">
      <line x1="60" y1="5" x2="60" y2="15"/>
      <line x1="60" y1="105" x2="60" y2="115"/>
      <line x1="5" y1="60" x2="15" y2="60"/>
      <line x1="105" y1="60" x2="115" y2="60"/>
      <line x1="20" y1="20" x2="30" y2="30"/>
      <line x1="90" y1="90" x2="100" y2="100"/>
      <line x1="20" y1="100" x2="30" y2="90"/>
      <line x1="90" y1="30" x2="100" y2="20"/>
    </g>

    {/* Decorative elements */}
    <circle cx="35" cy="35" r="3" fill={color} opacity="0.5"/>
    <circle cx="85" cy="35" r="3" fill={color} opacity="0.5"/>
    <circle cx="35" cy="85" r="3" fill={color} opacity="0.5"/>
    <circle cx="85" cy="85" r="3" fill={color} opacity="0.5"/>
  </svg>
);

export const Sankofa = ({ className = '', color = 'currentColor' }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none">
    {/* Heart shape */}
    <path d="M60 95c-15-20-30-15-30-30 0-8 7-15 15-15 5 0 10 3 12 7 2-4 7-7 12-7 8 0 15 7 15 15 0 15-15 10-30 30z" fill={color} opacity="0.9"/>
    <path d="M60 90c-12-16-24-12-24-24 0-6 5-11 11-11 4 0 8 2 9 5 1-3 5-5 9-5 6 0 11 5 11 11 0 12-12 8-24 24z" fill="white"/>

    {/* Bird head */}
    <circle cx="60" cy="45" r="8" fill={color}/>
    <circle cx="60" cy="45" r="5" fill="white"/>
    <circle cx="60" cy="45" r="2" fill={color}/>

    {/* Bird body */}
    <ellipse cx="60" cy="60" rx="12" ry="18" fill={color}/>
    <ellipse cx="60" cy="58" rx="10" ry="15" fill="white"/>

    {/* Wings */}
    <ellipse cx="50" cy="55" rx="8" ry="12" fill={color} opacity="0.8"/>
    <ellipse cx="70" cy="55" rx="8" ry="12" fill={color} opacity="0.8"/>

    {/* Tail */}
    <polygon points="60,75 50,85 55,80 60,90 65,80 70,85" fill={color}/>

    {/* Feet */}
    <line x1="55" y1="75" x2="52" y2="82" stroke={color} strokeWidth="2"/>
    <line x1="65" y1="75" x2="68" y2="82" stroke={color} strokeWidth="2"/>
    <circle cx="52" cy="83" r="1.5" fill={color}/>
    <circle cx="68" cy="83" r="1.5" fill={color}/>
  </svg>
);

export const Adinkrahene = ({ className = '', color = 'currentColor' }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none">
    {/* Outer circle */}
    <circle cx="60" cy="60" r="55" fill="none" stroke={color} strokeWidth="3"/>
    <circle cx="60" cy="60" r="50" fill="none" stroke={color} strokeWidth="1" opacity="0.6"/>
    <circle cx="60" cy="60" r="45" fill="none" stroke={color} strokeWidth="1" opacity="0.4"/>
    <circle cx="60" cy="60" r="40" fill="none" stroke={color} strokeWidth="1" opacity="0.3"/>

    {/* Middle circle */}
    <circle cx="60" cy="60" r="30" fill="none" stroke={color} strokeWidth="2"/>
    <circle cx="60" cy="60" r="25" fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
    <circle cx="60" cy="60" r="20" fill="none" stroke={color} strokeWidth="1" opacity="0.4"/>

    {/* Inner circle */}
    <circle cx="60" cy="60" r="15" fill="none" stroke={color} strokeWidth="2"/>
    <circle cx="60" cy="60" r="10" fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
    <circle cx="60" cy="60" r="5" fill={color} opacity="0.8"/>

    {/* Connecting lines */}
    <g stroke={color} strokeWidth="1.5" opacity="0.6">
      <line x1="15" y1="60" x2="25" y2="60"/>
      <line x1="95" y1="60" x2="105" y2="60"/>
      <line x1="60" y1="15" x2="60" y2="25"/>
      <line x1="60" y1="95" x2="60" y2="105"/>
    </g>
  </svg>
);

export const Dwennimmen = ({ className = '', color = 'currentColor' }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none">
    {/* Ram's horns */}
    <path d="M30 70c0-20 15-35 30-35s30 15 30 35c0 10-5 20-15 25l15 15h-20l-10-10-10 10h-20l15-15c-10-5-15-15-15-25z" fill={color} opacity="0.9"/>
    <path d="M35 75c0-15 10-25 20-25s20 10 20 25c0 7-3 13-9 16l9 9h-15l-7-7-7 7h-15l9-9c-6-3-9-9-9-16z" fill="white"/>

    {/* Horn details */}
    <ellipse cx="45" cy="55" rx="8" ry="12" fill={color} opacity="0.7"/>
    <ellipse cx="75" cy="55" rx="8" ry="12" fill={color} opacity="0.7"/>
    <ellipse cx="45" cy="50" rx="5" ry="8" fill="white" opacity="0.8"/>
    <ellipse cx="75" cy="50" rx="5" ry="8" fill="white" opacity="0.8"/>

    {/* Eyes */}
    <circle cx="45" cy="70" r="3" fill="white"/>
    <circle cx="75" cy="70" r="3" fill="white"/>
    <circle cx="46" cy="69" r="1.5" fill={color}/>
    <circle cx="76" cy="69" r="1.5" fill={color}/>
  </svg>
);

export const NyameDua = ({ className = '', color = 'currentColor' }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none">
    {/* Tree trunk */}
    <rect x="55" y="60" width="10" height="50" fill={color} opacity="0.9"/>
    <rect x="57" y="60" width="6" height="50" fill="#8B4513" opacity="0.8"/>

    {/* Tree crown */}
    <polygon points="60,20 30,60 90,60" fill={color} opacity="0.8"/>
    <polygon points="60,25 35,55 85,55" fill="#228B22" opacity="0.9"/>
    <polygon points="60,30 40,50 80,50" fill="#32CD32" opacity="0.7"/>

    {/* Divine symbol at top */}
    <circle cx="60" cy="35" r="8" fill="white"/>
    <circle cx="60" cy="35" r="5" fill={color} opacity="0.8"/>
    <circle cx="60" cy="35" r="2" fill="white"/>

    {/* Roots */}
    <path d="M50 110 Q45 115 50 120" stroke={color} strokeWidth="3" fill="none"/>
    <path d="M70 110 Q75 115 70 120" stroke={color} strokeWidth="3" fill="none"/>
    <path d="M45 105 Q40 110 45 115" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M75 105 Q80 110 75 115" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
);

export const Funtunfunefu = ({ className = '', color = 'currentColor' }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none">
    {/* Top crocodile */}
    <path d="M30 35h60v10h-60z" fill={color} opacity="0.9"/>
    <path d="M32 37h56v6h-56z" fill="white"/>
    <circle cx="60" cy="42" r="6" fill={color}/>
    <circle cx="60" cy="42" r="3" fill="white"/>

    {/* Arrows pointing up */}
    <path d="M25 30l-10 10 10 10" stroke={color} strokeWidth="3" fill="none"/>
    <path d="M95 30l10 10-10 10" stroke={color} strokeWidth="3" fill="none"/>
    <circle cx="20" cy="35" r="2" fill={color}/>
    <circle cx="100" cy="35" r="2" fill={color}/>

    {/* Bottom crocodile */}
    <path d="M30 75h60v10h-60z" fill={color} opacity="0.9"/>
    <path d="M32 77h56v6h-56z" fill="white"/>
    <circle cx="60" cy="82" r="6" fill={color}/>
    <circle cx="60" cy="82" r="3" fill="white"/>

    {/* Arrows pointing down */}
    <path d="M25 90l-10-10 10-10" stroke={color} strokeWidth="3" fill="none"/>
    <path d="M95 90l10-10-10-10" stroke={color} strokeWidth="3" fill="none"/>
    <circle cx="20" cy="75" r="2" fill={color}/>
    <circle cx="100" cy="75" r="2" fill={color}/>

    {/* Connecting lines */}
    <line x1="60" y1="45" x2="60" y2="75" stroke={color} strokeWidth="2"/>
    <circle cx="60" cy="60" r="4" fill={color} opacity="0.7"/>
  </svg>
);

// ================================================
// PREMIUM PATTERN BACKGROUNDS
// ================================================

export const AkanPatternBackground = ({
  className = '',
  opacity = 0.05,
  color = '#1a365d'
}: {
  className?: string;
  opacity?: number;
  color?: string;
}) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    <svg width="100%" height="100%" className="absolute inset-0">
      <defs>
        <pattern id="premium-akan-pattern" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
          {/* Concentric circles */}
          <circle cx="35" cy="35" r="15" fill="none" stroke={color} strokeWidth="2" opacity={opacity}/>
          <circle cx="35" cy="35" r="10" fill="none" stroke={color} strokeWidth="1.5" opacity={opacity}/>
          <circle cx="35" cy="35" r="5" fill={color} opacity={opacity * 0.8}/>

          {/* Interlocking rings */}
          <circle cx="105" cy="35" r="18" fill="none" stroke={color} strokeWidth="2" opacity={opacity}/>
          <circle cx="105" cy="35" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity={opacity}/>
          <circle cx="105" cy="35" r="6" fill="none" stroke={color} strokeWidth="1" opacity={opacity}/>

          {/* Spiral elements */}
          <path d="M35 105 Q45 95 55 105 Q45 115 35 105" fill="none" stroke={color} strokeWidth="2" opacity={opacity}/>
          <circle cx="35" cy="125" r="6" fill={color} opacity={opacity * 0.6}/>

          {/* Diamond patterns */}
          <polygon points="105,95 115,105 105,115 95,105" fill="none" stroke={color} strokeWidth="1.5" opacity={opacity}/>
          <circle cx="105" cy="125" r="4" fill={color} opacity={opacity * 0.7}/>

          {/* Connecting lines */}
          <line x1="35" y1="35" x2="105" y2="35" stroke={color} strokeWidth="1" opacity={opacity * 0.5}/>
          <line x1="35" y1="105" x2="105" y2="95" stroke={color} strokeWidth="1" opacity={opacity * 0.5}/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#premium-akan-pattern)"/>
    </svg>
  </div>
);

export const AkanBorder = ({ className = '', color = 'currentColor' }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 500 50" className={className} fill="none">
    <pattern id="premium-akan-border" x="0" y="0" width="120" height="50" patternUnits="userSpaceOnUse">
      {/* Enhanced concentric circles */}
      <circle cx="25" cy="25" r="10" stroke={color} strokeWidth="2.5" fill="none"/>
      <circle cx="25" cy="25" r="6" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="25" cy="25" r="2" fill={color} opacity="0.4"/>

      {/* Interlocking elements */}
      <circle cx="60" cy="25" r="12" stroke={color} strokeWidth="2.5" fill="none"/>
      <circle cx="60" cy="25" r="8" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="60" cy="25" r="3" fill="none" stroke={color} strokeWidth="1"/>

      {/* Spiral motifs */}
      <path d="M95 15 Q105 25 95 35 Q85 25 95 15" fill="none" stroke={color} strokeWidth="2"/>
      <circle cx="95" cy="40" r="3" fill={color} opacity="0.5"/>

      {/* Connecting elements */}
      <line x1="35" y1="25" x2="48" y2="25" stroke={color} strokeWidth="2"/>
      <line x1="72" y1="25" x2="83" y2="25" stroke={color} strokeWidth="2"/>
    </pattern>
    <rect width="100%" height="100%" fill="url(#premium-akan-border)"/>
  </svg>
);

// ================================================
// PREMIUM HOTEL ICONS
// ================================================

export const HotelIcon = ({ className = '', color = 'currentColor' }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none">
    {/* Building structure */}
    <rect x="25" y="40" width="70" height="70" fill="#E5E7EB" stroke={color} strokeWidth="1.5" rx="4"/>
    <rect x="20" y="35" width="80" height="10" fill={color} rx="3"/>

    {/* Windows with lights */}
    {[0,1,2,3,4].map(floor => (
      [0,1,2,3].map(window => {
        const x = 30 + window * 15;
        const y = 50 + floor * 12;
        const isLit = Math.random() > 0.4;
        return (
          <rect
            key={`${floor}-${window}`}
            x={x}
            y={y}
            width="10"
            height="8"
            fill={isLit ? "#FEF3C7" : "#6B7280"}
            stroke="#374151"
            strokeWidth="0.5"
            rx="1"
          />
        );
      })
    ))}

    {/* Entrance */}
    <rect x="50" y="95" width="20" height="15" fill="#1F2937" rx="2"/>
    <rect x="45" y="90" width="30" height="8" fill={color} rx="3"/>
    <text x="60" y="98" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">HOTEL</text>

    {/* Decorative elements */}
    <circle cx="30" cy="38" r="2" fill="#EF4444"/>
    <circle cx="90" cy="38" r="2" fill="#EF4444"/>
    <rect x="22" y="32" width="76" height="6" fill={color} rx="3"/>
  </svg>
);

export const MountainIcon = ({ className = '', color = 'currentColor' }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 120 80" className={className} fill="none">
    {/* Main mountain */}
    <polygon points="60,10 100,70 20,70" fill={color} opacity="0.9"/>
    <polygon points="60,15 90,65 30,65" fill="#4A7C2A" opacity="0.8"/>
    <polygon points="60,20 80,60 40,60" fill="#2D5016" opacity="0.7"/>

    {/* Secondary peaks */}
    <polygon points="85,25 110,70 60,70" fill={color} opacity="0.6"/>
    <polygon points="35,30 55,70 15,70" fill={color} opacity="0.5"/>

    {/* Snow caps */}
    <polygon points="60,10 55,18 65,18" fill="white" opacity="0.95"/>
    <polygon points="85,25 82,30 88,30" fill="white" opacity="0.9"/>
    <polygon points="35,30 32,35 38,35" fill="white" opacity="0.85"/>

    {/* Trees */}
    <polygon points="45,55 48,45 51,55" fill="#166534"/>
    <polygon points="75,50 78,40 81,50" fill="#15803D"/>
  </svg>
);

export const ConferenceIcon = ({ className = '', color = 'currentColor' }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none">
    {/* Room outline */}
    <rect x="15" y="50" width="90" height="60" fill="#F8FAFC" stroke={color} strokeWidth="1.5" rx="3"/>

    {/* Conference table */}
    <ellipse cx="60" cy="85" rx="35" ry="12" fill={color} opacity="0.8"/>
    <ellipse cx="60" cy="82" rx="35" ry="12" fill="#6B7280" opacity="0.6"/>

    {/* Chairs */}
    {[0, 72, 144, 216, 288].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 60 + Math.cos(rad) * 30;
      const y = 85 + Math.sin(rad) * 8;
      return (
        <g key={i}>
          <rect x={x-6} y={y-8} width="12" height="16" fill="#374151" rx="2"/>
          <rect x={x-4} y={y-12} width="8" height="6" fill="#6B7280" rx="1"/>
        </g>
      );
    })}

    {/* Screen */}
    <rect x="40" y="15" width="40" height="25" fill="#1F2937" stroke={color} strokeWidth="1" rx="2"/>
    <rect x="45" y="20" width="30" height="15" fill="#3B82F6" opacity="0.7"/>
    <circle cx="60" cy="27.5" r="3" fill="white" opacity="0.8"/>
  </svg>
);

export const CurrencyIcon = ({ currency, className = '' }: { currency: string; className?: string }) => {
  const symbols: Record<string, string> = { GHS: '₵', USD: '$', EUR: '€', GBP: '£', XOF: 'CFA' };
  return <span className={`font-bold text-lg ${className}`}>{symbols[currency] || currency}</span>;
};

// ================================================
// AMENITY UTILITIES
// ================================================

export const AMENITY_ICONS: Record<string, (props: IconProps) => JSX.Element> = {
  'ac': AirConditioningIcon,
  'wifi': WifiIcon,
  'breakfast': BreakfastIcon,
  'tv': TvIcon,
  'parking': ParkingIcon,
  'security': SecurityIcon,
  'room_service': RoomServiceIcon,
  'shower': ShowerIcon,
  'projector': ProjectorIcon,
  'microphone': MicrophoneIcon,
  'mountain_view': MountainViewIcon,
  'bed': BedIcon,
};

const AMENITY_LABELS: Record<string, string> = {
  'ac': 'A/C', 'wifi': 'WiFi', 'breakfast': 'Breakfast', 'tv': 'TV',
  'parking': 'Parking', 'security': '24/7 Security', 'room_service': 'Room Service',
  'shower': 'Hot Shower', 'projector': 'Projector', 'microphone': 'Sound System',
  'mountain_view': 'View', 'bed': 'King Bed',
};

export { AMENITY_LABELS };

export const AmenityBadge = ({ 
  type, 
  showLabel = false,
  size = 20,
  className = ''
}: { 
  type: string; 
  showLabel?: boolean;
  size?: number;
  className?: string;
}) => {
  const Icon = AMENITY_ICONS[type];
  if (!Icon) return null;
  return (
    <div className={`flex items-center gap-1.5 ${className}`} title={AMENITY_LABELS[type]}>
      <Icon size={size} color="currentColor" />
      {showLabel && <span className="text-xs">{AMENITY_LABELS[type]}</span>}
    </div>
  );
};

// ================================================
// EXPORTS
// ================================================

export interface AkanSymbol {
  name: string;
  component: (props: { className?: string; color?: string }) => JSX.Element;
  meaning: string;
}

export const akanSymbols: AkanSymbol[] = [
  { name: 'Gye Nyame', component: GyeNyame, meaning: 'Except God - Supremacy of God' },
  { name: 'Sankofa', component: Sankofa, meaning: 'Go back and get it - Learn from the past' },
  { name: 'Adinkrahene', component: Adinkrahene, meaning: 'Chief of Adinkra - Leadership' },
  { name: 'Dwennimmen', component: Dwennimmen, meaning: "Ram's horns - Humility and strength" },
  { name: 'Nyame Dua', component: NyameDua, meaning: "God's Tree - Divine protection" },
  { name: 'Funtunfunefu', component: Funtunfunefu, meaning: 'Siamese crocodiles - Unity' },
];
