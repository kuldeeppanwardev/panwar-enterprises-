'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, MessageSquare, Menu, X, ArrowRight, ShieldCheck, Factory } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Sell Scrap', href: '/sell-scrap' },
    { label: 'Categories', href: '/services' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Areas We Serve', href: '/areas-we-serve' },
    { label: 'Regular Pickup', href: '/regular-pickup' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const whatsappMessage = encodeURIComponent(
    'Hello PANWAR ENTERPRISES, I have industrial scrap available. I would like to share the scrap details and get the best price.'
  );

  return (
    <>
      {/* Top Industrial Notice Bar */}
      <div style={{
        background: '#070A0E',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '6px 0',
        fontSize: '0.8rem',
        color: '#94A3B8',
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#FBBF24', fontWeight: 600 }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }}></span>
              35+ Years of Industrial Scrap Buying Experience
            </span>
            <span style={{ display: 'none', md: 'inline', color: '#475569' }}>|</span>
            <span style={{ display: 'none', md: 'inline' }}>
              Serving Gurugram • Manesar • Bawal • Neemrana • Rewari
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <span style={{ color: '#E2E8F0', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#10B981', fontWeight: 700 }}>24×7</span> Pickup Availability
            </span>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              style={{
                color: '#F8FAFC',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Phone size={13} color="#F59E0B" />
              {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 90,
          background: isScrolled ? 'rgba(9, 13, 18, 0.94)' : 'rgba(9, 13, 18, 0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-metal)',
          transition: 'all 0.25s ease',
        }}
      >
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '76px',
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              background: 'linear-gradient(135deg, #1A2634 0%, #0F1620 100%)',
              border: '1.5px solid #F59E0B',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)',
            }}>
              <Factory size={22} color="#F59E0B" />
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '1.25rem',
                letterSpacing: '0.04em',
                lineHeight: 1.1,
                color: '#FFFFFF',
              }}>
                PANWAR <span style={{ color: '#F59E0B' }}>ENTERPRISES</span>
              </div>
              <div style={{
                fontSize: '0.68rem',
                letterSpacing: '0.14em',
                fontWeight: 600,
                color: '#94A3B8',
                textTransform: 'uppercase',
              }}>
                Industrial Scrap Solutions
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }} className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: isActive ? '#F59E0B' : '#CBD5E1',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 700 : 500,
                    transition: 'color 0.2s ease',
                    position: 'relative',
                    padding: '6px 0',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#CBD5E1';
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: '#F59E0B',
                      borderRadius: '2px',
                    }} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm desktop-only"
              title="WhatsApp PANWAR ENTERPRISES"
              style={{ display: 'inline-flex' }}
            >
              <MessageSquare size={16} />
              WhatsApp Us
            </a>

            <Link
              href="/sell-scrap"
              className="btn btn-primary"
              style={{
                padding: '10px 20px',
                fontSize: '0.88rem',
              }}
            >
              UPLOAD YOUR SCRAP
              <ArrowRight size={16} />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger"
              style={{
                display: 'none',
                background: 'transparent',
                border: '1px solid var(--border-metal)',
                borderRadius: '8px',
                padding: '8px',
                color: '#FFFFFF',
                cursor: 'pointer',
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '76px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(9, 13, 18, 0.98)',
          zIndex: 89,
          padding: '24px 20px',
          overflowY: 'auto',
          borderBottom: '1px solid var(--border-metal)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: pathname === link.href ? '#F59E0B' : '#E2E8F0',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {link.label}
                <ArrowRight size={16} color="#64748B" />
              </Link>
            ))}

            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link
                href="/sell-scrap"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                UPLOAD YOUR SCRAP
              </Link>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="btn btn-call"
                style={{ width: '100%' }}
              >
                <Phone size={16} />
                CALL NOW: {BUSINESS_INFO.phone}
              </a>

              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%' }}
              >
                <MessageSquare size={16} />
                WHATSAPP US
              </a>
            </div>

            <div style={{
              marginTop: '20px',
              padding: '16px',
              background: '#121A24',
              borderRadius: '8px',
              border: '1px solid var(--border-metal)',
              fontSize: '0.85rem',
              color: '#94A3B8',
            }}>
              <div style={{ color: '#F8FAFC', fontWeight: 700, marginBottom: '4px' }}>
                PANWAR ENTERPRISES
              </div>
              <div>Village Tankri, Tehsil Bawal, District Rewari, Haryana</div>
              <div style={{ marginTop: '8px', color: '#10B981', fontWeight: 600 }}>
                24×7 Scrap Buying &amp; Pickup Service
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 980px) {
          :global(.desktop-nav) {
            display: none !important;
          }
          :global(.desktop-only) {
            display: none !important;
          }
          :global(.mobile-hamburger) {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
}
