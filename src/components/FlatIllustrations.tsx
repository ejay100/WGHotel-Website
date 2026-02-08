// ================================================
// FLAT ILLUSTRATION ASSETS
// Inspired by modern flat design with diverse characters
// ================================================

interface IllustrationProps {
  className?: string;
}

// Welcoming Staff Character - Flat Style
export const WelcomeStaffIllustration = ({ className = '' }: IllustrationProps) => (
  <svg viewBox="0 0 500 600" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background Elements */}
    <circle cx="250" cy="300" r="200" fill="#d4af37" opacity="0.1"/>
    <circle cx="350" cy="250" r="80" fill="#6ee7b7" opacity="0.2"/>
    
    {/* Staff Person - Standing with welcoming gesture */}
    {/* Skin tone */}
    <ellipse cx="250" cy="200" rx="45" ry="50" fill="#8B6F47"/>
    
    {/* Hair */}
    <path d="M205 170 Q250 150 295 170 Q300 200 250 210 Q200 200 205 170Z" fill="#2C1810"/>
    
    {/* Eyes */}
    <circle cx="235" cy="195" r="4" fill="#1F2937"/>
    <circle cx="265" cy="195" r="4" fill="#1F2937"/>
    
    {/* Smile */}
    <path d="M230 210 Q250 220 270 210" stroke="#2C1810" strokeWidth="3" fill="none" strokeLinecap="round"/>
    
    {/* Body - Uniform */}
    <rect x="210" y="250" width="80" height="120" rx="10" fill="#d4af37"/>
    <rect x="220" y="260" width="60" height="15" fill="#FFF" opacity="0.3"/>
    
    {/* Name Tag */}
    <rect x="225" y="290" width="50" height="20" rx="3" fill="#FFF"/>
    <text x="250" y="303" fontSize="10" fill="#1F2937" textAnchor="middle" fontWeight="600">WGH STAFF</text>
    
    {/* Arms - Welcoming gesture */}
    <path d="M210 270 L170 320 L180 330 L220 280" fill="#8B6F47"/>
    <path d="M290 270 L330 320 L320 330 L280 280" fill="#8B6F47"/>
    
    {/* Hands */}
    <circle cx="175" cy="325" r="12" fill="#8B6F47"/>
    <circle cx="325" cy="325" r="12" fill="#8B6F47"/>
    
    {/* Legs */}
    <rect x="225" y="370" width="20" height="80" rx="10" fill="#475569"/>
    <rect x="255" y="370" width="20" height="80" rx="10" fill="#475569"/>
    
    {/* Shoes */}
    <ellipse cx="235" cy="455" rx="18" ry="8" fill="#1F2937"/>
    <ellipse cx="265" cy="455" rx="18" ry="8" fill="#1F2937"/>
    
    {/* Floating Elements - Hospitality Icons */}
    <g opacity="0.6">
      <text x="150" y="150" fontSize="30">☕</text>
      <text x="350" y="180" fontSize="30">🛎️</text>
      <text x="120" y="400" fontSize="30">🔑</text>
      <text x="380" y="420" fontSize="30">🌟</text>
    </g>
  </svg>
);

// Heritage & Culture Character
export const HeritageCharacterIllustration = ({ className = '' }: IllustrationProps) => (
  <svg viewBox="0 0 500 600" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <circle cx="250" cy="300" r="180" fill="#f59e0b" opacity="0.15"/>
    <circle cx="150" cy="200" r="60" fill="#ec4899" opacity="0.2"/>
    
    {/* Person in Traditional Attire */}
    {/* Head */}
    <ellipse cx="250" cy="180" rx="40" ry="45" fill="#6B5344"/>
    
    {/* Traditional Headwrap */}
    <path d="M210 155 Q250 130 290 155 L295 175 Q250 160 205 175 Z" fill="#ec4899"/>
    <path d="M210 155 L215 145 Q250 135 285 145 L290 155" fill="#f472b6"/>
    
    {/* Eyes and smile */}
    <circle cx="235" cy="175" r="3" fill="#1F2937"/>
    <circle cx="265" cy="175" r="3" fill="#1F2937"/>
    <path d="M235 195 Q250 203 265 195" stroke="#2C1810" strokeWidth="2" fill="none"/>
    
    {/* Traditional Kente Cloth Pattern */}
    <rect x="210" y="225" width="80" height="140" rx="8" fill="#d4af37"/>
    {/* Kente patterns */}
    <rect x="220" y="235" width="60" height="10" fill="#ec4899"/>
    <rect x="220" y="255" width="60" height="10" fill="#10b981"/>
    <rect x="220" y="275" width="60" height="10" fill="#3b82f6"/>
    <rect x="220" y="295" width="60" height="10" fill="#ec4899"/>
    <rect x="220" y="315" width="60" height="10" fill="#f59e0b"/>
    
    {/* Arms */}
    <path d="M210 240 L180 300 Q175 310 185 315 L215 260" fill="#6B5344"/>
    <path d="M290 240 L320 300 Q325 310 315 315 L285 260" fill="#6B5344"/>
    
    {/* Hands holding traditional items */}
    <circle cx="185" cy="312" r="10" fill="#6B5344"/>
    <circle cx="315" cy="312" r="10" fill="#6B5344"/>
    {/* Adinkra symbol */}
    <circle cx="185" cy="340" r="25" fill="#8B4513" opacity="0.8"/>
    <path d="M185 320 L185 360 M165 340 L205 340" stroke="#d4af37" strokeWidth="4"/>
    
    {/* Legs */}
    <rect x="230" y="365" width="18" height="70" rx="9" fill="#6B5344"/>
    <rect x="252" y="365" width="18" height="70" rx="9" fill="#6B5344"/>
    
    {/* Decorative Cultural Elements */}
    <g opacity="0.7">
      <text x="350" y="250" fontSize="35">👑</text>
      <text x="100" y="350" fontSize="35">⚱️</text>
      <text x="380" y="400" fontSize="35">🪶</text>
    </g>
  </svg>
);

