import { NextApiRequest, NextApiResponse } from 'next';
import { supabase, SUPABASE_URL } from '@/lib/supabase';
import { comparePasswords, generateToken } from '@/lib/helpers';

// Mock admin user for development
const MOCK_ADMIN = {
  id: 'mock-admin-001',
  email: 'admin@winnersgold.com',
  password: 'Admin@123',
  fullName: 'Admin User',
  role: 'manager',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    // If Supabase is not configured, use mock login
    if (!SUPABASE_URL || SUPABASE_URL === 'https://your-project.supabase.co') {
      console.log('Using mock login (Supabase not configured)');
      
      if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
        const token = generateToken({
          id: MOCK_ADMIN.id,
          email: MOCK_ADMIN.email,
          role: MOCK_ADMIN.role,
          fullName: MOCK_ADMIN.fullName,
        });

        return res.status(200).json({
          success: true,
          token,
          user: {
            id: MOCK_ADMIN.id,
            email: MOCK_ADMIN.email,
            fullName: MOCK_ADMIN.fullName,
            role: MOCK_ADMIN.role,
          },
        });
      }
      
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Get user from database
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .in('role', ['admin', 'manager', 'receptionist'])
      .single();

    if (error || !user) {
      console.error('User not found:', error);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const passwordMatch = comparePasswords(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if user is active
    if (user.status !== 'active') {
      return res.status(403).json({ error: 'User account is inactive' });
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.full_name,
    });

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
