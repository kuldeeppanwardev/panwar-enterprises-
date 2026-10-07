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
    const { scheduledDate, scheduledTime, driverName, vehicleNumber, notes } = body;

    if (!scheduledDate) {
      return NextResponse.json({ error: 'Pickup scheduled date is required.' }, { status: 400 });
    }

    const pickup = await prisma.pickup.create({
      data: {
        enquiryId: params.id,
        scheduledDate,
        scheduledTime: scheduledTime || null,
        driverName: driverName || null,
        vehicleNumber: vehicleNumber || null,
        notes: notes || null,
        status: 'SCHEDULED',
      },
    });

    // Update enquiry status to PICKUP_SCHEDULED
    await prisma.scrapEnquiry.update({
      where: { id: params.id },
      data: {
        status: 'PICKUP_SCHEDULED',
      },
    });

    // Contact log
    await prisma.contactLog.create({
      data: {
        enquiryId: params.id,
        contactMethod: 'LOGISTICS',
        summary: `Pickup scheduled for ${scheduledDate} ${scheduledTime || ''}. Vehicle: ${vehicleNumber || 'TBD'}`,
        loggedBy: admin.name,
      },
    });

    return NextResponse.json({ success: true, pickup });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to schedule pickup' }, { status: 500 });
  }
}
