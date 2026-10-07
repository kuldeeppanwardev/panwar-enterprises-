import React from 'react';
import Link from 'next/link';
import {
  UploadCloud,
  Scale,
  TrendingUp,
  Truck,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Building,
  ArrowRight,
} from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';

export const metadata = {
  title: 'How It Works | 4-Step Industrial Scrap Selling Process',
  description:
    'Selling industrial scrap to PANWAR ENTERPRISES is simple. Upload photos, get our best quotation, schedule pickup, and receive instant settlement without visiting our office.',
};

export default function HowItWorksPage() {
  const whatsappMessage = encodeURIComponent(
    'Hello PANWAR ENTERPRISES, I would like to schedule a scrap inspection and pickup.'
  );

  return (
    <div className="industrial-bg" style={{ padding: '70px 0 100px 0' }}>
      <div className="container-narrow">
        {/* Top Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="badge badge-amber" style={{ marginBottom: '14px' }}>
            <ShieldCheck size={16} /> ZERO HASSLE SCRAP DISPOSAL
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', marginBottom: '16px' }}>
            HOW IT WORKS
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#CBD5E1', lineHeight: 1.6 }}>
            A transparent 4-step workflow designed specifically for manufacturing companies, factories, and commercial businesses.
          </p>
          <div style={{
            display: 'inline-block',
            marginTop: '14px',
            padding: '8px 20px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '9999px',
            color: '#34D399',
            fontWeight: 700,
            fontSize: '0.9rem',
          }}>
            Companies do NOT need to visit our office first!
          </div>
        </div>

        {/* 4 Steps Detailed Timeline Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '56px' }}>
          {[
            {
              step: 'STEP 1',
              title: 'Upload Scrap Photos',
              subtitle: 'Online submission or WhatsApp sharing',
              desc: 'Take snapshots or quick video clips of your scrap lot at your factory or warehouse. Use our online enquiry form or WhatsApp us directly. No physical visit required to begin.',
              points: [
                'Multiple images supported',
                'Optional video upload for large lots',
                'Instant digital transmission to our valuation team',
              ],
              icon: UploadCloud,
              color: '#38BDF8',
            },
            {
              step: 'STEP 2',
              title: 'Share Scrap Details',
              subtitle: 'Material grade, approximate weight & location',
              desc: 'Specify the material type (iron, steel, copper, machinery, automobile scrap, etc.), your estimated quantity (in kg or tons), and your factory pickup address in Haryana or NCR.',
              points: [
                'Flexible units (KG, TON, PIECE)',
                'Indicate crane or hydra requirements',
                'Specify preferred pickup date and time slots',
              ],
              icon: Scale,
              color: '#FBBF24',
            },
            {
              step: 'STEP 3',
              title: 'Get Our Best Price',
              subtitle: 'Direct quotation based on live market rates',
              desc: 'Our team examines the materials and current commodity indices. We provide you with a competitive, clear per-unit quotation with zero hidden charges or unnecessary deductions.',
              points: [
                'Transparent market-indexed pricing',
                'Written quotation via WhatsApp / phone',
                'On-site inspection dispatched if high-tonnage lot',
              ],
              icon: TrendingUp,
              color: '#F59E0B',
            },
            {
              step: 'STEP 4',
              title: 'Schedule Pickup & Instant Payment',
              subtitle: 'Logistics mobilization & certified weighbridge slips',
              desc: 'Upon quotation acceptance, our commercial transport and loading labor arrive at your facility. Materials are weighed on computer weighbridges with immediate payment release.',
              points: [
                'Commercial trucks and hydra cranes dispatched',
                'Certified weighbridge slips provided',
                'Immediate RTGS / NEFT / digital account settlement',
              ],
              icon: Truck,
              color: '#10B981',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="metal-card"
              style={{
                borderLeft: `5px solid ${item.color}`,
                padding: '36px 32px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '0.9rem',
                  color: item.color,
                  letterSpacing: '0.1em',
                }}>
                  {item.step}
                </span>

                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color,
                }}>
                  <item.icon size={22} />
                </div>
              </div>

              <h2 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '4px' }}>
                {item.title}
              </h2>
              <div style={{ fontSize: '0.85rem', color: '#F59E0B', fontWeight: 600, marginBottom: '16px' }}>
                {item.subtitle}
              </div>

              <p style={{ fontSize: '1rem', color: '#CBD5E1', lineHeight: 1.65, marginBottom: '20px' }}>
                {item.desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {item.points.map((pt, pIdx) => (
                  <div key={pIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#94A3B8' }}>
                    <CheckCircle2 size={16} color={item.color} />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1A283A 0%, #0F1622 100%)',
          border: '1px solid var(--border-metal)',
          borderRadius: '18px',
          padding: '40px 32px',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '12px' }}>
            Ready to Begin? Upload Your Scrap Photos Today
          </h3>
          <p style={{ color: '#CBD5E1', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 28px auto' }}>
            Our valuation team is active 24×7. Start now and experience 35+ years of trusted scrap procurement.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/sell-scrap" className="btn btn-primary btn-lg">
              <UploadCloud size={20} />
              UPLOAD YOUR SCRAP
            </Link>
            <a href={`tel:${BUSINESS_INFO.phone}`} className="btn btn-call btn-lg">
              <Phone size={18} />
              CALL: {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
