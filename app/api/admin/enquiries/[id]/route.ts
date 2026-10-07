import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const enquiry = await prisma.scrapEnquiry.findUnique({
      where: { id: params.id },
      include: {
        images: true,
        quotations: { orderBy: { createdAt: 'desc' } },
        pickups: { orderBy: { createdAt: 'desc' } },
        contactLogs: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    // Company & Customer historical orders/enquiries
    const customerHistory = await prisma.scrapEnquiry.findMany({
      where: {
        id: { not: params.id },
        OR: [
          { phone: enquiry.phone },
          { companyName: enquiry.companyName },
        ],
      },
      select: {
        id: true,
        enquiryNumber: true,
        scrapType: true,
        approximateQuantity: true,
        quantityUnit: true,
        status: true,
        createdAt: true,
        quotations: {
          take: 1,
          orderBy: { createdAt: 'desc' },
          select: { estimatedTotal: true, rate: true, unit: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });

    return NextResponse.json({ enquiry, customerHistory });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { status, assignedPerson, adminNotes } = body;

    const updated = await prisma.scrapEnquiry.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(assignedPerson !== undefined && { assignedPerson }),
        ...(adminNotes !== undefined && { adminNotes }),
      },
      include: {
        images: true,
        quotations: { orderBy: { createdAt: 'desc' } },
        pickups: { orderBy: { createdAt: 'desc' } },
        contactLogs: { orderBy: { createdAt: 'desc' } },
      },
    });

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}
