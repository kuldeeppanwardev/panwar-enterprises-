'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Building2,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowRight,
  Clock,
  Layers,
} from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';

export default function RegularPickupPage() {
  const [form, setForm] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    location: '',
    scrapType: '',
    approximateMonthlyQuantity: '',
    pickupFrequency: 'Weekly',
    additionalRequirements: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!form.companyName.trim() || !form.contactPerson.trim() || !form.phone.trim() || !form.location.trim()) {
      setErrorMsg('Please fill in Company Name, Contact Person, Phone, and Location.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/regular-contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit request.');

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission error.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello PANWAR ENTERPRISES, our company (${form.companyName || 'Industrial unit'}) generates regular scrap and we would like to discuss a recurring collection contract.`
  );

  return (
    <div className="industrial-bg" style={{ padding: '70px 0 100px 0' }}>
      <div className="container-narrow">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="badge badge-amber" style={{ marginBottom: '14px' }}>
            <Calendar size={16} /> RECURRING INDUSTRIAL DISPOSAL
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', marginBottom: '16px' }}>
            REGULAR INDUSTRIAL SCRAP?
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#CBD5E1', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            If your company generates scrap regularly, contact <strong>PANWAR ENTERPRISES</strong> for a reliable recurring scrap collection arrangement.
          </p>
        </div>

        {/* Benefits Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
        }}>
          {[
            {
              title: 'Scheduled Fleet Mobilization',
              desc: 'Dedicated commercial trucks dispatched on fixed weekly, bi-weekly, or monthly intervals.',
              icon: Truck,
            },
            {
              title: 'On-Site Scrap Containers',
              desc: 'Heavy-duty steel bins or skips positioned directly in your factory yard for clean waste accumulation.',
              icon: Layers,
            },
            {
              title: 'Predictable Market Indexing',
              desc: 'Transparent formula-based rates aligned with official commodity indices and certified weighbridge slips.',
              icon: ShieldCheck,
            },
            {
              title: '24×7 Rapid Response',
              desc: 'Emergency lot clearances during inventory audits, maintenance shutdowns, or plant relocations.',
              icon: Clock,
            },
          ].map((item, idx) => (
            <div key={idx} className="metal-card" style={{ padding: '24px' }}>
              <div style={{
                color: '#F59E0B',
                background: 'rgba(245, 158, 11, 0.1)',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
              }}>
                <item.icon size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '6px' }}>{item.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Contract Enquiry Form */}
        <div className="metal-card" style={{ padding: '40px 32px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
              }}>
                <CheckCircle2 size={36} />
              </div>
              <h2 style={{ fontSize: '1.7rem', color: '#FFFFFF', marginBottom: '12px' }}>
                Recurring Collection Request Received!
              </h2>
              <p style={{ color: '#CBD5E1', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto 28px auto', lineHeight: 1.6 }}>
                Our commercial operations team will review your generation volume and contact you shortly to formalize schedule details and rate terms.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <a href={`tel:${BUSINESS_INFO.phone}`} className="btn btn-call">
                  <Phone size={16} />
                  Call: {BUSINESS_INFO.phone}
                </a>
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageSquare size={16} />
                  WhatsApp Direct
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#F59E0B',
                fontWeight: 800,
                fontSize: '0.95rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--border-metal)',
                paddingBottom: '10px',
                marginBottom: '24px',
              }}>
                <Building2 size={18} />
                <span>DISCUSS REGULAR SCRAP COLLECTION CONTRACT</span>
              </div>

              {errorMsg && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  color: '#FCA5A5',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <AlertCircle size={18} color="#EF4444" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                <div className="form-group">
                  <label className="form-label">
                    Company Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Haryana Machine Tools Ltd."
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Contact Person <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    required
                    value={form.contactPerson}
                    onChange={handleChange}
                    placeholder="e.g. Dinesh Kumar (Plant Head)"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Phone <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9812345678"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Location / Industrial Area <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. IMT Manesar Sector 5"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Scrap Type Generated
                  </label>
                  <input
                    type="text"
                    name="scrapType"
                    value={form.scrapType}
                    onChange={handleChange}
                    placeholder="e.g. Automobile Sheet Punchings, Cast Iron Turnings"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Approximate Monthly Quantity
                  </label>
                  <input
                    type="text"
                    name="approximateMonthlyQuantity"
                    value={form.approximateMonthlyQuantity}
                    onChange={handleChange}
                    placeholder="e.g. 20 - 30 Tons per month"
                    className="form-input"
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">
                    Pickup Frequency
                  </label>
                  <select
                    name="pickupFrequency"
                    value={form.pickupFrequency}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Daily">Daily Clearance</option>
                    <option value="Twice Weekly">Twice Weekly</option>
                    <option value="Weekly">Weekly Scheduled Pickup</option>
                    <option value="Bi-Weekly">Bi-Weekly (Every 15 Days)</option>
                    <option value="Monthly">Monthly Yard Clearance</option>
                    <option value="On-Call">On-Call (When Container Fills)</option>
                  </select>
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">
                    Additional Requirements
                  </label>
                  <textarea
                    name="additionalRequirements"
                    rows={3}
                    value={form.additionalRequirements}
                    onChange={handleChange}
                    placeholder="Describe crane loading, specific safety compliance, bin placement requirements, or contract duration preferences."
                    className="form-textarea"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '12px' }}
              >
                {submitting ? 'SUBMITTING CONTRACT INQUIRY...' : 'DISCUSS REGULAR PICKUP'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
