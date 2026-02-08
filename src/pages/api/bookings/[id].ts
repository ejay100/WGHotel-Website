import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing booking ID' });
  }

  if (req.method === 'GET') {
    try {
      const { data: booking, error } = await supabase
        .from('bookings')
        .select('*, rooms(*)')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Database error:', error);
        return res.status(404).json({ error: 'Booking not found' });
      }

      return res.status(200).json(booking);
    } catch (error) {
      console.error('API error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { status, payment_status } = req.body;

      const updates: any = {};
      if (status) updates.status = status;
      if (payment_status) updates.payment_status = payment_status;

      const { data: booking, error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Failed to update booking' });
      }

      return res.status(200).json(booking);
    } catch (error) {
      console.error('API error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Failed to delete booking' });
      }

      return res.status(204).send(null);
    } catch (error) {
      console.error('API error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
