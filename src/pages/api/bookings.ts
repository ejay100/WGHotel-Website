import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { BookingSchema } from '@/lib/validators';
import { generateBookingReference } from '@/lib/helpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { email } = req.query;
      
      let query = supabase
        .from('bookings')
        .select('*, rooms(*)')
        .order('created_at', { ascending: false });

      if (email) {
        query = query.eq('guest_email', email);
      }

      const { data: bookings, error } = await query;

      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Failed to fetch bookings' });
      }

      return res.status(200).json(bookings || []);
    } catch (error) {
      console.error('API error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      // Validate booking data
      const validatedData = BookingSchema.parse(req.body);

      // Generate booking reference
      const bookingReference = generateBookingReference();

      // Create booking
      const { data: booking, error } = await supabase
        .from('bookings')
        .insert([
          {
            room_id: validatedData.room_id,
            guest_name: validatedData.guest_name,
            guest_email: validatedData.guest_email,
            guest_phone: validatedData.guest_phone,
            check_in_date: validatedData.check_in_date,
            check_out_date: validatedData.check_out_date,
            total_nights: 0, // Will be calculated from dates
            base_price: 0, // Will come from room
            tour_addon_price: 0,
            discount_amount: 0,
            total_amount: 0,
            payment_status: 'pending',
            status: 'confirmed',
            tour_preference: validatedData.tour_preference,
            special_requests: validatedData.special_requests,
            booking_reference: bookingReference,
            payment_method: validatedData.payment_method,
          },
        ])
        .select('*')
        .single();

      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Failed to create booking' });
      }

      return res.status(201).json({
        success: true,
        booking,
        bookingReference,
      });
    } catch (error: any) {
      console.error('API error:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: 'Invalid booking data', details: error.errors });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
