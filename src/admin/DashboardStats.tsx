import React from 'react';
import { getOccupancyRate, calculateRevPAR, formatCurrency } from '@/lib/helpers';

interface DashboardStatsProps {
  occupiedRooms: number;
  totalRooms?: number;
  totalRevenue: number;
  pendingBookings: number;
  guestSatisfaction: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  occupiedRooms,
  totalRooms = 44,
  totalRevenue,
  pendingBookings,
  guestSatisfaction,
}) => {
  const occupancyRate = getOccupancyRate(occupiedRooms, totalRooms);
  const revPAR = calculateRevPAR(totalRevenue, totalRooms);

  const stats = [
    {
      label: 'Occupancy Rate',
      value: `${occupancyRate.toFixed(1)}%`,
      icon: '🏨',
      trend: occupancyRate > 75 ? '↑' : '↓',
      color: occupancyRate > 75 ? 'text-green-600' : 'text-orange-600',
    },
    {
      label: 'Revenue Per Room',
      value: formatCurrency(revPAR),
      icon: '💰',
      trend: revPAR > 300 ? '↑' : '↓',
      color: revPAR > 300 ? 'text-green-600' : 'text-orange-600',
    },
    {
      label: 'Pending Bookings',
      value: pendingBookings.toString(),
      icon: '📋',
      trend: pendingBookings > 0 ? '⚠️' : '✓',
      color: pendingBookings > 0 ? 'text-amber-600' : 'text-green-600',
    },
    {
      label: 'Guest Satisfaction',
      value: `${guestSatisfaction}/5.0`,
      icon: '⭐',
      trend: guestSatisfaction >= 4 ? '↑' : '↓',
      color: guestSatisfaction >= 4 ? 'text-green-600' : 'text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color} mt-2`}>{stat.value}</p>
            </div>
            <span className="text-3xl">{stat.icon}</span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500">Trend</span>
            <span className="text-lg">{stat.trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