// Market Scene Character - Vendor
export const MarketVendorIllustration = ({ className = '' }: IllustrationProps) => (
  <svg viewBox="0 0 500 600" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <circle cx="250" cy="300" r="200" fill="#10b981" opacity="0.12"/>
    <circle cx="380" cy="220" r="70" fill="#f59e0b" opacity="0.2"/>
    
    {/* Vendor Character */}
    {/* Head */}
    <ellipse cx="250" cy="170" rx="42" ry="48" fill="#A0826D"/>
    
    {/* Hair/Headscarf */}
    <path d="M208 150 Q250 125 292 150 L295 170 Q250 145 205 170 Z" fill="#6ee7b7"/>
    <circle cx="270" cy="150" r="8" fill="#10b981"/>
    
    {/* Face */}
    <circle cx="237" cy="165" r="4" fill="#1F2937"/>
    <circle cx="263" cy="165" r="4" fill="#1F2937"/>
    <path d="M235 185 Q250 192 265 185" stroke="#2C1810" strokeWidth="3" fill="none"/>
    {/* Cheek blush */}
    <circle cx="225" cy="178" r="8" fill="#ec4899" opacity="0.3"/>
    <circle cx="275" cy="178" r="8" fill="#ec4899" opacity="0.3"/>
    
    {/* Body - Colorful dress */}
    <rect x="208" y="218" width="84" height="130" rx="12" fill="#f59e0b"/>
    <path d="M220 230 L280 230 L280 250 L220 250 Z" fill="#FFF" opacity="0.4"/>
    <circle cx="235" cy="270" r="5" fill="#ec4899"/>
    <circle cx="265" cy="270" r="5" fill="#6ee7b7"/>
    <circle cx="250" cy="295" r="5" fill="#3b82f6"/>
    
    {/* Arms */}
    <rect x="185" y="230" width="23" height="80" rx="11" fill="#A0826D" transform="rotate(-15 196 230)"/>
    <rect x="292" y="230" width="23" height="80" rx="11" fill="#A0826D" transform="rotate(15 304 230)"/>
    
    {/* Hands with basket */}
    <ellipse cx="195" cy="310" rx="12" ry="10" fill="#A0826D"/>
    <ellipse cx="305" cy="310" rx="12" ry="10" fill="#A0826D"/>
    
    {/* Market Basket */}
    <ellipse cx="250" cy="380" rx="60" ry="15" fill="#8B4513"/>
    <path d="M190 380 L190 350 Q250 340 310 350 L310 380" fill="#D2691E"/>
    <path d="M200 360 L300 360" stroke="#8B4513" strokeWidth="3"/>
    
    {/* Fruits/Vegetables in basket */}
    <circle cx="230" cy="355" r="10" fill="#ef4444"/>
    <circle cx="255" cy="352" r="10" fill="#f59e0b"/>
    <circle cx="275" cy="357" r="10" fill="#10b981"/>
    
    {/* Legs */}
    <rect x="230" y="348" width="18" height="75" rx="9" fill="#64748b"/>
    <rect x="252" y="348" width="18" height="75" rx="9" fill="#64748b"/>
    
    {/* Market Icons */}
    <g opacity="0.6">
      <text x="100" y="200" fontSize="32">🌾</text>
      <text x="370" y="350" fontSize="32">🥭</text>
      <text x="120" y="450" fontSize="32">🌽</text>
    </g>
  </svg>
);

export default {
  WelcomeStaffIllustration,
  HeritageCharacterIllustration,
  MarketVendorIllustration
};
