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
    const { materialType, estimatedQuantity, rate, unit, estimatedTotal, notes } = body;

    if (!materialType || rate === undefined || !estimatedTotal) {
      return NextResponse.json(
        { error: 'Please enter material type, rate, and estimated total value.' },
        { status: 400 }
      );
    }

    const quotation = await prisma.quotation.create({
      data: {
        enquiryId: params.id,
        materialType,
        estimatedQuantity: estimatedQuantity || 'As inspected',
        rate: parseFloat(rate.toString()),
        unit: unit || 'KG',
        estimatedTotal: parseFloat(estimatedTotal.toString()),
        notes: notes || null,
        createdBy: admin.name || admin.username,
        status: 'ACTIVE',
      },
    });

    // Update enquiry status to QUOTATION_GIVEN
    await prisma.scrapEnquiry.update({
      where: { id: params.id },
      data: {
        status: 'QUOTATION_GIVEN',
      },
    });

    // Also record in contact log
    await prisma.contactLog.create({
      data: {
        enquiryId: params.id,
        contactMethod: 'QUOTATION',
        summary: `Quotation created: ₹${rate}/${unit} for ${materialType}. Est Total: ₹${estimatedTotal}`,
        loggedBy: admin.name,
      },
    });

    return NextResponse.json({ success: true, quotation });
  } catch (error) {
    console.error('Error creating quotation:', error);
    return NextResponse.json({ error: 'Failed to create quotation' }, { status: 500 });
  }
}
