import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

function escapeCsvField(val: any): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET(req: NextRequest) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status')?.trim() || '';

    const whereClause: any = {};
    if (status && status !== 'ALL') {
      whereClause.status = status;
    }

    const enquiries = await prisma.scrapEnquiry.findMany({
      where: whereClause,
      include: {
        images: true,
        quotations: { orderBy: { createdAt: 'desc' }, take: 1 },
        pickups: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
      orderBy: { createdAt: 'desc' },
    });

    const headers = [
      'Enquiry ID',
      'Date Submitted',
      'Company Name',
      'Contact Person',
      'Phone Number',
      'WhatsApp Number',
      'Email',
      'Scrap Type',
      'Quantity',
      'Unit',
      'Pickup Address',
      'City',
      'Industrial Area',
      'Pincode',
      'Status',
      'Assigned Person',
      'Latest Quotation Rate (INR)',
      'Latest Quotation Unit',
      'Latest Quotation Total (INR)',
      'Scheduled Pickup Date',
      'Scheduled Pickup Time',
      'Assigned Driver',
      'Assigned Vehicle',
      'Admin Notes',
    ];

    const rows = enquiries.map((enq) => {
      const q = enq.quotations && enq.quotations[0];
      const p = enq.pickups && enq.pickups[0];

      return [
        escapeCsvField(enq.enquiryNumber),
        escapeCsvField(new Date(enq.createdAt).toISOString().split('T')[0]),
        escapeCsvField(enq.companyName),
        escapeCsvField(enq.contactPerson),
        escapeCsvField(enq.phone),
        escapeCsvField(enq.whatsapp),
        escapeCsvField(enq.email),
        escapeCsvField(enq.scrapType),
        escapeCsvField(enq.approximateQuantity),
        escapeCsvField(enq.quantityUnit),
        escapeCsvField(enq.pickupAddress),
        escapeCsvField(enq.city),
        escapeCsvField(enq.industrialArea),
        escapeCsvField(enq.pincode),
        escapeCsvField(enq.status),
        escapeCsvField(enq.assignedPerson),
        escapeCsvField(q ? q.rate : ''),
        escapeCsvField(q ? q.unit : ''),
        escapeCsvField(q ? q.estimatedTotal : ''),
        escapeCsvField(p ? p.scheduledDate : ''),
        escapeCsvField(p ? p.scheduledTime : ''),
        escapeCsvField(p ? p.driverName : ''),
        escapeCsvField(p ? p.vehicleNumber : ''),
        escapeCsvField(enq.adminNotes),
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const today = new Date().toISOString().split('T')[0];

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="Panwar_Enterprises_Enquiries_${today}.csv"`,
      },
    });
  } catch (error) {
    console.error('CSV Export Error:', error);
    return NextResponse.json({ error: 'Failed to generate CSV export' }, { status: 500 });
  }
}
