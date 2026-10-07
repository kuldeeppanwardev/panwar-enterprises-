import jwt from 'jsonwebtoken';
import { cookies, headers } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'panwar-enterprises-super-secret-industrial-key-2026';
const COOKIE_NAME = 'pe_admin_token';

export interface AdminPayload {
  id: string;
  username: string;
  name: string;
  role: string;
}

export function signAdminToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch (error) {
    return null;
  }
}

export async function getSessionAdmin(): Promise<AdminPayload | null> {
  try {
    // 1. Try Cookie
    const cookieStore = cookies();
    const cookieToken = cookieStore.get(COOKIE_NAME)?.value;
    if (cookieToken) {
      const verified = verifyAdminToken(cookieToken);
      if (verified) return verified;
    }

    // 2. Try Authorization Bearer Header
    const headerList = headers();
    const authHeader = headerList.get('authorization') || headerList.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const bearerToken = authHeader.substring(7).trim();
      const verified = verifyAdminToken(bearerToken);
      if (verified) return verified;
    }

    return null;
  } catch {
    return null;
  }
}

export const ADMIN_COOKIE_CONFIG = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};
