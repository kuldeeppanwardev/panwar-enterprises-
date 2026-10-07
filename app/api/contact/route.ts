import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, subject, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Please enter your name, phone number, and message.' },
        { status: 400 }
      );
    }

    // In production, trigger email/SMS notification
    console.log('Contact Enquiry received:', { name, phone, email, subject, message });

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out. PANWAR ENTERPRISES will contact you shortly.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process message.' },
      { status: 500 }
    );
  }
}
