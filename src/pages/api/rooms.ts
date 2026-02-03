import { NextApiRequest, NextApiResponse } from 'next';
import { queryRooms, isDatabaseConfigured } from '@/lib/db';
import { mockRooms } from '@/lib/mockData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if database is configured
    if (!isDatabaseConfigured()) {
      console.log('Database not configured, using mock data');
      return res.status(200).json(mockRooms);
    }

    // Try to get from database
    const rooms = await queryRooms();

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
