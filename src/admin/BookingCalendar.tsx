import React, { useState } from 'react';

interface BookingCalendarProps {
  rooms: Array<{ id: string; number: string; status: 'available' | 'occupied' | 'maintenance' }>;
  onDateRangeSelect?: (startDate: string, endDate: string, roomIds: string[]) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ rooms, onDateRangeSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedRooms, setSelectedRooms] = useState<Set<string>>(new Set());

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const currentDate = new Date(selectedDate);
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleRoomToggle = (roomId: string) => {
    setSelectedRooms((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(roomId)) {
        newSet.delete(roomId);
      } else {
        newSet.add(roomId);
      }
      return newSet;
    });
  };

  const statusColors: Record<string, string> = {
    available: 'bg-green-100 border-green-400',
    occupied: 'bg-red-100 border-red-400',
    maintenance: 'bg-yellow-100 border-yellow-400',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-6">📅 Live Booking Calendar</h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-slate-800">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h4>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-amber-500 text-white rounded text-sm">←</button>
                <button className="px-3 py-1 bg-amber-500 text-white rounded text-sm">→</button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-bold text-slate-600 text-xs py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {Array(firstDay)
                .fill(null)
                .map((_, i) => (
                  <div key={`empty-${i}`} className="p-2"></div>
                ))}
              {days.map((day) => {
                const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const isSelected = dateStr === selectedDate;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`
                      p-2 rounded text-sm font-semibold transition-all
                      ${isSelected
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
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

        {/* Room Status Overview */}
        <div className="bg-slate-50 rounded-lg p-4">
          <h4 className="font-bold text-slate-800 mb-4">Room Status</h4>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => handleRoomToggle(room.id)}
                className={`
                  p-3 rounded cursor-pointer border-2 transition-all
                  ${selectedRooms.has(room.id) ? 'border-amber-500 bg-amber-50' : statusColors[room.status]}
                `}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800">Room {room.number}</span>
                  <span className={`
                    text-xs px-2 py-1 rounded
                    ${room.status === 'available' ? 'bg-green-500 text-white' : ''}
                    ${room.status === 'occupied' ? 'bg-red-500 text-white' : ''}
                    ${room.status === 'maintenance' ? 'bg-yellow-500 text-white' : ''}
                  `}>
                    {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {selectedRooms.size > 0 && (
            <button
              onClick={() => onDateRangeSelect?.(selectedDate, selectedDate, Array.from(selectedRooms))}
              className="w-full mt-4 py-2 bg-amber-600 text-white rounded font-bold hover:bg-amber-700"
            >
              View Selected ({selectedRooms.size})
            </button>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-400 rounded"></div>
          <span className="text-slate-700">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-400 rounded"></div>
          <span className="text-slate-700">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded"></div>
          <span className="text-slate-700">Maintenance</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
