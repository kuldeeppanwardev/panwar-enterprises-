import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Phone, MessageSquare, MapPin, Clock, ArrowRight, CheckCircle2, Factory } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';

export const metadata = {
  title: 'About Us | 35+ Years Industrial Scrap Experience',
  description:
    'PANWAR ENTERPRISES is an experienced scrap buying and collection business based in Rewari, Haryana with over 35 years of experience serving Rewari, Bawal, Manesar, Gurugram, Neemrana and nearby industrial areas.',
};

export default function AboutPage() {
  const whatsappMessage = encodeURIComponent(
    'Hello PANWAR ENTERPRISES, I would like to enquire about your scrap buying services.'
  );

  return (
    <div className="industrial-bg" style={{ padding: '70px 0 100px 0' }}>
      <div className="container-narrow">
        {/* Page Top Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="badge badge-amber" style={{ marginBottom: '14px' }}>
            <ShieldCheck size={16} /> 35+ YEARS OF EXPERIENCE
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', marginBottom: '16px' }}>
            ABOUT PANWAR ENTERPRISES
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#CBD5E1', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            B2B Industrial Scrap Buying and Scrap Collection Business based in Rewari, Haryana.
          </p>
        </div>

        {/* Core Narrative Card */}
        <div className="metal-card" style={{ padding: '44px 36px', marginBottom: '36px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#F59E0B',
            fontWeight: 800,
            fontSize: '0.9rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '18px',
          }}>
            <Factory size={18} /> COMPANY PROFILE
          </div>

          <h2 style={{ fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '20px' }}>
            Experienced Industrial Scrap Procurement
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '1.05rem', color: '#CBD5E1', lineHeight: 1.75 }}>
            <p>
              <strong>PANWAR ENTERPRISES</strong> is an experienced scrap buying and collection business based in Rewari, Haryana.
            </p>
            <p>
              With more than <strong>35 years of experience</strong> in the scrap field, we work with companies and industrial businesses to purchase and collect different types of scrap materials.
            </p>
            <p>
              Our primary objective is to provide manufacturing plants, engineering workshops, automotive ancillaries, and warehousing units with a seamless, honest, and highly reliable scrap disposal partner.
            </p>
          </div>
        </div>

        {/* Core Focus Points */}
        <div className="metal-card" style={{ padding: '44px 36px', marginBottom: '36px' }}>
          <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '24px' }}>
            Our Focus Is Simple:
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              { title: 'Fair & Competitive Pricing', desc: 'Real-time market rates reflecting current commodity indices without arbitrary deductions.' },
              { title: 'Reliable Service', desc: 'Dependable transport, proper weighbridge slips, and prompt financial settlement.' },
              { title: 'Easy Communication', desc: 'Direct access to leadership via phone and WhatsApp with zero corporate bureaucracy.' },
              { title: 'Fast Pickup', desc: 'Rapid truck and crane mobilization to ensure client yards remain unencumbered.' },
              { title: 'Long-Term Business Relationships', desc: 'Focusing on multi-year trust with industrial procurement managers and factory owners.' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#0E1520',
                  border: '1px solid var(--border-metal)',
                  borderRadius: '10px',
                  padding: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#F59E0B', fontWeight: 700, fontSize: '1.05rem', marginBottom: '8px' }}>
                  <CheckCircle2 size={18} />
                  <span>{item.title}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Base & Coverage */}
        <div className="metal-card" style={{ padding: '36px', marginBottom: '44px' }}>
          <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', marginBottom: '16px' }}>
            Areas We Serve
          </h3>
          <p style={{ fontSize: '1rem', color: '#CBD5E1', lineHeight: 1.7, marginBottom: '20px' }}>
            We serve businesses across <strong>Rewari, Bawal, Manesar, Gurugram, Neemrana</strong> and nearby industrial areas including Dharuhera and regional HSIIDC / RIICO zones.
          </p>

          <div style={{
            background: '#0B1119',
            border: '1px solid var(--border-metal)',
            borderRadius: '10px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            fontSize: '0.92rem',
            color: '#94A3B8',
          }}>
            <div>
              <strong style={{ color: '#F8FAFC' }}>Physical Location:</strong> {BUSINESS_INFO.address.full}
            </div>
            <div>
              <strong style={{ color: '#F8FAFC' }}>Operating Schedule:</strong> 24×7, All Days
            </div>
            <div>
              <strong style={{ color: '#F8FAFC' }}>Direct Contact:</strong> {BUSINESS_INFO.phone}
            </div>
          </div>
        </div>

        {/* Call to Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
        }}>
          <Link href="/sell-scrap" className="btn btn-primary btn-lg">
            UPLOAD YOUR SCRAP
          </Link>
          <a href={`tel:${BUSINESS_INFO.phone}`} className="btn btn-call btn-lg">
            <Phone size={18} />
            CALL NOW: {BUSINESS_INFO.phone}
          </a>
          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-lg"
          >
            <MessageSquare size={18} />
            WHATSAPP US
          </a>
        </div>
      </div>
    </div>
  );
}
