// ================================================
// FLAT, COLORFUL CONFERENCE ROOM ILLUSTRATION
// Inspired by modern flat illustration style
// Diverse team collaboration scene
// ================================================

import React from 'react';

interface BoardroomIllustrationProps {
  className?: string;
}

export const BoardroomIllustration: React.FC<BoardroomIllustrationProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 700 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background - Modern Office */}
      <rect width="700" height="600" fill="#F0F4FF" />
      
      {/* Large window with city view */}
      <rect x="50" y="60" width="600" height="240" rx="16" fill="#E8F0FF" />
      <rect x="70" y="80" width="280" height="200" rx="8" fill="#A7C7FF" opacity="0.6" />
      <rect x="370" y="80" width="260" height="200" rx="8" fill="#7FB3FF" opacity="0.6" />
      
      {/* Plants - left side */}
      <ellipse cx="80" cy="520" rx="35" ry="20" fill="#34D399" opacity="0.3" />
      <path d="M80 520 Q70 460 80 430 Q90 460 80 520" fill="#10B981" />
      <path d="M80 480 Q65 470 55 460" stroke="#10B981" strokeWidth="4" fill="none" />
      <path d="M80 470 Q95 460 105 450" stroke="#10B981" strokeWidth="4" fill="none" />
      
      {/* Plants - right side */}
      <ellipse cx="620" cy="520" rx="35" ry="20" fill="#FBBF24" opacity="0.3" />
      <circle cx="620" cy="480" r="40" fill="#F59E0B" opacity="0.8" />
      <circle cx="620" cy="460" r="30" fill="#FBBF24" opacity="0.9" />
      
      {/* Conference table - curved modern design */}
      <ellipse cx="350" cy="420" rx="240" ry="80" fill="#6366F1" opacity="0.2" />
      <ellipse cx="350" cy="410" rx="240" ry="80" fill="#6366F1" opacity="0.4" />
      <ellipse cx="350" cy="400" rx="240" ry="80" fill="#6366F1" />
      
      {/* Laptops and items on table */}
      <g>
        {/* Laptop 1 */}
        <rect x="200" y="370" width="60" height="42" rx="3" fill="#1E293B" />
        <rect x="203" y="373" width="54" height="36" rx="2" fill="#3B82F6" opacity="0.4" />
        
        {/* Laptop 2 */}
        <rect x="440" y="370" width="60" height="42" rx="3" fill="#1E293B" />
        <rect x="443" y="373" width="54" height="36" rx="2" fill="#10B981" opacity="0.4" />
        
        {/* Documents */}
        <rect x="310" y="380" width="35" height="25" rx="2" fill="#FFFFFF" />
        <line x1="315" y1="387" x2="340" y2="387" stroke="#94A3B8" strokeWidth="2" />
        <line x1="315" y1="393" x2="335" y2="393" stroke="#94A3B8" strokeWidth="2" />
        
        {/* Coffee cup 1 */}
        <ellipse cx="280" cy="395" rx="10" ry="4" fill="#F59E0B" />
        <rect x="270" y="385" width="20" height="10" rx="2" fill="#FFFFFF" />
        <rect x="273" y="387" width="14" height="8" fill="#78350F" />
        
        {/* Coffee cup 2 */}
        <ellipse cx="520" cy="395" rx="10" ry="4" fill="#EC4899" />
        <rect x="510" y="385" width="20" height="10" rx="2" fill="#FFFFFF" />
        <rect x="513" y="387" width="14" height="8" fill="#78350F" />
      </g>
      
      {/* Person 1 - Woman with hijab, left side */}
      <g>
        <circle cx="180" cy="300" r="28" fill="#FBBF24" />
        <path d="M152 290 Q180 265 208 290 L208 330 Q180 340 152 330 Z" fill="#8B5CF6" />
        <ellipse cx="170" cy="305" rx="3" ry="4" fill="#1E293B" />
        <ellipse cx="190" cy="305" rx="3" ry="4" fill="#1E293B" />
        <path d="M175 315 Q180 318 185 315" stroke="#EC4899" strokeWidth="2" fill="none" />
        
        {/* Body */}
        <path d="M180 328 L180 420 M180 350 L155 390 M180 350 L205 390" 
              stroke="#8B5CF6" strokeWidth="16" strokeLinecap="round" />
        <path d="M180 420 L165 490 M180 420 L195 490" 
              stroke="#1E293B" strokeWidth="14" strokeLinecap="round" />
      </g>
      
      {/* Person 2 - Man presenting, center */}
      <g>
        <circle cx="350" cy="280" r="32" fill="#FCA5A5" />
        <path d="M330 265 Q350 255 370 265" fill="#1E293B" />
        <ellipse cx="340" cy="285" rx="3" ry="4" fill="#1E293B" />
        <ellipse cx="360" cy="285" rx="3" ry="4" fill="#1E293B" />
        <path d="M343 298 Q350 302 357 298" stroke="#EF4444" strokeWidth="2.5" fill="none" />
        
        {/* Body with arm extended */}
        <path d="M350 312 L350 400 M350 330 L310 360 M350 330 L390 345" 
              stroke="#3B82F6" strokeWidth="18" strokeLinecap="round" />
        <circle cx="390" cy="345" r="8" fill="#FBBF24" />
        
        {/* Legs */}
        <path d="M350 400 L335 480 M350 400 L365 480" 
              stroke="#475569" strokeWidth="15" strokeLinecap="round" />
      </g>
      
      {/* Person 3 - Man with glasses, right side */}
      <g>
        <circle cx="520" cy="300" r="28" fill="#A78BFA" />
        <ellipse cx="520" cy="290" rx="30" ry="18" fill="#1E293B" />
        
        {/* Glasses */}
        <circle cx="510" cy="302" r="8" fill="none" stroke="#1E293B" strokeWidth="2" />
        <circle cx="530" cy="302" r="8" fill="none" stroke="#1E293B" strokeWidth="2" />
        <line x1="518" y1="302" x2="522" y2="302" stroke="#1E293B" strokeWidth="2" />
        
        <path d="M513 315 Q520 318 527 315" stroke="#F59E0B" strokeWidth="2" fill="none" />
        
        {/* Body */}
        <path d="M520 328 L520 420 M520 350 L495 390 M520 350 L545 390" 
              stroke="#10B981" strokeWidth="16" strokeLinecap="round" />
        <path d="M520 420 L505 490 M520 420 L535 490" 
              stroke="#1F2937" strokeWidth="14" strokeLinecap="round" />
      </g>
      
      {/* Presentation screen/board */}
      <rect x="280" y="100" width="140" height="100" rx="8" fill="#1E293B" />
      <rect x="288" y="108" width="124" height="84" rx="4" fill="#F0F9FF" />
      
      {/* Charts on screen */}
      <g>
        {/* Bar chart */}
        <rect x="300" y="160" width="12" height="25" fill="#3B82F6" rx="2" />
        <rect x="318" y="150" width="12" height="35" fill="#10B981" rx="2" />
        <rect x="336" y="155" width="12" height="30" fill="#F59E0B" rx="2" />
        <rect x="354" y="145" width="12" height="40" fill="#EC4899" rx="2" />
        
        {/* Growth line */}
        <polyline points="300,135 320,125 340,130 360,115" 
                  stroke="#8B5CF6" strokeWidth="3" fill="none" />
        <circle cx="300" cy="135" r="3" fill="#8B5CF6" />
        <circle cx="320" cy="125" r="3" fill="#8B5CF6" />
        <circle cx="340" cy="130" r="3" fill="#8B5CF6" />
        <circle cx="360" cy="115" r="3" fill="#8B5CF6" />
      </g>
      
      {/* Floating idea bubbles */}
      <circle cx="250" cy="200" r="15" fill="#FCD34D" opacity="0.7" />
      <text x="250" y="207" textAnchor="middle" fill="#78350F" fontSize="18">💡</text>
      
      <circle cx="450" cy="190" r="12" fill="#A7F3D0" opacity="0.7" />
      <text x="450" y="196" textAnchor="middle" fill="#065F46" fontSize="14">✓</text>
      
      {/* Floating icons - collaboration symbols */}
      <g opacity="0.5">
        <circle cx="120" cy="250" r="6" fill="#3B82F6" />
        <circle cx="580" cy="240" r="6" fill="#10B981" />
        <circle cx="350" cy="150" r="6" fill="#F59E0B" />
        <circle cx="200" cy="180" r="5" fill="#EC4899" />
        <circle cx="500" cy="170" r="5" fill="#8B5CF6" />
      </g>
      
      {/* Decorative elements - connection lines */}
      <line x1="180" y1="280" x2="220" y2="260" stroke="#3B82F6" strokeWidth="2" opacity="0.3" strokeDasharray="4 4" />
      <line x1="520" y1="280" x2="480" y2="260" stroke="#10B981" strokeWidth="2" opacity="0.3" strokeDasharray="4 4" />
      
      {/* Clock on wall */}
      <circle cx="100" cy="120" r="25" fill="#FFFFFF" stroke="#334155" strokeWidth="3" />
      <line x1="100" y1="120" x2="100" y2="105" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="120" x2="112" y2="127" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
      
      {/* WiFi signal indicator */}
      <g transform="translate(600, 100)">
        <path d="M 0 20 Q -15 10 -20 0" stroke="#10B981" strokeWidth="3" fill="none" opacity="0.6" />
        <path d="M 0 20 Q -10 13 -13 8" stroke="#10B981" strokeWidth="3" fill="none" opacity="0.8" />
        <circle cx="0" cy="20" r="3" fill="#10B981" />
      </g>
    </svg>
  );
};

export default BoardroomIllustration;
