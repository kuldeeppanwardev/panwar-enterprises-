'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, UploadCloud } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';

export default function MobileStickyBar() {
  const whatsappMessage = encodeURIComponent(
    'Hello PANWAR ENTERPRISES, I have industrial scrap available. I would like to share the scrap details and get the best price.'
  );

  return (
    <div className="mobile-sticky-bar">
      <a
        href={`tel:${BUSINESS_INFO.phone}`}
        className="btn btn-call"
        style={{
          flex: '1',
          padding: '10px 8px',
          fontSize: '0.8rem',
          borderRadius: '8px',
          gap: '6px',
        }}
      >
        <Phone size={15} />
        <span>CALL</span>
      </a>

      <a
        href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-whatsapp"
        style={{
          flex: '1',
          padding: '10px 8px',
          fontSize: '0.8rem',
          borderRadius: '8px',
          gap: '6px',
        }}
      >
        <MessageSquare size={15} />
        <span>WHATSAPP</span>
      </a>

      <Link
        href="/sell-scrap"
        className="btn btn-primary"
        style={{
          flex: '1.4',
          padding: '10px 8px',
          fontSize: '0.8rem',
          borderRadius: '8px',
          gap: '6px',
        }}
      >
        <UploadCloud size={16} />
        <span>UPLOAD SCRAP</span>
      </Link>
    </div>
  );
}
