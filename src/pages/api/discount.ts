import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, bookingAmount } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Discount code required' });
  }

  try {
    // Get discount code
    const { data: discount, error } = await supabase
      .from('discount_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error || !discount) {
      return res.status(404).json({ error: 'Invalid discount code' });
    }

    // Check if code is valid
    const today = new Date();
    const validFrom = new Date(discount.valid_from);
    const validUntil = new Date(discount.valid_until);

    if (today < validFrom || today > validUntil) {
      return res.status(400).json({ error: 'Discount code expired' });
    }

    // Check max uses
    if (discount.max_uses && discount.current_uses >= discount.max_uses) {
      return res.status(400).json({ error: 'Discount code maximum uses reached' });
    }

    // Check minimum booking amount
    if (discount.min_booking_amount && bookingAmount < discount.min_booking_amount) {
      return res.status(400).json({
        error: `Minimum booking amount of GHS ${discount.min_booking_amount} required`,
      });
    }

    // Calculate discount amount
    let discountAmount = 0;
    if (discount.discount_percent) {
      discountAmount = (bookingAmount * discount.discount_percent) / 100;
    } else if (discount.discount_amount) {
      discountAmount = discount.discount_amount;
    }

    return res.status(200).json({
      success: true,
      code: discount.code,
      discountAmount: discountAmount.toFixed(2),
      discountPercent: discount.discount_percent,
      discountFixed: discount.discount_amount,
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
