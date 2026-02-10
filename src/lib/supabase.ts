import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, supabaseKey);

// Types for Database Schema
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
  payment_method: string;
  status: 'confirmed' | 'cancelled' | 'checked_in' | 'checked_out';
  tour_preference?: 'kintampo' | 'boabeng_fiema' | 'tano_boase' | 'bono_manso' | 'none';
  special_requests?: string;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'receptionist' | 'guest';
  status: 'active' | 'inactive';
  last_login?: string;
  created_at: string;
};

export type AuditLog = {
  id: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  changes: Record<string, any>;
  ip_address: string;
  created_at: string;
};
