'use client';

import React, { useState } from 'react';
import { MessageSquare, Camera, X } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';

export default function FloatingWhatsApp() {
  const [menuOpen, setMenuOpen] = useState(false);

  const defaultMsg = encodeURIComponent(
    'Hello PANWAR ENTERPRISES, I have industrial scrap available. I would like to share the scrap details and get the best price.'
  );

  const photosMsg = encodeURIComponent(
    'Hello PANWAR ENTERPRISES, I am sharing photos and approximate quantity of our industrial scrap for valuation.'
  );

  return (
    <div style={{ position: 'fixed', bottom: '84px', right: '24px', zIndex: 98 }}>
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '0',
            width: '290px',
            background: '#0F1620',
            border: '1px solid var(--border-metal)',
            borderRadius: '14px',
            padding: '16px',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '0.9rem' }}>
              PANWAR ENTERPRISES
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px' }}
              aria-label="Close WhatsApp options"
            >
              <X size={16} />
            </button>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '6px' }}>
            Connect instantly on WhatsApp (24×7 Active):
          </div>

          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${defaultMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '8px',
              background: '#1A2634',
              border: '1px solid #2B3D52',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#223347')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#1A2634')}
          >
            <MessageSquare size={16} color="#25D366" />
            <span>Chat for Scrap Best Price</span>
          </a>

          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${photosMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '8px',
              background: '#25D366',
              color: '#052610',
              fontSize: '0.85rem',
              fontWeight: 700,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <Camera size={16} color="#052610" />
            <span>Send Scrap Photos on WhatsApp</span>
          </a>
        </div>
      )}

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="floating-whatsapp"
        style={{ border: 'none' }}
        aria-label="Quick WhatsApp enquiry options"
      >
        <MessageSquare size={18} />
        <span>WhatsApp Us</span>
      </button>
    </div>
  );
}
