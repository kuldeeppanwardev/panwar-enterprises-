import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, MessageSquare, ShieldCheck, Truck, CheckCircle2, Factory } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';

export const metadata = {
  title: 'Areas We Serve | Industrial Scrap Pickup Haryana & NCR',
  description:
    'PANWAR ENTERPRISES provides rapid industrial scrap buying and pickup across Gurugram, Manesar, Bawal, Neemrana, Rewari and nearby industrial areas.',
};

export default function AreasWeServePage() {
  const whatsappMessage = encodeURIComponent(
    'Hello PANWAR ENTERPRISES, I would like to check scrap pickup availability for our factory location.'
  );

  const detailedAreas = [
    {
      name: 'Gurugram',
      tag: 'Major NCR Industrial Hub',
      hubs: ['Udyog Vihar (Phases 1-5)', 'Behrampur Industrial Area', 'Sector 37 Pace City 1 & 2', 'DLF Cyber & Industrial Sectors'],
      description: 'Full scrap clearance services for commercial complexes, automotive design centers, and manufacturing units across Gurugram.',
    },
    {
      name: 'Manesar',
      tag: 'Automobile & Ancillary Corridor',
      hubs: ['IMT Manesar Sectors 1 to 8', 'Roz-Ka-Meo Industrial Area', 'Maruti Ancillary Supplier Zone', 'Heavy Machine Tool Belts'],
      description: 'Extensive regular pickup contracts for automobile pressing units, stamping plants, and CNC engineering facilities.',
    },
    {
      name: 'Bawal',
      tag: 'HSIIDC Growth Centre',
      hubs: ['HSIIDC Industrial Estate Sectors 1-5', 'NH-48 Corridor Hubs', 'Plastics & Foundries Belt', 'Tankri & Local Engineering Clusters'],
      description: 'Our home territory. Rapid dispatch of commercial trucks, hydra cranes, and heavy lifting crews within minutes.',
    },
    {
      name: 'Neemrana',
      tag: 'RIICO & International Zone',
      hubs: ['RIICO Industrial Area Phase 1 & 2', 'Japanese Industrial Zone', 'EPIP Zone', 'Heavy Fabrication Plants'],
      description: 'Regular scrap collection and plant dismantling support for multinational manufacturers across the Rajasthan-Haryana border.',
    },
    {
      name: 'Rewari',
      tag: 'Historic Engineering Base',
      hubs: ['Rewari Industrial Area Phase 1 & 2', 'Rewari Bypass Commercial Belt', 'Dharuhera Industrial Corridor', 'Brass & Metal Units'],
      description: 'Continuous daily purchasing of ferrous and non-ferrous metals, sheet off-cuts, and warehouse demolition scrap.',
    },
    {
      name: 'Nearby Industrial Areas',
      tag: 'Adjacent Manufacturing Belts',
      hubs: ['Dharuhera', 'Khushkhera', 'Tapukara', 'Bilaspur Logistics Park', 'Pataudi Industrial Corridor'],
      description: 'High-frequency scrap collection for 3PL logistics warehouses, cold storages, and tier-2 supplier workshops.',
    },
  ];

  return (
    <div className="industrial-bg" style={{ padding: '70px 0 100px 0' }}>
      <div className="container">
        {/* Top Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 56px auto' }}>
          <div className="badge badge-amber" style={{ marginBottom: '14px' }}>
            <MapPin size={16} /> REGIONAL LOGISTICS &amp; MOBILIZATION
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', marginBottom: '16px' }}>
            AREAS WE SERVE
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#CBD5E1', lineHeight: 1.6 }}>
            PANWAR ENTERPRISES provides dedicated B2B scrap buying and heavy vehicle pickup across primary industrial manufacturing belts in Haryana and the NCR region.
          </p>
        </div>

        {/* Detailed Areas Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
          marginBottom: '56px',
        }}>
          {detailedAreas.map((area, idx) => (
            <div
              key={idx}
              className="metal-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '32px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span className="badge badge-steel">{area.tag}</span>
                  <MapPin size={18} color="#F59E0B" />
                </div>

                <h2 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '8px' }}>
                  {area.name}
                </h2>

                <p style={{ fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '20px' }}>
                  {area.description}
                </p>

                <div style={{
                  background: '#0B1119',
                  border: '1px solid var(--border-metal)',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '20px',
                }}>
                  <div style={{ fontSize: '0.8rem', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                    Key Industrial Hubs:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {area.hubs.map((hub, hIdx) => (
                      <li key={hIdx} style={{ fontSize: '0.85rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#F59E0B' }} />
                        {hub}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 600 }}>
                  ✓ 24×7 Rapid Transport
                </span>
                <Link
                  href={`/sell-scrap?city=${encodeURIComponent(area.name)}`}
                  className="btn btn-outline btn-sm"
                >
                  Request Pickup &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Nearby Area Explicit Statement */}
        <div style={{
          background: 'linear-gradient(135deg, #172230 0%, #101824 100%)',
          border: '1px solid var(--border-metal)',
          borderRadius: '16px',
          padding: '36px',
          textAlign: 'center',
          maxWidth: '860px',
          margin: '0 auto',
        }}>
          <h3 style={{ color: '#FFFFFF', fontSize: '1.45rem', marginBottom: '12px' }}>
            We Also Serve Nearby Industrial Areas
          </h3>
          <p style={{ color: '#CBD5E1', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
            Contact us to confirm pickup availability at your location. We deploy dedicated transport vehicles, hydra cranes, and trained loading labor across adjoining manufacturing clusters.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/sell-scrap" className="btn btn-primary">
              UPLOAD YOUR SCRAP
            </Link>
            <a href={`tel:${BUSINESS_INFO.phone}`} className="btn btn-call">
              <Phone size={16} />
              CALL: {BUSINESS_INFO.phone}
            </a>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageSquare size={16} />
              WHATSAPP US
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
