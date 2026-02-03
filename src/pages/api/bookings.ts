import { NextApiRequest, NextApiResponse } from 'next';
import { sql, createBooking, queryBookings, isDatabaseConfigured } from '@/lib/db';
import { BookingSchema } from '@/lib/validators';
import { generateBookingReference } from '@/lib/helpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      if (!isDatabaseConfigured()) {
        return res.status(200).json([]);
      }

      const { email } = req.query;
      
      const bookings = await queryBookings(email ? { guest_email: email as string } : undefined);

      return res.status(200).json(bookings || []);
    } catch (error) {
      console.error('API error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      if (!isDatabaseConfigured()) {
        return res.status(500).json({ error: 'Database not configured' });
      }

      // Validate booking data
      const validatedData = BookingSchema.parse(req.body);

      // Generate booking reference
      const bookingReference = generateBookingReference();

      // Create booking
      const booking = await createBooking({
        room_id: validatedData.room_id,
        guest_name: validatedData.guest_name,
        guest_email: validatedData.guest_email,
        guest_phone: validatedData.guest_phone,
        check_in_date: validatedData.check_in_date,
        check_out_date: validatedData.check_out_date,
        total_nights: validatedData.total_nights || 0,
        base_price: validatedData.base_price || 0,
        tour_addon_price: validatedData.tour_addon_price || 0,
        discount_amount: validatedData.discount_amount || 0,
        total_amount: validatedData.total_amount || 0,
        payment_status: 'pending',
        status: 'confirmed',
        tour_preference: validatedData.tour_preference,
        special_requests: validatedData.special_requests,
        booking_reference: bookingReference,
        payment_method: validatedData.payment_method,
      });

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
