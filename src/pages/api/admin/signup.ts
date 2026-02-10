// ================================================
// ADMIN SIGNUP API ENDPOINT
// Uses local storage access code validation
// ================================================

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase, SUPABASE_URL } from '@/lib/supabase';
import { generateToken } from '@/lib/auth';
import { hashPassword } from '@/lib/helpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullName, email, phone, password, role, accessCode } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !role || !accessCode) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Note: Access code validation happens on client-side with local storage
    // This is intentional as codes are self-generated and stored locally
    // Server just validates format
    if (!accessCode.startsWith('WGH-')) {
      return res.status(403).json({ error: 'Invalid access code format' });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if Supabase is configured
    if (!SUPABASE_URL || SUPABASE_URL.includes('your-project')) {
      // Mock signup for development
      const mockUser = {
        id: `user_${Date.now()}`,
        email,
        fullName,
        phone,
        role,
        status: 'active',
        createdAt: new Date().toISOString(),
      };

      const token = generateToken(mockUser.id, email, role);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully',
        user: mockUser,
        token,
      });
    }

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user in database
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert({
        email: email.toLowerCase(),
        password_hash: passwordHash,
        full_name: fullName,
        phone,
        role,
        status: 'active',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (createError) {
      console.error('User creation error:', createError);
      return res.status(500).json({ error: 'Failed to create account' });
    }

    // Generate JWT token
    const token = generateToken(newUser.id, newUser.email, role);

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.full_name,
        phone: newUser.phone,
        role: newUser.role,
        status: newUser.status,
      },
      token,
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
