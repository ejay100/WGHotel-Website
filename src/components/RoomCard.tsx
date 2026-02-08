import React, { useState } from 'react';
import { AmenityBadge, AMENITY_LABELS } from '@/lib/svgAssets';

interface RoomCardProps {
  roomId: string;
  roomNumber: string;
  type: 'standard' | 'executive' | 'presidential' | 'chalet';
  capacity: number;
  price: number;
  amenities: string[];
  status: 'available' | 'occupied' | 'maintenance';
  onSelect?: (roomId: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  roomId,
  roomNumber,
  type,
  capacity: _capacity, // Intentionally unused per design
  price,
  amenities,
  status,
  onSelect,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors: Record<string, string> = {
    available: 'bg-green-100 border-green-400',
    occupied: 'bg-red-100 border-red-400',
    maintenance: 'bg-yellow-100 border-yellow-400',
  };

  const typeNames: Record<string, string> = {
    standard: 'Standard Room',
    executive: 'Executive Room',
    presidential: 'Presidential Suite',
    chalet: 'Mountain Chalet',
  };

  return (
    <div
      className={`
        border-2 rounded-lg p-6 transition-all duration-300 cursor-pointer
        ${statusColors[status]}
        ${isHovered ? 'shadow-lg transform scale-105' : 'shadow-md'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => status === 'available' && onSelect?.(roomId)}
    >
      {/* Room Number & Status Badge */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-slate-800">Room {roomNumber}</h3>
        <span className={`
          px-3 py-1 rounded-full text-xs font-bold
          ${status === 'available' ? 'bg-green-500 text-white' : ''}
          ${status === 'occupied' ? 'bg-red-500 text-white' : ''}
          ${status === 'maintenance' ? 'bg-yellow-500 text-white' : ''}
        `}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Room Type */}
      <p className="text-sm text-slate-700 mb-3 font-semibold">
        {typeNames[type]}
      </p>

      {/* Price */}
      <div className="mb-4 pb-4 border-b border-slate-300">
        <p className="text-xs text-slate-600">Price per Night</p>
        <p className="text-2xl font-bold text-amber-700">GHS {price}</p>
      </div>

      {/* Amenities as Icons */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-slate-700 mb-2">AMENITIES</p>
        <div className="flex flex-wrap gap-2">
          {amenities.map((amenity, idx) => {
            const amenityKey = amenity.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z_]/g, '');
            return (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg text-xs text-slate-700 border border-slate-200"
                title={AMENITY_LABELS[amenityKey] || amenity}
              >
                <AmenityBadge type={amenityKey} size={14} className="text-forest-600" />
                <span className="hidden sm:inline">{AMENITY_LABELS[amenityKey] || amenity}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Standard Features - Icon Only */}
      <div className="flex gap-3 mb-4">
        <div className="flex items-center gap-1 text-xs text-slate-600">
          <AmenityBadge type="ac" size={16} className="text-blue-500" />
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-600">
          <AmenityBadge type="breakfast" size={16} className="text-amber-500" />
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-600">
          <AmenityBadge type="wifi" size={16} className="text-green-500" />
        </div>
      </div>

      {/* CTA Button */}
      {status === 'available' && (
        <button
          onClick={() => onSelect?.(roomId)}
          className={`
            w-full py-2 rounded font-bold text-white transition-all
            ${isHovered ? 'bg-amber-600' : 'bg-amber-500'}
          `}
        >
          Book This Room
        </button>
      )}

      {status !== 'available' && (
        <button disabled className="w-full py-2 rounded font-bold text-gray-400 bg-gray-300">
          {status === 'occupied' ? 'Not Available' : 'Maintenance'}
        </button>
      )}
    </div>
  );
};

export default RoomCard;
