import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  UploadCloud,
  Phone,
  MessageSquare,
  ShieldCheck,
  Clock,
  Truck,
  TrendingUp,
  Layers,
  ArrowRight,
  CheckCircle2,
  Factory,
  Scale,
  Award,
  ChevronRight,
  MapPin,
  Calendar,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { BUSINESS_INFO, SCRAP_CATEGORIES, TARGET_INDUSTRIES } from '@/lib/constants';

export default function HomePage() {
  const whatsappMessage = encodeURIComponent(
    'Hello PANWAR ENTERPRISES, I have industrial scrap available. I would like to share the scrap details and get the best price.'
  );

  return (
    <div className="industrial-bg">
      {/* ========================================================
          1. HERO SECTION
          ======================================================== */}
      <section style={{
        position: 'relative',
        paddingTop: '80px',
        paddingBottom: '90px',
        borderBottom: '1px solid var(--border-metal)',
        overflow: 'hidden',
      }}>
        {/* Ambient industrial backlights */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(2, 132, 199, 0.05) 50%, transparent 80%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Top highlight badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <div className="badge badge-amber" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
              <ShieldCheck size={16} />
              <span>35+ YEARS OF EXPERIENCE IN INDUSTRIAL SCRAP BUYING</span>
            </div>
          </div>

          {/* Main Hero Headline */}
          <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '20px',
              textTransform: 'uppercase',
            }}>
              TURN YOUR <span style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #F59E0B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>INDUSTRIAL SCRAP</span> INTO VALUE
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              color: '#CBD5E1',
              maxWidth: '820px',
              margin: '0 auto 32px auto',
              lineHeight: 1.6,
            }}>
              <strong>PANWAR ENTERPRISES</strong> buys all types of industrial scrap and provides reliable scrap pickup with competitive market prices across Haryana &amp; NCR manufacturing hubs.
            </p>

            {/* Service Location Tagline */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              background: 'rgba(23, 33, 45, 0.8)',
              border: '1px solid var(--border-metal)',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              color: '#94A3B8',
              marginBottom: '40px',
            }}>
              <MapPin size={16} color="#F59E0B" />
              <span>
                Serving <strong>Gurugram</strong> • <strong>Manesar</strong> • <strong>Bawal</strong> • <strong>Neemrana</strong> • <strong>Rewari</strong> &amp; Nearby Industrial Areas
              </span>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '36px',
            }}>
              <Link href="/sell-scrap" className="btn btn-primary btn-lg" style={{ minWidth: '240px' }}>
                <UploadCloud size={20} />
                <span>UPLOAD YOUR SCRAP</span>
              </Link>

              <Link href="/sell-scrap" className="btn btn-secondary btn-lg" style={{ minWidth: '200px' }}>
                <TrendingUp size={19} color="#F59E0B" />
                <span>GET BEST PRICE</span>
              </Link>
            </div>

            {/* Direct Instant Action Pills */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap',
              fontSize: '0.95rem',
            }}>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="btn btn-call btn-sm"
                style={{ padding: '10px 20px' }}
              >
                <Phone size={16} />
                CALL NOW: {BUSINESS_INFO.phone}
              </a>

              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
                style={{ padding: '10px 20px' }}
              >
                <MessageSquare size={16} />
                WHATSAPP US (24×7)
              </a>
            </div>
          </div>

          {/* Core Value Quick Strip */}
          <div style={{
            marginTop: '56px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
          }}>
            {[
              { title: 'We Buy All Scrap', desc: 'Iron, steel, copper, machinery & factory waste', icon: Scale },
              { title: 'Fast Company Pickup', desc: 'Commercial trucks & crane logistics at your yard', icon: Truck },
              { title: 'Upload Photos Online', desc: 'Instant quotation without mandatory office visits', icon: UploadCloud },
              { title: 'Competitive Market Rates', desc: 'Highest transparent valuation per current market', icon: TrendingUp },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(18, 26, 38, 0.7)',
                  border: '1px solid var(--border-metal)',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                }}
              >
                <div style={{
                  background: 'rgba(245, 158, 11, 0.12)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '8px',
                  padding: '10px',
                  color: '#F59E0B',
                  flexShrink: 0,
                }}>
                  <item.icon size={20} />
                </div>
                <div>
                  <div style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '0.95rem' }}>{item.title}</div>
                  <div style={{ color: '#94A3B8', fontSize: '0.82rem', marginTop: '2px' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          2. TRUST SECTION / KEY STATISTICS
          ======================================================== */}
      <section style={{
        padding: '60px 0',
        background: '#0B1017',
        borderBottom: '1px solid var(--border-metal)',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
          }}>
            <div className="stat-card">
              <div className="stat-number">35+</div>
              <div className="stat-label">Years Experience</div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '6px' }}>
                Three and a half decades in scrap procurement
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-number" style={{ color: '#10B981' }}>24×7</div>
              <div className="stat-label">Service Availability</div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '6px' }}>
                All days active for industrial operations
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-number" style={{ color: '#38BDF8' }}>ALL</div>
              <div className="stat-label">Types of Scrap</div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '6px' }}>
                Ferrous, non-ferrous, machinery &amp; mixed
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-number" style={{ color: '#FBBF24' }}>FAST</div>
              <div className="stat-label">Scrap Pickup</div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '6px' }}>
                Direct heavy vehicle mobilization
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-number" style={{ color: '#F59E0B' }}>BEST</div>
              <div className="stat-label">Market Prices</div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '6px' }}>
                Competitive, transparent weighbridge billing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. HOW IT WORKS (4-STEP SIMPLE VISUAL PROCESS)
          ======================================================== */}
      <section style={{
        padding: '90px 0',
        borderBottom: '1px solid var(--border-metal)',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 56px auto' }}>
            <div className="badge badge-amber" style={{ marginBottom: '12px' }}>
              SIMPLE 4-STEP PROCEDURE
            </div>
            <h2>HOW IT WORKS</h2>
            <p style={{ fontSize: '1.05rem', color: '#CBD5E1', marginTop: '12px' }}>
              Selling company scrap is effortless. <strong>Companies do NOT need to visit our office first</strong>. Everything begins with simple photos and details right from your factory or warehouse.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            position: 'relative',
          }}>
            {[
              {
                step: 'STEP 1',
                title: 'Upload Scrap Photos',
                desc: 'Take quick photos or short video clips of your scrap lot and upload them via our website or WhatsApp.',
                icon: UploadCloud,
                color: '#38BDF8',
              },
              {
                step: 'STEP 2',
                title: 'Share Scrap Details',
                desc: 'Specify the material type, approximate weight (kg or tons), and your factory or warehouse location.',
                icon: Scale,
                color: '#FBBF24',
              },
              {
                step: 'STEP 3',
                title: 'Get Our Best Price',
                desc: 'Our team evaluates the material grade and provides you with the most competitive market rate quote.',
                icon: TrendingUp,
                color: '#F59E0B',
              },
              {
                step: 'STEP 4',
                title: 'Schedule Pickup',
                desc: 'Confirm the quotation. We dispatch commercial transport with crane loading and complete weighbridge payment.',
                icon: Truck,
                color: '#10B981',
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="metal-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `3px solid ${s.color}`,
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      color: s.color,
                      letterSpacing: '0.1em',
                    }}>
                      {s.step}
                    </span>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: s.color,
                    }}>
                      <s.icon size={22} />
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.6 }}>{s.desc}</p>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={14} color="#10B981" /> 100% On-Site Evaluation
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/sell-scrap" className="btn btn-primary btn-lg">
              START NOW: UPLOAD YOUR SCRAP
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. SCRAP CATEGORIES SECTION
          ======================================================== */}
      <section style={{
        padding: '90px 0',
        background: '#0B1017',
        borderBottom: '1px solid var(--border-metal)',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '48px',
          }}>
            <div>
              <div className="badge badge-amber" style={{ marginBottom: '12px' }}>
                ALL INDUSTRIAL GRADES ACCEPTED
              </div>
              <h2>SCRAP CATEGORIES WE BUY</h2>
              <p style={{ fontSize: '1.05rem', color: '#CBD5E1', maxWidth: '650px', marginTop: '8px' }}>
                We purchase all categories of recyclable industrial scrap directly from manufacturing units, plants, and workshops.
              </p>
            </div>

            <Link href="/services" className="btn btn-outline">
              VIEW ALL DETAILS &rarr;
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            {SCRAP_CATEGORIES.map((cat) => (
              <div key={cat.id} className="metal-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span className="badge badge-steel" style={{ fontSize: '0.72rem' }}>{cat.tag}</span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
                  </div>

                  <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '8px' }}>
                    {cat.name}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: '16px', lineHeight: 1.55 }}>
                    {cat.description}
                  </p>
                </div>

                <div style={{
                  paddingTop: '14px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                    {cat.typicalSources.split(',')[0]}
                  </span>
                  <Link
                    href={`/sell-scrap?scrapType=${encodeURIComponent(cat.name)}`}
                    style={{
                      fontSize: '0.82rem',
                      color: '#F59E0B',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    Sell This <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Special "Don't see your scrap type?" Prompt */}
          <div style={{
            marginTop: '44px',
            background: 'linear-gradient(135deg, #172230 0%, #101824 100%)',
            border: '1.5px dashed #F59E0B',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
          }}>
            <div style={{ maxWidth: '680px' }}>
              <div style={{ color: '#FBBF24', fontWeight: 800, fontSize: '1.2rem', marginBottom: '6px' }}>
                Don't see your scrap type? Send us a photo and we will evaluate it.
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '0.95rem' }}>
                PANWAR ENTERPRISES buys all types of scrap materials. Whether you have mixed metal, plant demolition debris, specialized tooling alloy, or industrial plastics, send a quick snapshot.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/sell-scrap" className="btn btn-primary">
                <UploadCloud size={18} />
                UPLOAD SCRAP PHOTO
              </Link>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent('Hello PANWAR ENTERPRISES, I have custom industrial scrap not listed on your website. Sharing details for quotation.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageSquare size={18} />
                SEND ON WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. INDUSTRIAL SCRAP BUYING (TARGET SECTORS)
          ======================================================== */}
      <section style={{
        padding: '90px 0',
        borderBottom: '1px solid var(--border-metal)',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 56px auto' }}>
            <div className="badge badge-amber" style={{ marginBottom: '12px' }}>
              B2B CLIENTELE FOCUS
            </div>
            <h2>WHO WE BUY INDUSTRIAL SCRAP FROM</h2>
            <p style={{ fontSize: '1.05rem', color: '#CBD5E1', marginTop: '12px' }}>
              We work directly with plant heads, factory procurement managers, logistics heads, and business owners across all manufacturing sectors.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}>
            {TARGET_INDUSTRIES.map((ind, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-metal)',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'rgba(245, 158, 11, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F59E0B',
                  flexShrink: 0,
                }}>
                  <Factory size={20} />
                </div>
                <div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '4px' }}>{ind.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.5 }}>{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          6. COMPANY SCRAP ENQUIRY SECTION (CRITICAL CTA)
          ======================================================== */}
      <section style={{
        padding: '90px 0',
        background: 'linear-gradient(180deg, #090D12 0%, #111A26 50%, #090D12 100%)',
        borderBottom: '1px solid var(--border-metal)',
        position: 'relative',
      }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #1B293A 0%, #101824 100%)',
            border: '2px solid #F59E0B',
            borderRadius: '24px',
            padding: '60px 40px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.15)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Subtle corner graphic */}
            <div style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div className="badge badge-amber" style={{ marginBottom: '18px', padding: '8px 20px', fontSize: '0.85rem' }}>
              DIRECT B2B PROCUREMENT CHANNEL
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}>
              HAVE SCRAP AT YOUR COMPANY?
            </h2>

            <p style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
              color: '#CBD5E1',
              maxWidth: '780px',
              margin: '0 auto 36px auto',
              lineHeight: 1.6,
            }}>
              Send us photos and basic details. Our team will review your scrap and contact you with the best possible price.
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '18px',
              flexWrap: 'wrap',
            }}>
              <Link href="/sell-scrap" className="btn btn-primary btn-lg" style={{ minWidth: '260px' }}>
                <UploadCloud size={20} />
                <span>UPLOAD YOUR SCRAP</span>
              </Link>

              <a href={`tel:${BUSINESS_INFO.phone}`} className="btn btn-call btn-lg" style={{ minWidth: '220px' }}>
                <Phone size={18} />
                <span>CALL: {BUSINESS_INFO.phone}</span>
              </a>

              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageSquare size={18} />
                <span>WHATSAPP US</span>
              </a>
            </div>

            <div style={{
              marginTop: '32px',
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
              flexWrap: 'wrap',
              fontSize: '0.85rem',
              color: '#94A3B8',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={15} color="#10B981" /> No Mandatory Office Visits
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={15} color="#10B981" /> Instant Quotation Review
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={15} color="#10B981" /> On-Site Weighbridge &amp; Crane Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. REGULAR INDUSTRIAL SCRAP COLLECTION SECTION
          ======================================================== */}
      <section style={{
        padding: '90px 0',
        borderBottom: '1px solid var(--border-metal)',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}>
            <div>
              <div className="badge badge-amber" style={{ marginBottom: '14px' }}>
                CONTRACT &amp; RECURRING DISPOSAL
              </div>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', marginBottom: '18px' }}>
                REGULAR INDUSTRIAL SCRAP?
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#CBD5E1', lineHeight: 1.7, marginBottom: '24px' }}>
                If your company generates scrap regularly, contact <strong>PANWAR ENTERPRISES</strong> for a reliable recurring scrap collection arrangement.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                {[
                  'Scheduled weekly, bi-weekly or monthly collection routines',
                  'Dedicated container bins placed at your factory floor if required',
                  'Fixed commercial agreements with transparent price indexing',
                  'Priority dispatch of cranes, hydra, and transport vehicles',
                  'Immediate weighbridge verification and direct account settlement',
                ].map((text, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ color: '#F59E0B', marginTop: '2px' }}>
                      <CheckCircle2 size={18} />
                    </div>
                    <span style={{ color: '#E2E8F0', fontSize: '0.95rem' }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/regular-pickup" className="btn btn-primary">
                  DISCUSS REGULAR PICKUP &rarr;
                </Link>
                <a href={`tel:${BUSINESS_INFO.phone}`} className="btn btn-outline">
                  <Phone size={16} /> Direct Call: {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>

            {/* Quick Regular Collection Feature Card */}
            <div className="metal-card" style={{ padding: '36px', borderLeft: '4px solid #F59E0B' }}>
              <div style={{
                fontSize: '0.85rem',
                color: '#F59E0B',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}>
                Long-Term B2B Scrap Contracts
              </div>
              <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '14px' }}>
                Zero Hassle Plant Yard Clearance
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
                Large automotive ancillaries, fabrication plants, and manufacturing units in IMT Manesar, Bawal, and Neemrana rely on us to keep their shop floors clean and code-compliant.
              </p>

              <div style={{
                background: '#0D141E',
                borderRadius: '10px',
                padding: '20px',
                border: '1px solid var(--border-metal)',
                fontSize: '0.88rem',
              }}>
                <div style={{ color: '#CBD5E1', marginBottom: '8px' }}>
                  <strong>How regular pickup works:</strong>
                </div>
                <div style={{ color: '#94A3B8', lineHeight: 1.5 }}>
                  1. Assessment of monthly generation volume<br />
                  2. Agreed pickup schedule and bin allocation<br />
                  3. Dedicated driver &amp; transport on designated days<br />
                  4. Automated slip records and instant settlement
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. WHY PANWAR ENTERPRISES
          ======================================================== */}
      <section style={{
        padding: '90px 0',
        background: '#0B1017',
        borderBottom: '1px solid var(--border-metal)',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 56px auto' }}>
            <div className="badge badge-amber" style={{ marginBottom: '12px' }}>
              THE PANWAR ADVANTAGE
            </div>
            <h2>WHY PANWAR ENTERPRISES</h2>
            <p style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#F59E0B',
              marginTop: '10px',
              letterSpacing: '0.02em',
            }}>
              "Your Scrap. Our Responsibility."
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {[
              {
                title: '35+ Years of Experience',
                desc: 'Over three decades of established expertise in scrap valuation, metal recycling, and industrial disposal.',
                icon: Award,
              },
              {
                title: 'Competitive Market Prices',
                desc: 'We monitor daily metal market benchmarks to ensure your company obtains the best possible return on scrap.',
                icon: TrendingUp,
              },
              {
                title: '24×7 Availability',
                desc: 'Industrial plants operate non-stop. Our logistics and customer support are active 24 hours a day, 7 days a week.',
                icon: Clock,
              },
              {
                title: 'Industrial Scrap Collection',
                desc: 'Heavy-duty fleet of transport trucks, hydra cranes, and trained labor to lift any scale of machinery or scrap.',
                icon: Truck,
              },
              {
                title: 'Fast Scrap Pickup',
                desc: 'Rapid scheduling upon quotation approval, ensuring your factory yards and warehouses remain clear.',
                icon: Sparkles,
              },
              {
                title: 'Easy Enquiry Process',
                desc: 'No tedious bureaucracy. Upload pictures online or send via WhatsApp to initiate evaluation immediately.',
                icon: UploadCloud,
              },
              {
                title: 'Direct Communication',
                desc: 'Direct line to decision makers with zero middlemen or hidden commissions. Transparent and honest discussions.',
                icon: MessageSquare,
              },
              {
                title: 'Reliable Service',
                desc: 'Certified computer weighbridge slips, prompt payment release, and long-standing corporate relationships.',
                icon: ShieldCheck,
              },
            ].map((card, idx) => (
              <div key={idx} className="metal-card" style={{ padding: '28px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F59E0B',
                  marginBottom: '18px',
                }}>
                  <card.icon size={22} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#FFFFFF' }}>{card.title}</h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          9. SERVICE AREAS
          ======================================================== */}
      <section style={{
        padding: '90px 0',
        borderBottom: '1px solid var(--border-metal)',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 56px auto' }}>
            <div className="badge badge-amber" style={{ marginBottom: '12px' }}>
              SERVICE FOOTPRINT
            </div>
            <h2>AREAS WE SERVE</h2>
            <p style={{ fontSize: '1.05rem', color: '#CBD5E1', marginTop: '12px' }}>
              We provide rapid pickup mobilization across major industrial clusters in Haryana and the Rajasthan border corridor.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}>
            {BUSINESS_INFO.serviceAreas.map((area, idx) => (
              <div
                key={idx}
                className="metal-card"
                style={{
                  textAlign: 'center',
                  padding: '28px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'rgba(245, 158, 11, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F59E0B',
                  marginBottom: '14px',
                }}>
                  <MapPin size={22} />
                </div>
                <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '8px' }}>{area.name}</h3>
                <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5 }}>{area.desc}</p>
              </div>
            ))}
          </div>

          <div style={{
            background: '#101722',
            border: '1px solid var(--border-metal)',
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center',
            maxWidth: '860px',
            margin: '0 auto',
            fontSize: '0.92rem',
            color: '#CBD5E1',
          }}>
            <p>
              We also serve nearby industrial areas including <strong>Dharuhera, Khushkhera, Tapukara, Bilaspur, Pataudi</strong>, and surrounding engineering belts.
            </p>
            <div style={{ marginTop: '14px', color: '#94A3B8', fontSize: '0.85rem' }}>
              Contact us to confirm pickup availability and crane dispatch at your location.
            </div>
            <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a href={`tel:${BUSINESS_INFO.phone}`} className="btn btn-call btn-sm">
                <Phone size={14} /> Call: {BUSINESS_INFO.phone}
              </a>
              <Link href="/contact" className="btn btn-secondary btn-sm">
                View Contact Info &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          10. FINAL ACTION BANNER
          ======================================================== */}
      <section style={{
        padding: '70px 0',
        background: '#090D12',
      }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #1B293A 0%, #0F1622 100%)',
            border: '1px solid #2B3D52',
            borderRadius: '20px',
            padding: '48px 36px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
          }}>
            <div>
              <div style={{ color: '#F59E0B', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                READY TO SELL COMPANY SCRAP?
              </div>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.8rem', marginBottom: '8px' }}>
                Upload Your Scrap Photos Now
              </h3>
              <p style={{ color: '#CBD5E1', fontSize: '0.95rem', maxWidth: '620px' }}>
                Get our competitive quotation today. Fast pickup, computer weighbridge slips, and instant payments.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
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
      </section>
    </div>
  );
}
