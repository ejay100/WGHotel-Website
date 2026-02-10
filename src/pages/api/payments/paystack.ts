import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, amount, bookingReference } = req.body;

  if (!email || !amount || !bookingReference) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Initialize payment with Paystack
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: Math.round(amount * 100), // Convert to pesewas
        metadata: {
          bookingReference,
          hotel: 'Winners Gold Hotel',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.data.status) {
      return res.status(400).json({ error: 'Payment initialization failed' });
    }

    return res.status(200).json({
      success: true,
      authorizationUrl: response.data.data.authorization_url,
      accessCode: response.data.data.access_code,
      reference: response.data.data.reference,
    });
  } catch (error: any) {
    console.error('Paystack error:', error.response?.data || error.message);
    return res.status(500).json({
      error: 'Payment initialization failed',
      message: error.message,
    });
  }
}
