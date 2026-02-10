// ================================================
// CLIENT INITIALIZATION & FALLBACK HANDLER
// ================================================
// Handles Supabase connection with fallback to mock data

import { mockRooms, mockBookings, mockTours, mockConferenceBookings } from './mockData';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  isMocked?: boolean;
}

/**
 * Fetch rooms with fallback to mock data
 */
export async function fetchRooms(): Promise<ApiResponse<any[]>> {
  try {
    const response = await fetch('/api/rooms');
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        data: Array.isArray(data) ? data : mockRooms,
      };
    }
  } catch (error) {
    console.warn('Failed to fetch rooms from API, using mock data:', error);
  }
  
  // Fallback to mock data
  return {
    success: true,
    data: mockRooms,
    isMocked: true,
  };
}

/**
 * Fetch room availability with fallback
 */
export async function fetchAvailability(
  checkIn: string,
  checkOut: string,
  roomType?: string
): Promise<ApiResponse<any[]>> {
  try {
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      ...(roomType && { roomType }),
    });
    
    const response = await fetch(`/api/rooms/availability?${params}`);
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        data: Array.isArray(data) ? data : mockRooms,
      };
    }
  } catch (error) {
    console.warn('Failed to fetch availability, using mock data:', error);
  }

  return {
    success: true,
    data: mockRooms,
    isMocked: true,
  };
}

/**
 * Create a booking
 */
export async function createBooking(bookingData: any): Promise<ApiResponse<any>> {
  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      return {
        success: true,
        data: await response.json(),
      };
    } else {
      const error = await response.json();
      return {
        success: false,
        error: error.error || 'Failed to create booking',
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to create booking',
    };
  }
}

/**
 * Fetch bookings for an email
 */
export async function fetchBookingsByEmail(email: string): Promise<ApiResponse<any[]>> {
  try {
    const response = await fetch(`/api/bookings?email=${encodeURIComponent(email)}`);
    if (response.ok) {
      return {
        success: true,
        data: await response.json(),
      };
    }
  } catch (error) {
    console.warn('Failed to fetch bookings:', error);
  }

  return {
    success: true,
    data: mockBookings,
    isMocked: true,
  };
}

/**
 * Validate discount code
 */
export async function validateDiscount(code: string, amount: number): Promise<ApiResponse<any>> {
  try {
    const response = await fetch('/api/discount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, bookingAmount: amount }),
    });

    if (response.ok) {
      return {
        success: true,
        data: await response.json(),
      };
    } else {
      const error = await response.json();
      return {
        success: false,
        error: error.error || 'Invalid discount code',
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to validate discount',
    };
  }
}

/**
 * Admin login
 */
export async function adminLogin(email: string, password: string): Promise<ApiResponse<any>> {
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      return {
        success: true,
        data: await response.json(),
      };
    } else {
      const error = await response.json();
      return {
        success: false,
        error: error.error || 'Login failed',
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Login failed',
    };
  }
}

/**
 * Fetch admin stats
 */
export async function fetchAdminStats(): Promise<ApiResponse<any>> {
  try {
    const response = await fetch('/api/admin/stats');
    if (response.ok) {
      return {
        success: true,
        data: await response.json(),
      };
    }
  } catch (error) {
    console.warn('Failed to fetch admin stats:', error);
  }

  return {
    success: true,
    data: {
      occupancyRate: '45.5',
      revPAR: '2575.00',
      pendingBookings: 3,
      guestSatisfaction: '4.5',
      totalRooms: 44,
      occupiedRooms: 20,
      totalRevenue: '51500.00',
    },
    isMocked: true,
  };
}

/**
 * Initialize Paystack payment
 */
export async function initPaystackPayment(
  email: string,
  amount: number,
  bookingReference: string
): Promise<ApiResponse<any>> {
  try {
    const response = await fetch('/api/payments/paystack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, amount, bookingReference }),
    });

    if (response.ok) {
      return {
        success: true,
        data: await response.json(),
      };
    } else {
      const error = await response.json();
      return {
        success: false,
        error: error.error || 'Payment initialization failed',
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Payment initialization failed',
    };
  }
}

/**
 * Get mock tours
 */
export function getMockTours() {
  return mockTours;
}

/**
 * Check if connected to real database
 */
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const response = await fetch('/api/rooms');
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Fetch conference bookings with fallback
 */
export async function fetchConferenceBookings(email?: string): Promise<ApiResponse<any[]>> {
  try {
    const params = email ? `?email=${encodeURIComponent(email)}` : '';
    const response = await fetch(`/api/conference${params}`);
    
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        data: Array.isArray(data) ? data : mockConferenceBookings,
      };
    }
  } catch (error) {
    console.warn('Failed to fetch conference bookings, using mock data:', error);
  }

  return {
    success: true,
    data: mockConferenceBookings,
    isMocked: true,
  };
}

/**
 * Create a conference booking
 */
export async function createConferenceBooking(bookingData: any): Promise<ApiResponse<any>> {
  try {
    const response = await fetch('/api/conference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      return {
        success: true,
        data: await response.json(),
      };
    } else {
      const error = await response.json();
      return {
        success: false,
        error: error.error || 'Failed to create conference booking',
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to create conference booking',
    };
  }
}

/**
 * Check conference room availability for a specific date
 */
export async function checkConferenceAvailability(date: string): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`/api/conference?checkAvailability=true&date=${date}`);
    
    if (response.ok) {
      return {
        success: true,
        data: await response.json(),
      };
    }
  } catch (error) {
    console.warn('Failed to check conference availability:', error);
  }

  return {
    success: true,
    data: {
      date,
      isAvailable: true,
      bookedSlots: [],
    },
    isMocked: true,
  };
}
