import React, { useState } from 'react';
import { Calendar, Users, Clock, Video, Utensils, DollarSign, Search, Eye, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface ConferenceBooking {
  id: string;
  bookingRef: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  attendees: number;
  roomSetup: 'theater' | 'classroom' | 'boardroom' | 'u-shape' | 'banquet';
  catering: boolean;
  equipment: string[];
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  paymentStatus: 'paid' | 'partial' | 'pending';
  specialRequests?: string;
  bookedDate: string;
}

const MOCK_CONFERENCE_BOOKINGS: ConferenceBooking[] = [
  {
    id: '1',
    bookingRef: 'CONF-2026-001',
    clientName: 'Ghana Tech Hub',
    clientEmail: 'events@ghanatechhub.com',
    clientPhone: '+233 30 123 4567',
    eventType: 'Tech Conference',
    date: '2026-02-15',
    startTime: '09:00',
    endTime: '17:00',
    duration: 8,
    attendees: 150,
    roomSetup: 'theater',
    catering: true,
    equipment: ['projector', 'microphone', 'speakers', 'wifi'],
    totalAmount: 15000,
    status: 'confirmed',
    paymentStatus: 'paid',
    specialRequests: 'Need high-speed internet for live streaming',
    bookedDate: '2026-01-20',
  },
  {
    id: '2',
    bookingRef: 'CONF-2026-002',
    clientName: 'Accra Business Association',
    clientEmail: 'admin@accrabusiness.org',
    clientPhone: '+233 24 555 6789',
    eventType: 'Board Meeting',
    date: '2026-02-08',
    startTime: '14:00',
    endTime: '18:00',
    duration: 4,
    attendees: 25,
    roomSetup: 'boardroom',
    catering: true,
    equipment: ['projector', 'whiteboard', 'video-conference'],
    totalAmount: 6500,
    status: 'confirmed',
    paymentStatus: 'paid',
    bookedDate: '2026-01-28',
  },
  {
    id: '3',
    bookingRef: 'CONF-2026-003',
    clientName: 'Medical Summit Ghana',
    clientEmail: 'contact@medsummit.gh',
    clientPhone: '+233 20 777 8888',
    eventType: 'Medical Conference',
    date: '2026-02-20',
    startTime: '08:00',
    endTime: '16:00',
    duration: 8,
    attendees: 200,
    roomSetup: 'classroom',
    catering: true,
    equipment: ['projector', 'microphone', 'speakers', 'wifi', 'stage'],
    totalAmount: 22000,
    status: 'pending',
    paymentStatus: 'partial',
    specialRequests: 'Breakout rooms needed for workshops',
    bookedDate: '2026-02-01',
  },
];

const ConferenceManagement: React.FC = () => {
  const [bookings] = useState<ConferenceBooking[]>(MOCK_CONFERENCE_BOOKINGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<ConferenceBooking | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.eventType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-800 border-green-300',
      pending: 'bg-amber-100 text-amber-800 border-amber-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300',
      completed: 'bg-blue-100 text-blue-800 border-blue-300',
    };
    return colors[status as keyof typeof colors] || 'bg-slate-100 text-slate-800';
  };

  const getPaymentStatusColor = (status: string) => {
    const colors = {
      paid: 'bg-green-100 text-green-800',
      partial: 'bg-amber-100 text-amber-800',
      pending: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-slate-100 text-slate-800';
  };

  const getRoomSetupLabel = (setup: string) => {
    const labels = {
      theater: 'Theater Style',
      classroom: 'Classroom Style',
      boardroom: 'Boardroom',
      'u-shape': 'U-Shape',
      banquet: 'Banquet',
    };
    return labels[setup as keyof typeof labels] || setup;
  };

  const stats = [
    {
      label: 'Total Bookings',
      value: bookings.length,
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Confirmed',
      value: bookings.filter((b) => b.status === 'confirmed').length,
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Pending',
      value: bookings.filter((b) => b.status === 'pending').length,
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Total Revenue',
      value: `GHS ${bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${stat.bg} rounded-xl p-5 border border-slate-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
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
              placeholder="Search client, booking ref, or event..."
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
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-xl shadow-sm border-2 border-slate-200 hover:shadow-lg transition overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold">{booking.eventType}</h3>
                  <p className="text-sm opacity-90">{booking.bookingRef}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border bg-white ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              {/* Client Info */}
              <div>
                <p className="text-sm text-slate-500 mb-1">Client</p>
                <p className="font-bold text-slate-900">{booking.clientName}</p>
                <p className="text-sm text-slate-600">{booking.clientEmail}</p>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1 flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Date
                  </p>
                  <p className="font-semibold text-slate-900">
                    {new Date(booking.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> Time
                  </p>
                  <p className="font-semibold text-slate-900">
                    {booking.startTime} - {booking.endTime}
                  </p>
                  <p className="text-xs text-slate-500">{booking.duration} hours</p>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1 flex items-center gap-1">
                    <Users className="w-4 h-4" /> Attendees
                  </p>
                  <p className="font-semibold text-slate-900">{booking.attendees} people</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Room Setup</p>
                  <p className="font-semibold text-slate-900">{getRoomSetupLabel(booking.roomSetup)}</p>
                </div>
              </div>

              {/* Services */}
              <div className="flex gap-2 flex-wrap">
                {booking.catering && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Utensils className="w-3 h-3" />
                    Catering
                  </span>
                )}
                {booking.equipment.includes('projector') && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    Projector
                  </span>
                )}
                {booking.equipment.includes('wifi') && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                    WiFi
                  </span>
                )}
              </div>

              {/* Payment */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                <div>
                  <p className="text-sm text-slate-500">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600">
                    GHS {booking.totalAmount.toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                    booking.paymentStatus
                  )}`}
                >
                  {booking.paymentStatus.toUpperCase()}
                </span>
              </div>

              {/* Actions */}
              <button
                onClick={() => {
                  setSelectedBooking(booking);
                  setShowDetailsModal(true);
                }}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" />
                View Full Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p className="text-lg font-medium text-slate-500">No conference bookings found</p>
          <p className="text-sm text-slate-400">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{selectedBooking.eventType}</h3>
                  <p className="text-sm opacity-90">{selectedBooking.bookingRef}</p>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Client Information */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">Client Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Name</p>
                    <p className="font-semibold text-slate-900">{selectedBooking.clientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-semibold text-slate-900">{selectedBooking.clientEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-semibold text-slate-900">{selectedBooking.clientPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                        selectedBooking.status
                      )}`}
                    >
                      {selectedBooking.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">Event Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Date</p>
                    <p className="font-semibold text-slate-900">
                      {new Date(selectedBooking.date).toLocaleDateString('en-GB', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Time</p>
                    <p className="font-semibold text-slate-900">
                      {selectedBooking.startTime} - {selectedBooking.endTime} ({selectedBooking.duration} hours)
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Expected Attendees</p>
                    <p className="font-semibold text-slate-900">{selectedBooking.attendees} people</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Room Setup</p>
                    <p className="font-semibold text-slate-900">{getRoomSetupLabel(selectedBooking.roomSetup)}</p>
                  </div>
                </div>
              </div>

              {/* Services & Equipment */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">Services & Equipment</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-500 mb-2">Catering</p>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        selectedBooking.catering ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {selectedBooking.catering ? '✓ Included' : '✗ Not Included'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-2">Equipment</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedBooking.equipment.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {selectedBooking.specialRequests && (
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-3">Special Requests</h4>
                  <p className="text-slate-700 bg-slate-50 p-4 rounded-lg">{selectedBooking.specialRequests}</p>
                </div>
              )}

              {/* Payment Information */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">Payment Information</h4>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-green-600 mb-1">Total Amount</p>
                      <p className="text-3xl font-bold text-green-700">
                        GHS {selectedBooking.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold ${getPaymentStatusColor(
                        selectedBooking.paymentStatus
                      )}`}
                    >
                      {selectedBooking.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                {selectedBooking.status === 'pending' && (
                  <>
                    <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                      Confirm Booking
                    </button>
                    <button className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">
                      Cancel Booking
                    </button>
                  </>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                    Send Confirmation Email
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConferenceManagement;
