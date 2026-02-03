import { neon } from '@neondatabase/serverless';

// Load environment variables if running outside Next.js
if (typeof window === 'undefined' && !process.env.DATABASE_URL) {
  try {
    require('dotenv').config({ path: '.env.local' });
  } catch (e) {
    // dotenv might not be available, ignore
  }
}

// Direct database connection using DATABASE_URL
const databaseUrl = process.env.DATABASE_URL || '';

export const sql = neon(databaseUrl);

// Helper function to check if database is configured
export const isDatabaseConfigured = () => {
  return databaseUrl && databaseUrl !== '' && !databaseUrl.includes('your-project');
};

// Database query helpers
export async function queryRooms() {
  if (!isDatabaseConfigured()) {
    return null;
  }
  
  try {
    const rooms = await sql`
      SELECT * FROM rooms 
      ORDER BY room_number
    `;
    return rooms;
  } catch (error) {
    console.error('Database query error:', error);
    return null;
  }
}

export async function queryBookings(filters?: { guest_email?: string; room_id?: string }) {
  if (!isDatabaseConfigured()) {
    return null;
  }
  
  try {
    if (filters?.guest_email) {
      return await sql`
        SELECT * FROM bookings 
        WHERE guest_email = ${filters.guest_email}
        ORDER BY created_at DESC
      `;
    }
    if (filters?.room_id) {
      return await sql`
        SELECT * FROM bookings 
        WHERE room_id = ${filters.room_id}
        ORDER BY check_in_date DESC
      `;
    }
    return await sql`
      SELECT * FROM bookings 
      ORDER BY created_at DESC
    `;
  } catch (error) {
    console.error('Database query error:', error);
    return null;
  }
}

export async function createBooking(booking: any) {
  if (!isDatabaseConfigured()) {
    throw new Error('Database not configured');
  }
  
  try {
    const result = await sql`
      INSERT INTO bookings (
        room_id, guest_name, guest_email, guest_phone,
        check_in_date, check_out_date, total_nights,
        base_price, tour_addon_price, discount_amount, total_amount,
        payment_status, payment_method, status,
        tour_preference, special_requests, booking_reference
      ) VALUES (
        ${booking.room_id}, ${booking.guest_name}, ${booking.guest_email}, ${booking.guest_phone},
        ${booking.check_in_date}, ${booking.check_out_date}, ${booking.total_nights},
        ${booking.base_price}, ${booking.tour_addon_price || 0}, ${booking.discount_amount || 0}, ${booking.total_amount},
        ${booking.payment_status || 'pending'}, ${booking.payment_method || null}, ${booking.status || 'confirmed'},
        ${booking.tour_preference || null}, ${booking.special_requests || null}, ${booking.booking_reference}
      )
      RETURNING *
    `;
    return result[0];
  } catch (error) {
    console.error('Database insert error:', error);
    throw error;
  }
}

// Types for Database Schema (kept for compatibility)
export type Room = {
  id: string;
  room_number: string;
  room_type: 'standard' | 'executive' | 'presidential' | 'chalet';
  capacity: number;
  price_per_night: number;
  building: 'main' | 'chalet';
  status: 'available' | 'occupied' | 'maintenance';
  amenities: string[];
  created_at: string;
};

export type Booking = {
  id: string;
  room_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in_date: string;
  check_out_date: string;
  total_nights: number;
  base_price: number;
  tour_addon_price: number;
  discount_amount: number;
  total_amount: number;
  payment_status: 'pending' | 'completed' | 'refunded';
  payment_method?: string;
  status: 'confirmed' | 'cancelled' | 'checked_in' | 'checked_out';
  tour_preference?: string;
  special_requests?: string;
  booking_reference: string;
  created_at: string;
};

// Legacy Supabase export for backward compatibility
import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, supabaseKey);
