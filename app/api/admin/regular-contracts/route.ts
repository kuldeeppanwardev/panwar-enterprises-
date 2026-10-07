import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const contracts = await prisma.regularContractRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ contracts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contracts' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    const updated = await prisma.regularContractRequest.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ success: true, contract: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update contract' }, { status: 500 });
  }
}
