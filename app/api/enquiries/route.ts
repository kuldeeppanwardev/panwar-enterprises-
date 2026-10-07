import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const ALLOWED_IMAGE_MIMES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/gif',
];

const ALLOWED_VIDEO_MIMES = [
  'video/mp4',
  'video/quicktime',
  'video/webm',
  'video/x-matroska',
];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // 1. Mandatory Field Validation
    const companyName = formData.get('companyName')?.toString()?.trim();
    const contactPerson = formData.get('contactPerson')?.toString()?.trim();
    const phone = formData.get('phone')?.toString()?.trim();
    const scrapType = formData.get('scrapType')?.toString()?.trim();
    const pickupAddress = formData.get('pickupAddress')?.toString()?.trim();

    if (!companyName) {
      return NextResponse.json({ error: 'Company Name is required.' }, { status: 400 });
    }
    if (!contactPerson) {
      return NextResponse.json({ error: 'Contact Person is required.' }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ error: 'Phone Number is required.' }, { status: 400 });
    }
    if (!scrapType) {
      return NextResponse.json({ error: 'Scrap Type selection is required.' }, { status: 400 });
    }
    if (!pickupAddress) {
      return NextResponse.json({ error: 'Pickup Address is required.' }, { status: 400 });
    }

    // Phone format validation (at least 10 numeric digits)
    const rawDigits = phone.replace(/\D/g, '');
    if (rawDigits.length < 10) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number with at least 10 digits.' },
        { status: 400 }
      );
    }

    // Optional fields
    const whatsapp = formData.get('whatsapp')?.toString()?.trim() || phone;
    const email = formData.get('email')?.toString()?.trim() || null;
    const approxQtyStr = formData.get('approximateQuantity')?.toString()?.trim();
    const approximateQuantity = approxQtyStr ? parseFloat(approxQtyStr) : null;
    const quantityUnit = formData.get('quantityUnit')?.toString()?.trim() || 'TON';
    const city = formData.get('city')?.toString()?.trim() || null;
    const industrialArea = formData.get('industrialArea')?.toString()?.trim() || null;
    const pincode = formData.get('pincode')?.toString()?.trim() || null;
    const scrapDescription = formData.get('scrapDescription')?.toString()?.trim() || null;
    const preferredPickupDate = formData.get('preferredPickupDate')?.toString()?.trim() || null;
    const preferredPickupTime = formData.get('preferredPickupTime')?.toString()?.trim() || null;
    const additionalMessage = formData.get('additionalMessage')?.toString()?.trim() || null;

    // 2. File Verification & Secure Private Storage
    const privateDir = path.join(process.cwd(), 'private_uploads');
    await fs.mkdir(privateDir, { recursive: true });

    const rawFiles = formData.getAll('images');
    const validImageFiles = rawFiles.filter(
      (f): f is File => f instanceof File && f.size > 0
    );

    if (validImageFiles.length === 0) {
      return NextResponse.json(
        { error: 'Please upload at least one scrap photo for evaluation.' },
        { status: 400 }
      );
    }

    // Process & store each image in private directory
    const savedMediaList: Array<{
      id: string;
      fileName: string;
      fileUrl: string;
      fileType: string;
      fileSize: number;
    }> = [];

    for (let i = 0; i < validImageFiles.length; i++) {
      const file = validImageFiles[i];

      // File Size limit: 25MB
      if (file.size > 25 * 1024 * 1024) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds the 25MB limit.` },
          { status: 400 }
        );
      }

      // MIME type check
      if (file.type && !ALLOWED_IMAGE_MIMES.includes(file.type.toLowerCase())) {
        return NextResponse.json(
          { error: `File "${file.name}" is not a supported image format. Please use JPG, PNG, or WEBP.` },
          { status: 400 }
        );
      }

      const ext = path.extname(file.name).toLowerCase() || '.jpg';
      const fileId = `media_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const diskFileName = `${fileId}${ext}`;
      const destPath = path.join(privateDir, diskFileName);

      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(destPath, buffer);

      savedMediaList.push({
        id: fileId,
        fileName: diskFileName,
        // Private endpoint - only accessible to authenticated admin
        fileUrl: `/api/admin/media/${fileId}`,
        fileType: 'IMAGE',
        fileSize: file.size,
      });
    }

    // Optional Video file handling
    const rawVideo = formData.get('video');
    if (rawVideo instanceof File && rawVideo.size > 0) {
      if (rawVideo.size > 60 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Video file exceeds the maximum 60MB size limit.' },
          { status: 400 }
        );
      }

      if (rawVideo.type && !ALLOWED_VIDEO_MIMES.includes(rawVideo.type.toLowerCase())) {
        return NextResponse.json(
          { error: 'Invalid video format. Supported formats: MP4, MOV, WEBM.' },
          { status: 400 }
        );
      }

      const ext = path.extname(rawVideo.name).toLowerCase() || '.mp4';
      const videoId = `media_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const diskFileName = `${videoId}${ext}`;
      const destPath = path.join(privateDir, diskFileName);

      const buffer = Buffer.from(await rawVideo.arrayBuffer());
      await fs.writeFile(destPath, buffer);

      savedMediaList.push({
        id: videoId,
        fileName: diskFileName,
        fileUrl: `/api/admin/media/${videoId}`,
        fileType: 'VIDEO',
        fileSize: rawVideo.size,
      });
    }

    // 3. Sequential Unique Enquiry ID Generation: PE-YYYY-XXXX
    const currentYear = new Date().getFullYear();
    const count = await prisma.scrapEnquiry.count();
    const enquiryNumber = `PE-${currentYear}-${(1001 + count).toString().padStart(4, '0')}`;

    // 4. Save to Database
    const enquiry = await prisma.scrapEnquiry.create({
      data: {
        enquiryNumber,
        companyName,
        contactPerson,
        phone,
        whatsapp,
        email,
        scrapType,
        approximateQuantity,
        quantityUnit,
        pickupAddress,
        city,
        industrialArea,
        pincode,
        scrapDescription,
        preferredPickupDate,
        preferredPickupTime,
        additionalMessage,
        status: 'NEW',
        images: {
          create: savedMediaList.map((m) => ({
            id: m.id,
            fileName: m.fileName,
            fileUrl: m.fileUrl,
            fileType: m.fileType,
            fileSize: m.fileSize,
          })),
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json({
      success: true,
      enquiryNumber: enquiry.enquiryNumber,
      id: enquiry.id,
      message: 'Scrap enquiry submitted successfully. PANWAR ENTERPRISES will contact you shortly.',
    });
  } catch (error: any) {
    console.error('Error processing scrap enquiry:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your enquiry. Please contact us directly at 9813155887.' },
      { status: 500 }
    );
  }
}
