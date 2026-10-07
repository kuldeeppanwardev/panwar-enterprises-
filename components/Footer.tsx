'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, Mail, MapPin, Clock, ArrowRight, ShieldCheck, Factory, Lock } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';

export default function Footer() {
  const whatsappMessage = encodeURIComponent(
    'Hello PANWAR ENTERPRISES, I have industrial scrap available. I would like to share the scrap details and get the best price.'
  );

  return (
    <footer style={{
      background: '#06090D',
      borderTop: '1px solid var(--border-metal)',
      color: '#94A3B8',
      paddingTop: '64px',
      paddingBottom: '32px',
      position: 'relative',
      zIndex: 10,
    }}>
      <div className="container">
        {/* Top Banner inside Footer */}
        <div style={{
          background: 'linear-gradient(135deg, #162230 0%, #0E1620 100%)',
          border: '1px solid #2B3D52',
          borderRadius: '16px',
          padding: '36px',
          marginBottom: '56px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#F59E0B',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '8px',
            }}>
              <ShieldCheck size={16} /> 35+ Years Industrial Scrap Trust
            </div>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.6rem', marginBottom: '8px' }}>
              Have Industrial Scrap Ready for Clearance?
            </h3>
            <p style={{ color: '#CBD5E1', maxWidth: '600px', fontSize: '0.95rem' }}>
              Upload scrap photos or call us directly. We provide competitive market quotations and reliable commercial vehicle pickups across NCR &amp; Haryana industrial corridors.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/sell-scrap" className="btn btn-primary btn-lg">
              UPLOAD YOUR SCRAP
            </Link>
            <a href={`tel:${BUSINESS_INFO.phone}`} className="btn btn-call btn-lg">
              <Phone size={18} />
              CALL NOW: {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '48px',
        }}>
          {/* Column 1: Company Profile */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: '#1A2634',
                border: '1px solid #F59E0B',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Factory size={18} color="#F59E0B" />
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '1.15rem',
                  color: '#FFFFFF',
                  letterSpacing: '0.04em',
                }}>
                  PANWAR <span style={{ color: '#F59E0B' }}>ENTERPRISES</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Industrial Scrap Solutions
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '16px', color: '#94A3B8' }}>
              B2B Industrial Scrap Buying and Scrap Collection Business. We buy all types of industrial, metal, machinery, and factory scrap with transparent weighbridge procedures and instant settlement.
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              background: '#121A24',
              borderRadius: '6px',
              border: '1px solid var(--border-metal)',
              color: '#FBBF24',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}>
              ★ 35+ Years of Experience in Scrap
            </div>
          </div>

          {/* Column 2: Direct Contact */}
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '18px', fontSize: '1.05rem', letterSpacing: '0.04em' }}>
              DIRECT CONTACT
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#FFFFFF',
                  fontWeight: 600,
                }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(2, 132, 199, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={16} color="#38BDF8" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>DIRECT CALL (24×7)</div>
                  <div>{BUSINESS_INFO.phone}</div>
                </div>
              </a>

              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#FFFFFF',
                  fontWeight: 600,
                }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(37, 211, 102, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={16} color="#25D366" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>WHATSAPP ENQUIRY</div>
                  <div>{BUSINESS_INFO.whatsapp}</div>
                </div>
              </a>

              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#CBD5E1',
                }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={16} color="#F59E0B" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>EMAIL</div>
                  <div>{BUSINESS_INFO.email}</div>
                </div>
              </a>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#172230', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={16} color="#94A3B8" />
                </div>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>HEAD OFFICE &amp; YARD</div>
                  {BUSINESS_INFO.address.full}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#172230', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={16} color="#10B981" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>OPERATIONS</div>
                  <div style={{ color: '#10B981', fontWeight: 600 }}>24×7, All Days Active</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '18px', fontSize: '1.05rem', letterSpacing: '0.04em' }}>
              QUICK NAVIGATION
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li>
                <Link href="/sell-scrap" style={{ color: '#F59E0B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ArrowRight size={14} /> Sell Your Scrap Form
                </Link>
              </li>
              <li>
                <Link href="/services" style={{ color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ArrowRight size={14} color="#64748B" /> Scrap Categories
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" style={{ color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ArrowRight size={14} color="#64748B" /> How It Works (4-Step)
                </Link>
              </li>
              <li>
                <Link href="/regular-pickup" style={{ color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ArrowRight size={14} color="#64748B" /> Regular Factory Scrap Pickup
                </Link>
              </li>
              <li>
                <Link href="/areas-we-serve" style={{ color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ArrowRight size={14} color="#64748B" /> Service Coverage Map
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ArrowRight size={14} color="#64748B" /> About PANWAR ENTERPRISES
                </Link>
              </li>
              <li>
                <Link href="/contact" style={{ color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ArrowRight size={14} color="#64748B" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Primary Service Areas */}
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '18px', fontSize: '1.05rem', letterSpacing: '0.04em' }}>
              PRIMARY SERVICE AREAS
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
              {BUSINESS_INFO.serviceAreas.map((area) => (
                <Link
                  key={area.name}
                  href="/areas-we-serve"
                  style={{
                    background: '#121A24',
                    border: '1px solid var(--border-metal)',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '0.82rem',
                    color: '#E2E8F0',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#F59E0B';
                    e.currentTarget.style.color = '#F59E0B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-metal)';
                    e.currentTarget.style.color = '#E2E8F0';
                  }}
                >
                  {area.name}
                </Link>
              ))}
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: '1.5' }}>
              We also serve nearby industrial sectors in Dharuhera, Khushkhera, Tapukara, Bilaspur, and Pataudi. Contact us to confirm rapid pickup mobilization.
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Admin Access */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.82rem',
          color: '#64748B',
        }}>
          <div>
            © {new Date().getFullYear()} <strong style={{ color: '#E2E8F0' }}>PANWAR ENTERPRISES</strong>. All Rights Reserved.
            Village Tankri, Tehsil Bawal, District Rewari, Haryana.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span>B2B Industrial Scrap Procurement</span>
            <Link
              href="/admin/login"
              style={{
                color: '#64748B',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F59E0B')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
            >
              <Lock size={12} /> Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
