import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid booking ID' });
  }

  // GET - Fetch specific conference booking
  if (req.method === 'GET') {
    try {
      const { data: booking, error } = await supabase
        .from('conference_bookings')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !booking) {
        return res.status(404).json({ error: 'Conference booking not found' });
      }

      return res.status(200).json(booking);
    } catch (error) {
      console.error('API error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // PUT - Update conference booking
  if (req.method === 'PUT') {
    try {
      const { status, payment_status, special_requirements } = req.body;

      const updates: any = {};
      if (status) updates.status = status;
      if (payment_status) updates.payment_status = payment_status;
      if (special_requirements !== undefined) updates.special_requirements = special_requirements;
      updates.updated_at = new Date().toISOString();

      const { data: booking, error } = await supabase
        .from('conference_bookings')
        .update(updates)
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Failed to update conference booking' });
      }

      return res.status(200).json({
        success: true,
        booking,
      });
    } catch (error) {
      console.error('API error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // DELETE - Cancel conference booking
  if (req.method === 'DELETE') {
    try {
      const { data: booking, error } = await supabase
        .from('conference_bookings')
        .update({
          status: 'cancelled',
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Failed to cancel conference booking' });
      }

      return res.status(200).json({
        success: true,
        message: 'Conference booking cancelled successfully',
        booking,
      });
    } catch (error) {
      console.error('API error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
