import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Panwar Enterprises database...');

  // 1. Seed Admin
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Panwar@2026';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const existingAdmin = await prisma.admin.findUnique({
    where: { username: adminUsername },
  });

  if (!existingAdmin) {
    await prisma.admin.create({
      data: {
        username: adminUsername,
        passwordHash,
        name: 'Bhim Singh Panwar',
        role: 'SUPER_ADMIN',
      },
    });
    console.log(`Admin account created: ${adminUsername}`);
  } else {
    // Update password hash to ensure sync
    await prisma.admin.update({
      where: { username: adminUsername },
      data: { passwordHash },
    });
  }

  // 2. Check if enquiries already exist
  const count = await prisma.scrapEnquiry.count();
  if (count === 0) {
    console.log('Creating realistic initial B2B scrap enquiries...');

    // Enquiry 1: Heavy Machinery & Iron Scrap - Manesar IMT (Quotation Given)
    const enq1 = await prisma.scrapEnquiry.create({
      data: {
        enquiryNumber: 'PE-2026-1001',
        companyName: 'Apex Precision Engineering Ltd.',
        contactPerson: 'Rajiv Sharma',
        phone: '9876543210',
        whatsapp: '9876543210',
        email: 'procurement@apexprecision.in',
        scrapType: 'Iron & Heavy Machinery Scrap',
        approximateQuantity: 14.5,
        quantityUnit: 'TON',
        pickupAddress: 'Plot 42, Sector 8, Phase 2, IMT Manesar',
        city: 'Manesar',
        industrialArea: 'IMT Manesar',
        pincode: '122051',
        scrapDescription: 'Decommissioned lathe beds, stamping presses, cast iron dies, and turning scrap.',
        preferredPickupDate: '2026-10-12',
        preferredPickupTime: '10:00 AM - 02:00 PM',
        additionalMessage: 'Need high-capacity weighbridge slip and immediate crane loading.',
        status: 'QUOTATION_GIVEN',
        assignedPerson: 'Bhim Singh Panwar',
        adminNotes: 'Contacted Rajiv Sharma on Oct 5. Shared rate of Rs 38.50/kg for cast iron and Rs 41/kg for heavy machinery.',
        images: {
          create: [
            {
              fileName: 'machinery-scrap-lot-1.jpg',
              fileUrl: '/images/sample-machinery-1.jpg',
              fileType: 'IMAGE',
              fileSize: 2400000,
            },
            {
              fileName: 'cast-iron-dies.jpg',
              fileUrl: '/images/sample-iron-1.jpg',
              fileType: 'IMAGE',
              fileSize: 1850000,
            },
          ],
        },
        quotations: {
          create: [
            {
              materialType: 'Heavy Machinery & Cast Iron',
              estimatedQuantity: '14.5 Tons (14,500 KG)',
              rate: 39.5,
              unit: 'KG',
              estimatedTotal: 572750,
              notes: 'Includes on-site crane mobilization and direct payment upon computer weighbridge verification.',
              status: 'ACTIVE',
              createdBy: 'Bhim Singh',
            },
          ],
        },
        contactLogs: {
          create: [
            {
              contactMethod: 'PHONE',
              summary: 'Discussed volume and weighbridge location near Manesar toll.',
              loggedBy: 'Bhim Singh',
            },
          ],
        },
      },
    });

    // Enquiry 2: Automobile Sheet Metal & Press Scrap - Bawal Industrial Area (Pickup Scheduled)
    await prisma.scrapEnquiry.create({
      data: {
        enquiryNumber: 'PE-2026-1002',
        companyName: 'Haryana Auto Components Pvt. Ltd.',
        contactPerson: 'Virender Yadav',
        phone: '9812304567',
        whatsapp: '9812304567',
        email: 'virender.y@haryanaauto.com',
        scrapType: 'Automobile Steel Scrap',
        approximateQuantity: 8.2,
        quantityUnit: 'TON',
        pickupAddress: 'Sector 3, HSIIDC Industrial Estate, Bawal',
        city: 'Bawal',
        industrialArea: 'HSIIDC Bawal',
        pincode: '123501',
        scrapDescription: 'CRC stamping skeletons, trimmed automobile sheet metal, punch press off-cuts.',
        preferredPickupDate: '2026-10-09',
        preferredPickupTime: '09:00 AM',
        additionalMessage: 'Hydra crane and 16-wheel truck required. Regular bi-weekly generation.',
        status: 'PICKUP_SCHEDULED',
        assignedPerson: 'Bhim Singh Panwar',
        adminNotes: 'Rate accepted. Truck scheduled with driver Surender (HR36-AC-4521).',
        images: {
          create: [
            {
              fileName: 'crc-sheet-scrap.jpg',
              fileUrl: '/images/sample-steel-1.jpg',
              fileType: 'IMAGE',
              fileSize: 1420000,
            },
          ],
        },
        quotations: {
          create: [
            {
              materialType: 'CRC Sheet Metal Punch Scrap',
              estimatedQuantity: '8.2 Tons',
              rate: 42.0,
              unit: 'KG',
              estimatedTotal: 344400,
              notes: 'Clean CRC scrap. Instant RTGS payment before vehicle departure.',
              status: 'ACCEPTED',
              createdBy: 'Bhim Singh',
            },
          ],
        },
        pickups: {
          create: [
            {
              scheduledDate: '2026-10-09',
              scheduledTime: '09:00 AM',
              driverName: 'Surender Kumar',
              vehicleNumber: 'HR-36-AC-4521',
              notes: 'Driver instructed with PPE kit and gate pass details.',
              status: 'SCHEDULED',
            },
          ],
        },
      },
    });

    // Enquiry 3: Copper & Electrical Cable Scrap - Gurugram (New)
    await prisma.scrapEnquiry.create({
      data: {
        enquiryNumber: 'PE-2026-1003',
        companyName: 'Techno Power Systems Ltd.',
        contactPerson: 'Amitabh Sen',
        phone: '9911223344',
        whatsapp: '9911223344',
        email: 'asen@technopower.in',
        scrapType: 'Copper & Electrical Scrap',
        approximateQuantity: 2800,
        quantityUnit: 'KG',
        pickupAddress: 'Udyog Vihar Phase 4, Gurugram',
        city: 'Gurugram',
        industrialArea: 'Udyog Vihar',
        pincode: '122016',
        scrapDescription: 'Stripped copper busbars, heavy copper transformer winding, insulated cables.',
        preferredPickupDate: '2026-10-15',
        preferredPickupTime: '11:00 AM',
        additionalMessage: 'Please provide copper scrap pricing today.',
        status: 'NEW',
        assignedPerson: 'Unassigned',
        adminNotes: 'Fresh enquiry via website. Needs rapid quotation.',
        images: {
          create: [
            {
              fileName: 'copper-busbars.jpg',
              fileUrl: '/images/sample-copper-1.jpg',
              fileType: 'IMAGE',
              fileSize: 1200000,
            },
          ],
        },
      },
    });

    // Enquiry 4: Aluminium Extrusion Scrap - Neemrana RIICO (Completed)
    await prisma.scrapEnquiry.create({
      data: {
        enquiryNumber: 'PE-2026-1004',
        companyName: 'Sunrise Aluminium Profiles LLP',
        contactPerson: 'Mahesh Chauhan',
        phone: '9829012345',
        whatsapp: '9829012345',
        email: 'm.chauhan@sunriseprofiles.com',
        scrapType: 'Aluminium Scrap',
        approximateQuantity: 5.5,
        quantityUnit: 'TON',
        pickupAddress: 'RIICO Industrial Area, Phase 1, Neemrana',
        city: 'Neemrana',
        industrialArea: 'RIICO Neemrana',
        pincode: '301705',
        scrapDescription: '6063 alloy aluminium profile cuts, anodized off-cuts, clean chips.',
        preferredPickupDate: '2026-09-28',
        preferredPickupTime: '10:00 AM',
        additionalMessage: 'Completed pickup successfully.',
        status: 'COMPLETED',
        assignedPerson: 'Bhim Singh Panwar',
        adminNotes: 'Transaction finished. Payment cleared, weigh slip filed.',
        quotations: {
          create: [
            {
              materialType: 'Aluminium 6063 Profile Scrap',
              estimatedQuantity: '5.5 Tons',
              rate: 198.0,
              unit: 'KG',
              estimatedTotal: 1089000,
              notes: 'Clean alloy premium.',
              status: 'COMPLETED',
              createdBy: 'Bhim Singh',
            },
          ],
        },
      },
    });

    // Enquiry 5: Warehouse & Pallet Mixed Scrap - Rewari (Contacted)
    await prisma.scrapEnquiry.create({
      data: {
        enquiryNumber: 'PE-2026-1005',
        companyName: 'LogiHub Industrial Logistics Park',
        contactPerson: 'Sunil Verma',
        phone: '9416055887',
        whatsapp: '9416055887',
        email: 'warehouse@logihub.in',
        scrapType: 'Warehouse & Mixed Scrap',
        approximateQuantity: 6.0,
        quantityUnit: 'TON',
        pickupAddress: 'Near Rewari-Delhi Road Bypass, Rewari',
        city: 'Rewari',
        industrialArea: 'Rewari Bypass',
        pincode: '123401',
        scrapDescription: 'Heavy racking uprights, slotted angles, steel pallets, and industrial strapping scrap.',
        preferredPickupDate: '2026-10-14',
        preferredPickupTime: '02:00 PM',
        additionalMessage: 'Yard clearance requested before next inventory audit.',
        status: 'CONTACTED',
        assignedPerson: 'Bhim Singh Panwar',
        adminNotes: 'Spoke with Sunil on Oct 6. Arranging physical inspection tomorrow.',
      },
    });

    // Regular contract requests
    await prisma.regularContractRequest.create({
      data: {
        companyName: 'Maruti Vendor Ancillary Unit',
        contactPerson: 'Dinesh Kumar',
        phone: '9813098765',
        location: 'IMT Manesar Sector 5',
        scrapType: 'Automobile Sheet Metal & Press Scrap',
        approximateMonthlyQuantity: '30 to 40 Tons/Month',
        pickupFrequency: 'Twice Weekly',
        additionalRequirements: 'Dedicated container bins and fixed contract terms required.',
        status: 'NEW',
      },
    });

    console.log('Sample data seeded successfully.');
  }

  console.log('Database ready.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
