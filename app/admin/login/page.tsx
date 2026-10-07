'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, User, KeyRound, ShieldAlert, ArrowRight, Factory } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="industrial-bg" style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #1E2B3C 0%, #101722 100%)',
            border: '1.5px solid #F59E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            boxShadow: '0 8px 24px rgba(245, 158, 11, 0.2)',
          }}>
            <Lock size={26} color="#F59E0B" />
          </div>

          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '0.04em',
          }}>
            PANWAR <span style={{ color: '#F59E0B' }}>ENTERPRISES</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '4px' }}>
            Business Management &amp; Admin Dashboard
          </div>
        </div>

        {/* Login Card */}
        <div className="metal-card" style={{ padding: '36px 30px' }}>
          {errorMsg && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '8px',
              padding: '12px 14px',
              color: '#FCA5A5',
              fontSize: '0.88rem',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <ShieldAlert size={18} color="#EF4444" style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                <User size={15} color="#94A3B8" />
                <span>Admin Username</span>
              </label>
              <input
                id="username"
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: '28px' }}>
              <label className="form-label" htmlFor="password">
                <KeyRound size={15} color="#94A3B8" />
                <span>Password</span>
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="form-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'AUTHENTICATING...' : 'SECURE LOGIN'}
            </button>
          </form>

          <div style={{
            marginTop: '24px',
            paddingTop: '18px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            fontSize: '0.8rem',
            color: '#64748B',
            textAlign: 'center',
          }}>
            <div>Default Admin: <code style={{ color: '#F59E0B' }}>admin</code> / <code style={{ color: '#F59E0B' }}>Panwar@2026</code></div>
            <div style={{ marginTop: '8px' }}>
              <Link href="/" style={{ color: '#94A3B8', textDecoration: 'underline' }}>
                &larr; Back to Public Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
