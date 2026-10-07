import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { contactMethod, summary } = body;

    if (!summary) {
      return NextResponse.json({ error: 'Summary is required' }, { status: 400 });
    }

    const log = await prisma.contactLog.create({
      data: {
        enquiryId: params.id,
        contactMethod: contactMethod || 'PHONE',
        summary,
        loggedBy: admin.name,
      },
    });

    return NextResponse.json({ success: true, log });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add log' }, { status: 500 });
  }
}
