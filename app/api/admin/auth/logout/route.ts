import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_CONFIG } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully.' });
  response.cookies.set(ADMIN_COOKIE_CONFIG.name, '', {
    ...ADMIN_COOKIE_CONFIG.options,
    maxAge: 0,
  });
  return response;
}
