// ================================================
// ADMIN DASHBOARD PAGE - Post Signup/Login
// ================================================

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import DashboardStats from '@/admin/DashboardStats';
import BookingCalendar from '@/admin/BookingCalendar';
import AccessCodeGenerator from '@/admin/AccessCodeGenerator';
import { 
  CurrencyCode, 
  CURRENCIES, 
  getExchangeRates, 
  saveExchangeRates,
  fetchLiveRates,
  ExchangeRates 
} from '@/lib/currency';

interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'rooms' | 'conference' | 'settings'>('overview');
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [pendingRates, setPendingRates] = useState<Record<CurrencyCode, number> | null>(null);

  useEffect(() => {
    // Check authentication
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      const userStr = localStorage.getItem('admin_user');
      
      if (!token) {
        router.push('/admin');
        return;
      }
      
      if (userStr) {
        setUser(JSON.parse(userStr));
      }
      
      setRates(getExchangeRates());
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    }
    router.push('/admin');
  };

  const handleFetchLiveRates = async () => {
    const liveRates = await fetchLiveRates();
    setPendingRates(liveRates);
  };

  const handleApproveRates = () => {
    if (pendingRates && user) {
      const newRates = saveExchangeRates(pendingRates, user.fullName);
      setRates(newRates);
      setPendingRates(null);
      setShowCurrencyModal(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-mountain-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - Winners Gold Hotel Admin</title>
      </Head>

      <div className="min-h-screen bg-mountain-100">
        {/* Admin Header */}
        <header className="bg-mountain-900 text-white sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sunrise-400 to-sunrise-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🏔️</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="font-bold leading-tight">Winners Gold</h1>
                  <p className="text-xs text-mountain-400">Admin Dashboard</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="font-medium text-sm">{user.fullName}</p>
                <p className="text-xs text-mountain-400 capitalize">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="bg-white border-b border-mountain-200 sticky top-14 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto">
              {[
                { key: 'overview', label: 'Overview', icon: '📊' },
                { key: 'bookings', label: 'Bookings', icon: '📅' },
                { key: 'rooms', label: 'Rooms', icon: '🛏️' },
                { key: 'conference', label: 'Conference', icon: '🎤' },
                { key: 'settings', label: 'Settings', icon: '⚙️' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                    activeTab === tab.key
                      ? 'border-forest-600 text-forest-600'
                      : 'border-transparent text-mountain-500 hover:text-mountain-900'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-mountain-900">Dashboard Overview</h2>
                <p className="text-mountain-500">
                  {new Date().toLocaleDateString('en-GB', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <DashboardStats 
                occupiedRooms={12}
                totalRooms={44}
                totalRevenue={58500}
                pendingBookings={5}
                guestSatisfaction={4.7}
              />
              <BookingCalendar 
                rooms={Array.from({ length: 44 }, (_, i) => ({
                  id: `room-${i + 1}`,
                  number: String(i + 1).padStart(3, '0'),
                  status: (i % 3 === 0 ? 'occupied' : i % 5 === 0 ? 'maintenance' : 'available') as 'available' | 'occupied' | 'maintenance',
                }))}
                onDateRangeSelect={(start, end, roomIds) => {
                  console.log('Date range selected:', { start, end, roomIds });
                }}
              />
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h2 className="text-2xl font-bold text-mountain-900 mb-6">Booking Management</h2>
              <div className="bg-white rounded-xl shadow-soft p-8 text-center text-mountain-500">
                <span className="text-6xl mb-4 block">📅</span>
                <p>Booking management interface coming soon</p>
              </div>
            </div>
          )}

          {activeTab === 'rooms' && (
            <div>
              <h2 className="text-2xl font-bold text-mountain-900 mb-6">Room Management</h2>
              <div className="bg-white rounded-xl shadow-soft p-8 text-center text-mountain-500">
                <span className="text-6xl mb-4 block">🛏️</span>
                <p>Room management interface coming soon</p>
              </div>
            </div>
          )}

          {activeTab === 'conference' && (
            <div>
              <h2 className="text-2xl font-bold text-mountain-900 mb-6">Conference Bookings</h2>
              <div className="bg-white rounded-xl shadow-soft p-8 text-center text-mountain-500">
                <span className="text-6xl mb-4 block">🎤</span>
                <p>Conference booking management coming soon</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-mountain-900">Settings</h2>
              
              {/* Currency Exchange Rates */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-mountain-900">Currency Exchange Rates</h3>
                    <p className="text-mountain-500 text-sm">Manage conversion rates for guest display</p>
                  </div>
                  <button
                    onClick={() => setShowCurrencyModal(true)}
                    className="px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition"
                  >
                    Update Rates
                  </button>
                </div>

                {rates && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(CURRENCIES).map(([code, info]) => (
                      <div key={code} className="bg-mountain-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span>{info.flag}</span>
                          <span className="font-medium">{info.code}</span>
                        </div>
                        <p className="text-2xl font-bold text-mountain-900">
                          {rates.rates[code as CurrencyCode]?.toFixed(4) || '1.0000'}
                        </p>
                        <p className="text-xs text-mountain-500">per GHS</p>
                      </div>
                    ))}
                  </div>
                )}

                {rates && (
                  <p className="text-xs text-mountain-400 mt-4">
                    Last updated: {new Date(rates.lastUpdated).toLocaleString()}
                    {rates.approvedBy && ` • Approved by: ${rates.approvedBy}`}
                  </p>
                )}
              </div>

              {/* Access Code Generator - Managers Only */}
              {user.role === 'manager' && (
                <AccessCodeGenerator 
                  managerEmail={user.email}
                  managerName={user.fullName}
                />
              )}
            </div>
          )}
        </main>

        {/* Currency Rate Modal */}
        {showCurrencyModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
              <h3 className="text-xl font-bold text-mountain-900 mb-4">Update Exchange Rates</h3>
              
              <div className="space-y-4 mb-6">
                {!pendingRates ? (
                  <div className="text-center py-8">
                    <p className="text-mountain-500 mb-4">Fetch live exchange rates from market data</p>
                    <button
                      onClick={handleFetchLiveRates}
                      className="px-6 py-3 bg-mist-600 text-white rounded-lg hover:bg-mist-700 transition"
                    >
                      Fetch Live Rates
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-mountain-500 mb-4">Review and approve new rates:</p>
                    <div className="space-y-2">
                      {Object.entries(pendingRates).map(([code, rate]) => (
                        <div key={code} className="flex justify-between items-center bg-mountain-50 p-3 rounded-lg">
                          <span className="font-medium">{CURRENCIES[code as CurrencyCode].name}</span>
                          <span className="font-mono">{rate.toFixed(4)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setPendingRates(null)}
                        className="flex-1 px-4 py-2 border border-mountain-300 text-mountain-700 rounded-lg hover:bg-mountain-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleApproveRates}
                        className="flex-1 px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition"
                      >
                        Approve & Save
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setShowCurrencyModal(false);
                  setPendingRates(null);
                }}
                className="w-full text-mountain-500 hover:text-mountain-700 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
