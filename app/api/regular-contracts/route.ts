import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      companyName,
      contactPerson,
      phone,
      location,
      scrapType,
      approximateMonthlyQuantity,
      pickupFrequency,
      additionalRequirements,
    } = body;

    if (!companyName || !contactPerson || !phone || !location) {
      return NextResponse.json(
        { error: 'Please provide Company Name, Contact Person, Phone, and Location.' },
        { status: 400 }
      );
    }

    const contract = await prisma.regularContractRequest.create({
      data: {
        companyName,
        contactPerson,
        phone,
        location,
        scrapType: scrapType || 'Industrial Mixed Scrap',
        approximateMonthlyQuantity: approximateMonthlyQuantity || 'To be assessed',
        pickupFrequency: pickupFrequency || 'Weekly',
        additionalRequirements: additionalRequirements || null,
        status: 'NEW',
      },
    });

    return NextResponse.json({
      success: true,
      id: contract.id,
      message: 'Regular collection request received. Our team will contact you to discuss scheduling and logistics.',
    });
  } catch (error: any) {
    console.error('Error in POST /api/regular-contracts:', error);
    return NextResponse.json(
      { error: 'Unable to process regular collection request at this moment.' },
      { status: 500 }
    );
  }
}
