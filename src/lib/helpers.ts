import { CANCELLATION_POLICY } from './constants';

export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export function calculateBookingTotal(
  basePrice: number,
  nights: number,
  tourPrice: number = 0,
  discountPercent: number = 0
): { baseTotal: number; afterTour: number; afterDiscount: number } {
  const baseTotal = basePrice * nights;
  const afterTour = baseTotal + tourPrice;
  const discountAmount = (afterTour * discountPercent) / 100;
  const afterDiscount = afterTour - discountAmount;

  return {
    baseTotal,
    afterTour,
    afterDiscount,
  };
}

export function calculateRefund(
  totalAmount: number,
  checkInDate: string
): { refundPercent: number; refundAmount: number } {
  const today = new Date();
  const checkIn = new Date(checkInDate);
  const daysUntilCheckIn = Math.ceil(
    (checkIn.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  let refundPercent = 0;

  if (daysUntilCheckIn >= CANCELLATION_POLICY.full_refund_days) {
    refundPercent = 100;
  } else if (daysUntilCheckIn >= CANCELLATION_POLICY.partial_refund_days) {
    refundPercent = CANCELLATION_POLICY.partial_refund_percent;
  } else {
    refundPercent = 0;
  }

  const refundAmount = (totalAmount * refundPercent) / 100;
  return { refundPercent, refundAmount };
}

export function generateBookingReference(prefix: string = 'WGH'): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

export function formatCurrency(amount: number, currency: string = 'GHS'): string {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: currency === 'USD' ? 'USD' : 'GHS',
  }).format(amount);
}

export function isBookingOverlapping(
  newCheckIn: string,
  newCheckOut: string,
  existingCheckIn: string,
  existingCheckOut: string
): boolean {
  const newStart = new Date(newCheckIn);
  const newEnd = new Date(newCheckOut);
  const existingStart = new Date(existingCheckIn);
  const existingEnd = new Date(existingCheckOut);

  return newStart < existingEnd && newEnd > existingStart;
}

export function getOccupancyRate(occupiedRooms: number, totalRooms: number = 44): number {
  return (occupiedRooms / totalRooms) * 100;
}

export function calculateRevPAR(
  totalRevenue: number,
  totalAvailableRooms: number
): number {
  return totalRevenue / totalAvailableRooms;
}

export function validateAdminPassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must include uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must include lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must include number');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must include special character (!@#$%^&*)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Simple hash function for local dev - use bcrypt in production
export function hashPassword(password: string): string {
  // For production, use: bcrypt.hashSync(password, 10)
  // For demo purposes, use a simple hash
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return btoa(password + ':' + Math.abs(hash).toString());
}

export function comparePasswords(password: string, hash: string): boolean {
  // For production, use: bcrypt.compareSync(password, hash)
  try {
    return btoa(password + ':' + Math.abs(
      password.split('').reduce((acc, char) => ((acc << 5) - acc) + char.charCodeAt(0), 0)
    ).toString()) === hash;
  } catch {
    return false;
  }
}

export function generateToken(payload: {
  id: string;
  email: string;
  role: string;
  fullName: string;
}): string {
  // Simple JWT token generation
  // In production, use a proper JWT library like jsonwebtoken
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify({
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
  }));
  const signature = btoa('signature'); // Simplified
  return `${header}.${body}.${signature}`;
}
