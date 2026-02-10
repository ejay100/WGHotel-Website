import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { checkIn, checkOut, roomType } = req.query;

  if (!checkIn || !checkOut) {
    return res.status(400).json({ error: 'Missing check-in or check-out date' });
  }

  try {
    // Get rooms that are available and not booked during the date range
    let query = supabase
      .from('rooms')
      .select('*, bookings!inner(id)', { count: 'exact' })
      .eq('status', 'available');

    if (roomType) {
      query = query.eq('room_type', roomType);
    }

    // Check for conflicting bookings
    const { data: rooms, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to fetch availability' });
    }

    // Filter rooms based on booking conflicts
    const availableRooms = rooms?.filter(room => {
      const bookings = room.bookings || [];
      return !bookings.some((booking: any) => {
        const bookingCheckIn = new Date(booking.check_in_date);
        const bookingCheckOut = new Date(booking.check_out_date);
        const requestCheckIn = new Date(checkIn as string);
        const requestCheckOut = new Date(checkOut as string);
        
        return requestCheckIn < bookingCheckOut && requestCheckOut > bookingCheckIn;
      });
    }) || [];

    return res.status(200).json(availableRooms);
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
