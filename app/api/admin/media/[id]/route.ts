import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // 1. Strict Admin Authentication Guard
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: 'Unauthorized: Scrap media is confidential B2B data and requires admin login.' },
      { status: 401 }
    );
  }

  try {
    // 2. Fetch record from database
    const scrapMedia = await prisma.scrapImage.findUnique({
      where: { id: params.id },
    });

    if (!scrapMedia) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    // 3. Locate private file
    const privateDir = path.join(process.cwd(), 'private_uploads');
    let filePath = path.join(privateDir, scrapMedia.fileName);

    // Fallback if file was saved under public/images for seeded fixtures
    try {
      await fs.access(filePath);
    } catch {
      // Check if it's a seeded fixture in public
      const publicPath = path.join(process.cwd(), 'public', scrapMedia.fileUrl.replace(/^\//, ''));
      try {
        await fs.access(publicPath);
        filePath = publicPath;
      } catch {
        return NextResponse.json({ error: 'File content not found on server' }, { status: 404 });
      }
    }

    const fileBuffer = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();

    const mimeMap: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.mp4': 'video/mp4',
      '.mov': 'video/quicktime',
      '.webm': 'video/webm',
    };

    const contentType = mimeMap[ext] || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('Error serving private media:', error);
    return NextResponse.json({ error: 'Failed to retrieve media file' }, { status: 500 });
  }
}
