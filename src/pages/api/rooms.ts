import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { mockRooms } from '@/lib/mockData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    
    if (!supabaseUrl || supabaseUrl === '' || supabaseUrl.includes('your-project')) {
      console.log('Supabase not configured, using mock data');
      return res.status(200).json(mockRooms);
    }

    // Try to get from Supabase
    const { data: rooms, error } = await supabase
      .from('rooms')
      .select('*')
      .order('room_number');

    if (error) {
      console.error('Database error, using mock data:', error.message);
      return res.status(200).json(mockRooms);
    }

    // If no rooms found, return mock data
    if (!rooms || rooms.length === 0) {
      console.log('No rooms in database, using mock data');
      return res.status(200).json(mockRooms);
    }

    return res.status(200).json(rooms);
  } catch (error) {
    console.error('API error, using mock data:', error);
    return res.status(200).json(mockRooms);
  }
}
