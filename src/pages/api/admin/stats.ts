import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { calculateRevPAR } from '@/lib/helpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get date data for statistics

    // Get occupancy rate
    const { data: rooms, error: roomsError } = await supabase
      .from('rooms')
      .select('status');

    if (roomsError) {
      console.error('Database error:', roomsError);
      return res.status(500).json({ error: 'Failed to fetch stats' });
    }

    const occupiedRooms = rooms?.filter((r: any) => r.status === 'occupied').length || 0;
    const totalRooms = rooms?.length || 1;
    const occupancyRate = (occupiedRooms / totalRooms) * 100;

    // Get pending bookings
    const { data: pendingBookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('id')
      .eq('payment_status', 'pending')
      .eq('status', 'confirmed');

    if (bookingsError) {
      console.error('Database error:', bookingsError);
      return res.status(500).json({ error: 'Failed to fetch bookings' });
    }

    // Get revenue data
    const { data: revenue, error: revenueError } = await supabase
      .from('bookings')
      .select('total_amount')
      .eq('payment_status', 'completed');

    if (revenueError) {
      console.error('Database error:', revenueError);
      return res.status(500).json({ error: 'Failed to fetch revenue' });
    }

    const totalRevenue = revenue?.reduce((sum: number, b: any) => sum + (b.total_amount || 0), 0) || 0;
    const revPAR = calculateRevPAR(totalRevenue, totalRooms);

    // Get guest satisfaction (average rating)
    const { data: reviews, error: reviewsError } = await supabase
      .from('guest_reviews')
      .select('rating');

    if (reviewsError) {
      console.error('Database error:', reviewsError);
      return res.status(500).json({ error: 'Failed to fetch reviews' });
    }

    const avgRating = reviews && reviews.length > 0
      ? (reviews.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : 0;

    return res.status(200).json({
      occupancyRate: occupancyRate.toFixed(1),
      revPAR: revPAR.toFixed(2),
      pendingBookings: pendingBookings?.length || 0,
      guestSatisfaction: avgRating,
      totalRooms,
      occupiedRooms,
      totalRevenue: totalRevenue.toFixed(2),
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
