import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Scale,
  UploadCloud,
  Phone,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Factory,
} from 'lucide-react';
import { BUSINESS_INFO, SCRAP_CATEGORIES, TARGET_INDUSTRIES } from '@/lib/constants';

export const metadata = {
  title: 'Scrap Categories & Materials We Buy',
  description:
    'PANWAR ENTERPRISES buys all types of industrial scrap: Iron, Steel, Aluminium, Copper, Brass, Machinery, Automobile, Factory, and Warehouse scrap across Haryana & NCR.',
};

export default function ServicesPage() {
  const whatsappMessage = encodeURIComponent(
    'Hello PANWAR ENTERPRISES, I want to sell industrial scrap. Please share current rates and procedure.'
  );

  return (
    <div className="industrial-bg" style={{ padding: '70px 0 100px 0' }}>
      <div className="container">
        {/* Page Top Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 56px auto' }}>
          <div className="badge badge-amber" style={{ marginBottom: '14px' }}>
            <Scale size={16} /> COMPREHENSIVE INDUSTRIAL PROCUREMENT
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', marginBottom: '16px' }}>
            SCRAP MATERIALS &amp; CATEGORIES WE BUY
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#CBD5E1', lineHeight: 1.6 }}>
            <strong>PANWAR ENTERPRISES buys all types of scrap materials</strong> from companies, factories, warehouses, and industrial plants across Rewari, Bawal, Manesar, Gurugram, Neemrana and nearby industrial areas.
          </p>
        </div>

        {/* Detailed Categories Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
          marginBottom: '56px',
        }}>
          {SCRAP_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="metal-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '32px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span className="badge badge-amber">{cat.tag}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Verified Commercial Grade</span>
                </div>

                <h2 style={{ fontSize: '1.45rem', color: '#FFFFFF', marginBottom: '10px' }}>
                  {cat.name}
                </h2>

                <p style={{ fontSize: '0.95rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '20px' }}>
                  {cat.description}
                </p>

                <div style={{
                  background: '#0B1119',
                  border: '1px solid var(--border-metal)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  fontSize: '0.82rem',
                  color: '#94A3B8',
                  marginBottom: '20px',
                }}>
                  <strong style={{ color: '#E2E8F0' }}>Typical Industries:</strong> {cat.typicalSources}
                </div>
              </div>

              <div style={{
                paddingTop: '18px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 600 }}>
                  ✓ Instant Weighbridge Settlement
                </span>

                <Link
                  href={`/sell-scrap?scrapType=${encodeURIComponent(cat.name)}`}
                  className="btn btn-primary btn-sm"
                >
                  Sell This Scrap <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Special Custom Material Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1A283A 0%, #101925 100%)',
          border: '2px solid #F59E0B',
          borderRadius: '20px',
          padding: '48px 36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '64px',
        }}>
          <div style={{ maxWidth: '720px' }}>
            <div className="badge badge-amber" style={{ marginBottom: '10px' }}>
              CUSTOM INDUSTRIAL LOTS
            </div>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.8rem', marginBottom: '10px' }}>
              Don't see your scrap type? Send us a photo and we will evaluate it.
            </h3>
            <p style={{ color: '#CBD5E1', fontSize: '1rem', lineHeight: 1.6 }}>
              Whether you have mixed fabrication remnants, tooling dies, plant dismantling lots, decommissioned substations, or specialty alloys, our experienced team provides prompt valuation.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/sell-scrap" className="btn btn-primary btn-lg">
              <UploadCloud size={20} />
              UPLOAD SCRAP PHOTO
            </Link>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <MessageSquare size={20} />
              WHATSAPP US
            </a>
          </div>
        </div>

        {/* Industry Focus List */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2>SECTORS WE WORK WITH</h2>
            <p style={{ color: '#94A3B8', marginTop: '8px' }}>
              Comprehensive scrap disposal partnerships tailored for industrial facilities.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '18px',
          }}>
            {TARGET_INDUSTRIES.map((ind, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-metal)',
                  borderRadius: '12px',
                  padding: '22px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                }}
              >
                <div style={{
                  color: '#F59E0B',
                  background: 'rgba(245, 158, 11, 0.1)',
                  padding: '8px',
                  borderRadius: '6px',
                }}>
                  <Factory size={20} />
                </div>
                <div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '4px' }}>{ind.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
