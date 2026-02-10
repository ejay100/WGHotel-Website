import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Home, Users, Wrench, CheckCircle } from 'lucide-react';

interface Room {
  id: string;
  number: string;
  status: 'available' | 'occupied' | 'maintenance';
  floor?: number;
}

interface BookingCalendarProps {
  rooms: Array<Room>;
  onDateRangeSelect?: (startDate: string, endDate: string, roomIds: string[]) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ rooms, onDateRangeSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedRooms, setSelectedRooms] = useState<Set<string>>(new Set());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'grid' | 'floor'>('grid');

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Group rooms by floor
  const roomsByFloor = useMemo(() => {
    const grouped: Record<number, Room[]> = {};
    rooms.forEach(room => {
      const floor = room.floor || Math.floor(parseInt(room.number) / 100) || 1;
      if (!grouped[floor]) grouped[floor] = [];
      grouped[floor].push(room);
    });
    return grouped;
  }, [rooms]);

  const handleRoomToggle = (roomId: string) => {
    setSelectedRooms((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(roomId)) newSet.delete(roomId);
      else newSet.add(roomId);
      return newSet;
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1));
      return newDate;
    });
  };

  const statusConfig = {
    available: { bg: 'bg-emerald-500', light: 'bg-emerald-50', border: 'border-emerald-400', text: 'text-emerald-700', icon: CheckCircle },
    occupied: { bg: 'bg-rose-500', light: 'bg-rose-50', border: 'border-rose-400', text: 'text-rose-700', icon: Users },
    maintenance: { bg: 'bg-amber-500', light: 'bg-amber-50', border: 'border-amber-400', text: 'text-amber-700', icon: Wrench },
  };

  const roomStats = {
    available: rooms.filter((r) => r.status === 'available').length,
    occupied: rooms.filter((r) => r.status === 'occupied').length,
    maintenance: rooms.filter((r) => r.status === 'maintenance').length,
  };

  return (
    <div className="space-y-6">
      {/* Calendar Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <CalendarIcon className="w-7 h-7" />
                Live Booking Calendar
              </h3>
              <p className="text-sm opacity-90 mt-1">Manage room availability and bookings</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{selectedRooms.size}</p>
              <p className="text-xs opacity-90">Rooms Selected</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            {/* Month Navigation */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-white rounded-lg transition border border-slate-300"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              <h4 className="text-xl font-bold text-slate-900">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h4>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-white rounded-lg transition border border-slate-300"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-3 mb-3">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-bold text-slate-600 text-sm py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-3">
              {Array(firstDay)
                .fill(null)
                .map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square"></div>
                ))}
              {days.map((day) => {
                const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const isSelected = dateStr === selectedDate;
                const isToday = dateStr === new Date().toISOString().split('T')[0];
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`
                      aspect-square rounded-lg font-semibold text-sm transition-all border-2
                      ${isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-110'
                        : isToday
                        ? 'bg-amber-100 text-amber-900 border-amber-400'
                        : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                      }
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Room Status Board */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header with Stats */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Home className="w-7 h-7" />
              <div>
                <h4 className="text-xl font-bold">Room Status Board</h4>
                <p className="text-slate-400 text-sm">Real-time availability overview</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${viewMode === 'grid' ? 'bg-white text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('floor')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${viewMode === 'floor' ? 'bg-white text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
              >
                By Floor
              </button>
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(roomStats).map(([status, count]) => {
              const config = statusConfig[status as keyof typeof statusConfig];
              const Icon = config.icon;
              return (
                <div key={status} className="bg-slate-700/50 rounded-xl p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 ${config.bg} rounded-full flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{count}</p>
                    <p className="text-slate-400 text-sm capitalize">{status}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Legend */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
            <div className="flex gap-6">
              {Object.entries(statusConfig).map(([status, config]) => (
                <div key={status} className="flex items-center gap-2">
                  <div className={`w-4 h-4 ${config.bg} rounded`}></div>
                  <span className="text-sm text-slate-600 capitalize">{status}</span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded ring-2 ring-blue-300"></div>
                <span className="text-sm text-slate-600">Selected</span>
              </div>
            </div>
            <p className="text-sm text-slate-500">
              {selectedRooms.size > 0 ? `${selectedRooms.size} selected` : 'Click rooms to select'}
            </p>
          </div>

          {viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-11 gap-2">
              {rooms.map((room) => {
                const config = statusConfig[room.status];
                const isSelected = selectedRooms.has(room.id);
                return (
                  <button
                    key={room.id}
                    onClick={() => handleRoomToggle(room.id)}
                    className={`
                      aspect-square rounded-lg text-sm font-bold transition-all relative
                      ${isSelected 
                        ? 'bg-blue-600 text-white ring-4 ring-blue-300 scale-110 z-10' 
                        : `${config.light} ${config.text} ${config.border} border-2 hover:scale-105`
                      }
                    `}
                  >
                    {room.number}
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow">
                        <CheckCircle className="w-3 h-3 text-blue-600" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            /* Floor View */
            <div className="space-y-6">
              {Object.entries(roomsByFloor).sort(([a], [b]) => Number(a) - Number(b)).map(([floor, floorRooms]) => (
                <div key={floor} className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-bold text-slate-800">Floor {floor}</h5>
                    <div className="flex gap-4 text-xs">
                      <span className="text-emerald-600">{floorRooms.filter(r => r.status === 'available').length} avail</span>
                      <span className="text-rose-600">{floorRooms.filter(r => r.status === 'occupied').length} occ</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                    {floorRooms.map((room) => {
                      const config = statusConfig[room.status];
                      const isSelected = selectedRooms.has(room.id);
                      return (
                        <button
                          key={room.id}
                          onClick={() => handleRoomToggle(room.id)}
                          className={`
                            aspect-square rounded-lg text-sm font-bold transition-all
                            ${isSelected 
                              ? 'bg-blue-600 text-white ring-2 ring-blue-300' 
                              : `${config.light} ${config.text} ${config.border} border hover:scale-105`
                            }
                          `}
                        >
                          {room.number.slice(-2)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action Bar */}
          {selectedRooms.size > 0 && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-blue-900">{selectedRooms.size} room{selectedRooms.size > 1 ? 's' : ''} selected</p>
                <p className="text-sm text-blue-700">{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedRooms(new Set())}
                  className="px-5 py-2.5 bg-white text-slate-700 rounded-lg hover:bg-slate-100 transition font-medium border border-slate-300"
                >
                  Clear
                </button>
                <button
                  onClick={() => onDateRangeSelect?.(selectedDate, selectedDate, Array.from(selectedRooms))}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Create Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
