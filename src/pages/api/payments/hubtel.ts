import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const HUBTEL_CLIENT_ID = process.env.NEXT_PUBLIC_HUBTEL_CLIENT_ID || '';
const HUBTEL_CLIENT_SECRET = process.env.HUBTEL_CLIENT_SECRET || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, bookingReference, phoneNumber } = req.body;

  if (!amount || !bookingReference || !phoneNumber) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Initialize payment with Hubtel
    const response = await axios.post(
      'https://api.hubtel.com/v1/merchantaccount/merchants/payment/send',
      {
        ClientReference: bookingReference,
        Amount: amount,
        PrimaryCallbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/hubtel/callback`,
        Description: `Winners Gold Hotel Booking - ${bookingReference}`,
        ClientName: 'Winners Gold Hotel',
        InvoiceNumber: bookingReference,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Hubtel-MerchantId': HUBTEL_CLIENT_ID,
        },
        auth: {
          username: HUBTEL_CLIENT_ID,
          password: HUBTEL_CLIENT_SECRET,
        },
      }
    );

    return res.status(200).json({
      success: true,
      redirectUrl: response.data.data?.redirectUrl,
      transactionId: response.data.data?.transactionId,
    });
  } catch (error: any) {
    console.error('Hubtel error:', error.response?.data || error.message);
    return res.status(500).json({
      error: 'Payment initialization failed',
      message: error.message,
    });
  }
}
