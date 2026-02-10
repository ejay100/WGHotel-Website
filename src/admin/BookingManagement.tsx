import React, { useState } from 'react';
import { Search, Filter, Download, Eye, CheckCircle, XCircle, Clock, Calendar, User, Phone, Mail, CreditCard, RefreshCw } from 'lucide-react';

interface Booking {
  id: string;
  bookingRef: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomNumber: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'checked-in' | 'checked-out';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  paymentMethod: string;
  bookedDate: string;
  specialRequests?: string;
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    bookingRef: 'WGH-2026-001',
    guestName: 'Kwame Mensah',
    guestEmail: 'kwame.mensah@email.com',
    guestPhone: '+233 24 123 4567',
    roomNumber: '201',
    roomType: 'Deluxe Suite',
    checkIn: '2026-02-05',
    checkOut: '2026-02-08',
    nights: 3,
    totalAmount: 2850,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'Mobile Money',
    bookedDate: '2026-01-28',
    specialRequests: 'Late check-in required',
  },
  {
    id: '2',
    bookingRef: 'WGH-2026-002',
    guestName: 'Ama Osei',
    guestEmail: 'ama.osei@email.com',
    guestPhone: '+233 20 987 6543',
    roomNumber: '304',
    roomType: 'Executive Room',
    checkIn: '2026-02-04',
    checkOut: '2026-02-06',
    nights: 2,
    totalAmount: 1600,
    status: 'checked-in',
    paymentStatus: 'paid',
    paymentMethod: 'Card',
    bookedDate: '2026-01-25',
  },
  {
    id: '3',
    bookingRef: 'WGH-2026-003',
    guestName: 'John Akuffo',
    guestEmail: 'j.akuffo@email.com',
    guestPhone: '+233 55 222 3333',
    roomNumber: '105',
    roomType: 'Standard Room',
    checkIn: '2026-02-10',
    checkOut: '2026-02-12',
    nights: 2,
    totalAmount: 1200,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'Mobile Money',
    bookedDate: '2026-02-02',
    specialRequests: 'Ground floor preferred',
  },
];

const BookingManagement: React.FC = () => {
  const [bookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomNumber.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
      pending: 'bg-amber-100 text-amber-800 border-amber-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300',
      'checked-in': 'bg-green-100 text-green-800 border-green-300',
      'checked-out': 'bg-slate-100 text-slate-800 border-slate-300',
    };
    return colors[status as keyof typeof colors] || 'bg-slate-100 text-slate-800';
  };

  const getPaymentStatusColor = (status: string) => {
    const colors = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-amber-100 text-amber-800',
      refunded: 'bg-slate-100 text-slate-800',
    };
    return colors[status as keyof typeof colors] || 'bg-slate-100 text-slate-800';
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
      label: 'Checked In',
      value: bookings.filter((b) => b.status === 'checked-in').length,
      icon: User,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
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
              placeholder="Search by guest name, booking ref, or room..."
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
              <option value="checked-in">Checked In</option>
              <option value="checked-out">Checked Out</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <button className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <span className="hidden md:inline">More Filters</span>
            </button>

            <button className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2">
              <Download className="w-5 h-5" />
              <span className="hidden md:inline">Export</span>
            </button>

            <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Booking Ref
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-900">{booking.bookingRef}</div>
                    <div className="text-xs text-slate-500">
                      Booked: {new Date(booking.bookedDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{booking.guestName}</div>
                    <div className="text-sm text-slate-500">{booking.guestEmail}</div>
                    <div className="text-xs text-slate-500">{booking.guestPhone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">#{booking.roomNumber}</div>
                    <div className="text-sm text-slate-500">{booking.roomType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-slate-500">{booking.nights} nights</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-slate-900">GHS {booking.totalAmount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                        booking.paymentStatus
                      )}`}
                    >
                      {booking.paymentStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowDetailsModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium">No bookings found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-slate-900">Booking Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <XCircle className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Booking Reference */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Booking Reference</p>
                    <p className="text-2xl font-bold text-blue-900">{selectedBooking.bookingRef}</p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(
                      selectedBooking.status
                    )}`}
                  >
                    {selectedBooking.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Guest Information */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Guest Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Name</p>
                    <p className="font-semibold text-slate-900">{selectedBooking.guestName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <Mail className="w-4 h-4" /> Email
                    </p>
                    <p className="font-semibold text-slate-900">{selectedBooking.guestEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <Phone className="w-4 h-4" /> Phone
                    </p>
                    <p className="font-semibold text-slate-900">{selectedBooking.guestPhone}</p>
                  </div>
                </div>
              </div>

              {/* Stay Details */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Stay Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Room</p>
                    <p className="font-semibold text-slate-900">#{selectedBooking.roomNumber} - {selectedBooking.roomType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Duration</p>
                    <p className="font-semibold text-slate-900">{selectedBooking.nights} Nights</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Check-In</p>
                    <p className="font-semibold text-slate-900">
                      {new Date(selectedBooking.checkIn).toLocaleDateString('en-GB', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Check-Out</p>
                    <p className="font-semibold text-slate-900">
                      {new Date(selectedBooking.checkOut).toLocaleDateString('en-GB', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Total Amount</p>
                    <p className="text-2xl font-bold text-green-600">
                      GHS {selectedBooking.totalAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Payment Method</p>
                    <p className="font-semibold text-slate-900">{selectedBooking.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Payment Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getPaymentStatusColor(
                        selectedBooking.paymentStatus
                      )}`}
                    >
                      {selectedBooking.paymentStatus.toUpperCase()}
                    </span>
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

              {/* Action Buttons */}
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
                    Check In Guest
                  </button>
                )}
                {selectedBooking.status === 'checked-in' && (
                  <button className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold">
                    Check Out Guest
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

export default BookingManagement;
