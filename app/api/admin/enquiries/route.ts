import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.trim() || '';
    const status = searchParams.get('status')?.trim() || '';
    const scrapType = searchParams.get('scrapType')?.trim() || '';
    const location = searchParams.get('location')?.trim() || '';

    // Calculate live status counts
    const [
      totalCount,
      newCount,
      underReviewCount,
      contactedCount,
      quotationCount,
      pickupScheduledCount,
      completedCount,
      cancelledCount,
    ] = await Promise.all([
      prisma.scrapEnquiry.count(),
      prisma.scrapEnquiry.count({ where: { status: 'NEW' } }),
      prisma.scrapEnquiry.count({ where: { status: 'UNDER_REVIEW' } }),
      prisma.scrapEnquiry.count({ where: { status: 'CONTACTED' } }),
      prisma.scrapEnquiry.count({ where: { status: 'QUOTATION_GIVEN' } }),
      prisma.scrapEnquiry.count({ where: { status: 'PICKUP_SCHEDULED' } }),
      prisma.scrapEnquiry.count({ where: { status: 'COMPLETED' } }),
      prisma.scrapEnquiry.count({ where: { status: 'CANCELLED' } }),
    ]);

    // Build filter where query
    const whereClause: any = {};

    if (status && status !== 'ALL') {
      whereClause.status = status;
    }

    if (scrapType && scrapType !== 'ALL') {
      whereClause.scrapType = { contains: scrapType };
    }

    if (location && location !== 'ALL') {
      whereClause.OR = [
        { city: { contains: location } },
        { industrialArea: { contains: location } },
        { pickupAddress: { contains: location } },
      ];
    }

    if (q) {
      whereClause.OR = [
        { companyName: { contains: q } },
        { contactPerson: { contains: q } },
        { phone: { contains: q } },
        { enquiryNumber: { contains: q } },
        { scrapType: { contains: q } },
        { pickupAddress: { contains: q } },
        { city: { contains: q } },
        { industrialArea: { contains: q } },
      ];
    }

    const enquiries = await prisma.scrapEnquiry.findMany({
      where: whereClause,
      include: {
        images: true,
        quotations: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        pickups: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      stats: {
        total: totalCount,
        new: newCount,
        underReview: underReviewCount,
        contacted: contactedCount,
        quotationGiven: quotationCount,
        pickupScheduled: pickupScheduledCount,
        completed: completedCount,
        cancelled: cancelledCount,
      },
      enquiries,
    });
  } catch (error: any) {
    console.error('Error fetching admin enquiries:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve enquiries' },
      { status: 500 }
    );
  }
}
