'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Factory,
} from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setErrorMsg('Please enter your name, phone number, and message.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message.');

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission error.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    'Hello PANWAR ENTERPRISES, I would like to get in touch regarding industrial scrap buying services.'
  );

  return (
    <div className="industrial-bg" style={{ padding: '70px 0 100px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 56px auto' }}>
          <div className="badge badge-amber" style={{ marginBottom: '14px' }}>
            <Phone size={16} /> 24×7 DIRECT COMMUNICATION
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', marginBottom: '16px' }}>
            CONTACT PANWAR ENTERPRISES
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#CBD5E1', lineHeight: 1.6 }}>
            Reach out directly for industrial scrap valuation, immediate truck dispatch, or recurring plant collection agreements.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px',
          marginBottom: '56px',
        }}>
          {/* Left Column: Official Contact Info */}
          <div className="metal-card" style={{ padding: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: '#182434',
                border: '1.5px solid #F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Factory size={20} color="#F59E0B" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.35rem', color: '#FFFFFF', lineHeight: 1.2 }}>
                  PANWAR ENTERPRISES
                </h2>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Industrial Scrap Solutions
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
              {/* Phone */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'rgba(2, 132, 199, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38BDF8',
                  flexShrink: 0,
                }}>
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>PHONE NUMBER (24×7)</div>
                  <a href={`tel:${BUSINESS_INFO.phone}`} style={{ fontSize: '1.2rem', color: '#FFFFFF', fontWeight: 700 }}>
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'rgba(37, 211, 102, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#25D366',
                  flexShrink: 0,
                }}>
                  <MessageSquare size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>WHATSAPP ENQUIRY</div>
                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '1.2rem', color: '#25D366', fontWeight: 700 }}
                  >
                    {BUSINESS_INFO.whatsapp}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F59E0B',
                  flexShrink: 0,
                }}>
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>EMAIL ADDRESS</div>
                  <a href={`mailto:${BUSINESS_INFO.email}`} style={{ fontSize: '1rem', color: '#CBD5E1' }}>
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'rgba(148, 163, 184, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#CBD5E1',
                  flexShrink: 0,
                }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>YARD &amp; OFFICE ADDRESS</div>
                  <div style={{ fontSize: '0.95rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                    {BUSINESS_INFO.address.village}<br />
                    {BUSINESS_INFO.address.tehsil}<br />
                    {BUSINESS_INFO.address.district}<br />
                    {BUSINESS_INFO.address.state}, {BUSINESS_INFO.address.country}
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10B981',
                  flexShrink: 0,
                }}>
                  <Clock size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>BUSINESS HOURS</div>
                  <div style={{ fontSize: '1.05rem', color: '#10B981', fontWeight: 700 }}>
                    {BUSINESS_INFO.hours}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick CTAs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href={`tel:${BUSINESS_INFO.phone}`} className="btn btn-call" style={{ flex: 1 }}>
                <Phone size={16} /> Call Now
              </a>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ flex: 1 }}
              >
                <MessageSquare size={16} /> WhatsApp
              </a>
              <Link href="/sell-scrap" className="btn btn-primary" style={{ width: '100%' }}>
                SEND SCRAP ENQUIRY
              </Link>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="metal-card" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '1.45rem', color: '#FFFFFF', marginBottom: '8px' }}>
              Send Direct Message
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginBottom: '24px' }}>
              Have questions about pricing, container placement, or yard assessment? Send a message directly to management.
            </p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '36px 16px' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 18px auto',
                }}>
                  <CheckCircle2 size={32} />
                </div>
                <h4 style={{ fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '10px' }}>
                  Message Sent Successfully
                </h4>
                <p style={{ color: '#CBD5E1', fontSize: '0.92rem', marginBottom: '20px' }}>
                  Thank you for reaching out. PANWAR ENTERPRISES will contact you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', phone: '', email: '', subject: '', message: '' });
                  }}
                  className="btn btn-outline btn-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errorMsg && (
                  <div style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    color: '#FCA5A5',
                    fontSize: '0.88rem',
                    marginBottom: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <AlertCircle size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">
                    Your Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="e.g. Scrap lot inspection in Manesar"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your inquiry..."
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  {submitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Google Maps Ready Location Card */}
        <div className="metal-card" style={{ padding: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
            <div>
              <div className="badge badge-amber" style={{ marginBottom: '8px' }}>
                LOGISTICS HUB LOCATION
              </div>
              <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF' }}>
                Village Tankri, Tehsil Bawal, District Rewari, Haryana
              </h3>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Tankri Bawal Rewari Haryana India')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
            >
              Open in Google Maps &rarr;
            </a>
          </div>

          <div style={{
            height: '320px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--border-metal)',
            background: '#0B1119',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Embedded interactive Google Map iframe centered on Tankri Bawal Rewari */}
            <iframe
              title="PANWAR ENTERPRISES Location Map"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodeURIComponent('Tankri, Bawal, Rewari, Haryana')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
