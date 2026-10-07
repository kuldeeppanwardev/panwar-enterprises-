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
    const allEnquiries = await prisma.scrapEnquiry.findMany({
      include: {
        quotations: { orderBy: { createdAt: 'desc' }, take: 1 },
        pickups: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });

    // 1. Material Category Distribution
    const materialStats: Record<string, { count: number; totalTonnage: number }> = {};
    // 2. Location Distribution
    const locationStats: Record<string, number> = {};
    // 3. Status Funnel
    const statusFunnel: Record<string, number> = {
      NEW: 0,
      UNDER_REVIEW: 0,
      CONTACTED: 0,
      QUOTATION_GIVEN: 0,
      PICKUP_SCHEDULED: 0,
      COMPLETED: 0,
      CANCELLED: 0,
    };

    let totalQuotedValue = 0;
    let quotationsCount = 0;
    let totalTonnage = 0;

    // 4. Monthly timeline (last 6 months)
    const monthlyTrend: Record<string, number> = {};

    for (const enq of allEnquiries) {
      // Status funnel
      if (statusFunnel[enq.status] !== undefined) {
        statusFunnel[enq.status]++;
      }

      // Material categorization
      const lowerType = enq.scrapType.toLowerCase();
      let category = 'Other / Mixed Scrap';
      if (lowerType.includes('copper')) category = 'Copper Scrap';
      else if (lowerType.includes('iron') || lowerType.includes('cast iron')) category = 'Iron Scrap';
      else if (lowerType.includes('steel') || lowerType.includes('crc')) category = 'Steel Scrap';
      else if (lowerType.includes('aluminium')) category = 'Aluminium Scrap';
      else if (lowerType.includes('machinery')) category = 'Machinery Scrap';
      else if (lowerType.includes('automobile')) category = 'Automobile Scrap';
      else if (lowerType.includes('warehouse')) category = 'Warehouse Scrap';
      else if (lowerType.includes('electrical')) category = 'Electrical Scrap';

      if (!materialStats[category]) {
        materialStats[category] = { count: 0, totalTonnage: 0 };
      }
      materialStats[category].count++;

      let tons = 0;
      if (enq.approximateQuantity) {
        tons = enq.quantityUnit === 'KG' ? enq.approximateQuantity / 1000 : enq.approximateQuantity;
        materialStats[category].totalTonnage += tons;
        totalTonnage += tons;
      }

      // Location categorization
      const loc = enq.city || enq.industrialArea || 'NCR / Haryana Belt';
      locationStats[loc] = (locationStats[loc] || 0) + 1;

      // Quotation values
      if (enq.quotations && enq.quotations.length > 0) {
        totalQuotedValue += enq.quotations[0].estimatedTotal;
        quotationsCount++;
      }

      // Monthly aggregation
      const dateKey = new Date(enq.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
      monthlyTrend[dateKey] = (monthlyTrend[dateKey] || 0) + 1;
    }

    return NextResponse.json({
      summary: {
        totalEnquiries: allEnquiries.length,
        totalTonnage: Math.round(totalTonnage * 10) / 10,
        totalQuotedValue: Math.round(totalQuotedValue),
        averageDealValue: quotationsCount > 0 ? Math.round(totalQuotedValue / quotationsCount) : 0,
        activePickups: statusFunnel.PICKUP_SCHEDULED,
        completedPickups: statusFunnel.COMPLETED,
      },
      statusFunnel,
      materialDistribution: Object.entries(materialStats).map(([name, stat]) => ({
        name,
        count: stat.count,
        tonnage: Math.round(stat.totalTonnage * 10) / 10,
      })),
      locationDistribution: Object.entries(locationStats).map(([name, count]) => ({
        name,
        count,
      })),
      monthlyTrend: Object.entries(monthlyTrend).map(([month, count]) => ({
        month,
        count,
      })),
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to compute analytics' }, { status: 500 });
  }
}
