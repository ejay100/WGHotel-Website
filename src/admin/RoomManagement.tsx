import React, { useState } from 'react';
import { Plus, Edit, Bed, Users, DollarSign, Wifi, Coffee, Tv, Wind, Search, RefreshCw } from 'lucide-react';

interface Room {
  id: string;
  number: string;
  floor: number;
  type: 'standard' | 'deluxe' | 'executive' | 'presidential';
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning';
  capacity: number;
  pricePerNight: number;
  amenities: string[];
  lastCleaned?: string;
  currentGuest?: string;
  checkOutDate?: string;
}

const MOCK_ROOMS: Room[] = [
  {
    id: '1',
    number: '101',
    floor: 1,
    type: 'standard',
    status: 'available',
    capacity: 2,
    pricePerNight: 450,
    amenities: ['wifi', 'tv', 'ac'],
    lastCleaned: '2026-02-03 08:00',
  },
  {
    id: '2',
    number: '201',
    floor: 2,
    type: 'deluxe',
    status: 'occupied',
    capacity: 2,
    pricePerNight: 750,
    amenities: ['wifi', 'tv', 'ac', 'minibar', 'coffee'],
    currentGuest: 'Kwame Mensah',
    checkOutDate: '2026-02-08',
    lastCleaned: '2026-02-01 09:00',
  },
  {
    id: '3',
    number: '304',
    floor: 3,
    type: 'executive',
    status: 'occupied',
    capacity: 3,
    pricePerNight: 1200,
    amenities: ['wifi', 'tv', 'ac', 'minibar', 'coffee', 'balcony'],
    currentGuest: 'Ama Osei',
    checkOutDate: '2026-02-06',
    lastCleaned: '2026-02-02 10:00',
  },
  {
    id: '4',
    number: '105',
    floor: 1,
    type: 'standard',
    status: 'maintenance',
    capacity: 2,
    pricePerNight: 450,
    amenities: ['wifi', 'tv', 'ac'],
    lastCleaned: '2026-01-30 08:00',
  },
  {
    id: '5',
    number: '401',
    floor: 4,
    type: 'presidential',
    status: 'available',
    capacity: 4,
    pricePerNight: 2500,
    amenities: ['wifi', 'tv', 'ac', 'minibar', 'coffee', 'balcony', 'jacuzzi', 'dining'],
    lastCleaned: '2026-02-03 11:00',
  },
];

const RoomManagement: React.FC = () => {
  const [rooms] = useState<Room[]>(MOCK_ROOMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [floorFilter, setFloorFilter] = useState<string>('all');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.number.includes(searchTerm) || room.currentGuest?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    const matchesType = typeFilter === 'all' || room.type === typeFilter;
    const matchesFloor = floorFilter === 'all' || room.floor === Number(floorFilter);
    return matchesSearch && matchesStatus && matchesType && matchesFloor;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      available: 'bg-green-100 text-green-800 border-green-300',
      occupied: 'bg-red-100 text-red-800 border-red-300',
      maintenance: 'bg-amber-100 text-amber-800 border-amber-300',
      cleaning: 'bg-blue-100 text-blue-800 border-blue-300',
    };
    return colors[status as keyof typeof colors] || 'bg-slate-100 text-slate-800';
  };

  const getRoomTypeLabel = (type: string) => {
    const labels = {
      standard: 'Standard Room',
      deluxe: 'Deluxe Suite',
      executive: 'Executive Room',
      presidential: 'Presidential Suite',
    };
    return labels[type as keyof typeof labels] || type;
  };

  const stats = [
    {
      label: 'Total Rooms',
      value: rooms.length,
      icon: Bed,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Available',
      value: rooms.filter((r) => r.status === 'available').length,
      icon: Users,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Occupied',
      value: rooms.filter((r) => r.status === 'occupied').length,
      icon: Users,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      label: 'Maintenance',
      value: rooms.filter((r) => r.status === 'maintenance').length,
      icon: Bed,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ];

  const amenityIcons: Record<string, any> = {
    wifi: Wifi,
    tv: Tv,
    ac: Wind,
    coffee: Coffee,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${stat.bg} rounded-xl p-5 border border-slate-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <stat.icon className={`w-10 h-10 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by room number or guest..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
              <option value="cleaning">Cleaning</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="executive">Executive</option>
              <option value="presidential">Presidential</option>
            </select>

            <select
              value={floorFilter}
              onChange={(e) => setFloorFilter(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Floors</option>
              <option value="1">Floor 1</option>
              <option value="2">Floor 2</option>
              <option value="3">Floor 3</option>
              <option value="4">Floor 4</option>
            </select>

            <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <span className="hidden md:inline">Add Room</span>
            </button>

            <button className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className={`bg-white rounded-xl shadow-sm border-2 overflow-hidden hover:shadow-lg transition ${
              room.status === 'available' ? 'border-green-200' :
              room.status === 'occupied' ? 'border-red-200' :
              room.status === 'maintenance' ? 'border-amber-200' :
              'border-blue-200'
            }`}
          >
            {/* Room Header */}
            <div className={`p-4 ${
              room.status === 'available' ? 'bg-green-50' :
              room.status === 'occupied' ? 'bg-red-50' :
              room.status === 'maintenance' ? 'bg-amber-50' :
              'bg-blue-50'
            }`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">#{room.number}</h3>
                  <p className="text-sm text-slate-600">{getRoomTypeLabel(room.type)}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(room.status)}`}
                >
                  {room.status.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {room.capacity} guests
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  GHS {room.pricePerNight}
                </span>
              </div>
            </div>

            {/* Room Details */}
            <div className="p-4">
              {/* Amenities */}
              <div className="mb-4">
                <p className="text-xs text-slate-500 mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.slice(0, 4).map((amenity) => {
                    const Icon = amenityIcons[amenity];
                    return Icon ? (
                      <div
                        key={amenity}
                        className="p-2 bg-slate-100 rounded-lg"
                        title={amenity}
                      >
                        <Icon className="w-4 h-4 text-slate-600" />
                      </div>
                    ) : (
                      <span
                        key={amenity}
                        className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600"
                      >
                        {amenity}
                      </span>
                    );
                  })}
                  {room.amenities.length > 4 && (
                    <span className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600">
                      +{room.amenities.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Current Guest */}
              {room.currentGuest && (
                <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500 mb-1">Current Guest</p>
                  <p className="font-semibold text-slate-900">{room.currentGuest}</p>
                  {room.checkOutDate && (
                    <p className="text-xs text-slate-600 mt-1">
                      Check-out: {new Date(room.checkOutDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}

              {/* Last Cleaned */}
              {room.lastCleaned && (
                <div className="mb-4">
                  <p className="text-xs text-slate-500">
                    Last cleaned: {new Date(room.lastCleaned).toLocaleString()}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedRoom(room);
                    setShowEditModal(true);
                  }}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold flex items-center justify-center gap-1"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                {room.status === 'available' && (
                  <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold">
                    Assign
                  </button>
                )}
                {room.status === 'occupied' && (
                  <button className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-semibold">
                    Check Out
                  </button>
                )}
                {room.status === 'maintenance' && (
                  <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold">
                    Mark Fixed
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Bed className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p className="text-lg font-medium text-slate-500">No rooms found</p>
          <p className="text-sm text-slate-400">Try adjusting your filters</p>
        </div>
      )}

      {/* Edit Room Modal (Placeholder) */}
      {showEditModal && selectedRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Edit Room #{selectedRoom.number}</h3>
            <p className="text-slate-600 mb-6">Room editing interface coming soon...</p>
            <button
              onClick={() => setShowEditModal(false)}
              className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomManagement;
