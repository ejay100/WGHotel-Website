import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { reference, bookingId, provider } = req.body;

  if (!reference || !bookingId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    let paymentStatus = 'failed';
    let paymentData: any = null;

    if (provider === 'paystack') {
      // Verify with Paystack
      try {
        const response = await axios.get(
          `https://api.paystack.co/transaction/verify/${reference}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            },
          }
        );

        if (response.data.data.status === 'success') {
          paymentStatus = 'success';
          paymentData = response.data.data;
        }
      } catch (error: any) {
        console.error('Paystack verification error:', error.message);
      }
    }

    // Update booking with payment status
    if (paymentStatus === 'success') {
      const { error } = await supabase
        .from('bookings')
        .update({ payment_status: 'completed' })
        .eq('id', bookingId);

      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Failed to update booking' });
      }

      // Log payment transaction
      await supabase
        .from('payment_transactions')
        .insert([
          {
            booking_id: bookingId,
            amount: paymentData?.amount / 100,
            payment_method: provider,
            transaction_reference: reference,
            status: 'success',
            response_data: paymentData,
            processed_at: new Date().toISOString(),
          },
        ]);
    }

    return res.status(200).json({
      success: paymentStatus === 'success',
      status: paymentStatus,
      reference,
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Payment verification failed' });
  }
}
