// Authentication & JWT Helpers
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export function generateToken(userId: string, email: string, role: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const payload = btoa(JSON.stringify({
    userId,
    email,
    role,
    iat: now,
    exp: now + 86400 * 7, // 7 days
  }));

  // Simple HMAC-like signature
  const signature = btoa(`${header}.${payload}.${JWT_SECRET}`);
  return `${header}.${payload}.${signature}`;
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp < now) return null;

    return payload as TokenPayload;
  } catch (error) {
    return null;
  }
}

export function canAccess(role: string, requiredPermission: string): boolean {
  const permissions: Record<string, string[]> = {
    admin: ['all'],
    manager: [
      'view_bookings',
      'create_bookings',
      'cancel_bookings',
      'manage_discounts',
      'view_reports',
      'manage_staff',
    ],
    receptionist: [
      'view_bookings',
      'create_bookings',
      'check_in_guest',
      'check_out_guest',
    ],
  };

  const rolePerms = permissions[role] || [];
  return rolePerms.includes('all') || rolePerms.includes(requiredPermission);
}

export function getClientIp(request?: any): string {
  if (!request) return 'unknown';
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}
