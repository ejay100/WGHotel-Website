import { z } from 'zod';

// Booking Validation
export const BookingSchema = z.object({
  guest_name: z.string().min(2, 'Name must be at least 2 characters'),
  guest_email: z.string().email('Invalid email address'),
  guest_phone: z.string().regex(/^[0-9+\-\s()]+$/, 'Invalid phone number'),
  check_in_date: z.string().refine(
    (date) => new Date(date) > new Date(),
    'Check-in date must be in the future'
  ),
  check_out_date: z.string(),
  room_id: z.string().uuid('Invalid room ID'),
  room_type: z.enum(['standard', 'executive', 'presidential', 'chalet']),
  tour_preference: z.enum(['kintampo', 'boabeng_fiema', 'tano_boase', 'bono_manso', 'none']).optional(),
  special_requests: z.string().max(500).optional(),
  payment_method: z.string(),
}).refine(
  (data) => new Date(data.check_out_date) > new Date(data.check_in_date),
  {
    message: 'Check-out date must be after check-in date',
    path: ['check_out_date'],
  }
);

export type BookingInput = z.infer<typeof BookingSchema>;

// Admin Login Validation
export const AdminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;

// Discount Code Validation
export const DiscountCodeSchema = z.object({
  code: z.string().min(3).max(20).toUpperCase(),
  description: z.string().optional(),
  discount_percent: z.number().min(0).max(100),
  discount_amount: z.number().optional(),
  valid_from: z.string(),
  valid_until: z.string(),
  max_uses: z.number().optional(),
  min_booking_amount: z.number().optional(),
});

export type DiscountCodeInput = z.infer<typeof DiscountCodeSchema>;

// Room Update Validation
export const RoomUpdateSchema = z.object({
  status: z.enum(['available', 'occupied', 'maintenance']),
  price_per_night: z.number().positive('Price must be positive'),
});

export type RoomUpdateInput = z.infer<typeof RoomUpdateSchema>;

// Conference Room Booking Validation
export const ConferenceBookingSchema = z.object({
  contact_name: z.string().min(2, 'Contact name must be at least 2 characters'),
  contact_email: z.string().email('Invalid email address'),
  contact_phone: z.string().regex(/^[0-9+\-\s()]+$/, 'Invalid phone number'),
  organization: z.string().min(2, 'Organization name required'),
  event_type: z.string().min(2, 'Event type required'),
  booking_date: z.string().refine(
    (date) => new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0)),
    'Booking date must be today or in the future'
  ),
  start_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  end_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  expected_attendees: z.number().min(1).max(150),
  package_type: z.enum(['hourly', 'half_day', 'full_day', 'multi_day']),
  requires_projector: z.boolean().default(true),
  requires_catering: z.boolean().default(false),
  special_requirements: z.string().max(1000).optional(),
  payment_method: z.string(),
}).refine(
  (data) => {
    const start = new Date(`2000-01-01T${data.start_time}`);
    const end = new Date(`2000-01-01T${data.end_time}`);
    return end > start;
  },
  {
    message: 'End time must be after start time',
    path: ['end_time'],
  }
);

export type ConferenceBookingInput = z.infer<typeof ConferenceBookingSchema>;
