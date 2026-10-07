'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  Eye,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  FileText,
  Truck,
  TrendingUp,
  X,
  Calendar,
  MapPin,
  Building2,
  User,
  Scale,
  Video,
  AlertCircle,
  Plus,
  ChevronDown,
  Layers,
  ExternalLink,
  Download,
  BarChart3,
  Printer,
  History,
  Copy,
  Check,
} from 'lucide-react';
import { BUSINESS_INFO, STATUS_OPTIONS, SCRAP_CATEGORIES } from '@/lib/constants';

export default function AdminDashboardPage() {
  const router = useRouter();

  // State
  const [adminUser, setAdminUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Tab: 'enquiries' | 'contracts' | 'analytics'
  const [activeTab, setActiveTab] = useState<'enquiries' | 'contracts' | 'analytics'>('enquiries');

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    underReview: 0,
    contacted: 0,
    quotationGiven: 0,
    pickupScheduled: 0,
    completed: 0,
    cancelled: 0,
  });

  // Analytics data
  const [analytics, setAnalytics] = useState<any>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  // Enquiries & Filters
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [regularContracts, setRegularContracts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [scrapTypeFilter, setScrapTypeFilter] = useState('ALL');
  const [locationFilter, setLocationFilter] = useState('ALL');

  // Selected Detail Modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [customerHistory, setCustomerHistory] = useState<any[]>([]);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [showQuotationSlip, setShowQuotationSlip] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);

  // Quotation form state inside modal
  const [quotationForm, setQuotationForm] = useState({
    materialType: '',
    estimatedQuantity: '',
    rate: '',
    unit: 'KG',
    estimatedTotal: '',
    notes: '',
  });

  // Pickup form state inside modal
  const [pickupForm, setPickupForm] = useState({
    scheduledDate: '',
    scheduledTime: '',
    driverName: '',
    vehicleNumber: '',
    notes: '',
  });

  // Admin note form inside modal
  const [noteText, setNoteText] = useState('');
  const [updatingAction, setUpdatingAction] = useState(false);

  // Check Session
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth/me');
        const data = await res.json();
        if (!res.ok || !data.authenticated) {
          router.push('/admin/login');
          return;
        }
        setAdminUser(data.user);
      } catch {
        router.push('/admin/login');
      }
    }
    checkAuth();
  }, [router]);

  // Fetch enquiries & stats
  const fetchEnquiries = useCallback(async () => {
    setRefreshing(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (statusFilter !== 'ALL') params.set('status', statusFilter);
      if (scrapTypeFilter !== 'ALL') params.set('scrapType', scrapTypeFilter);
      if (locationFilter !== 'ALL') params.set('location', locationFilter);

      const res = await fetch(`/api/admin/enquiries?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setEnquiries(data.enquiries || []);
        setStats(data.stats || stats);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [searchQuery, statusFilter, scrapTypeFilter, locationFilter]);

  // Fetch regular contracts
  const fetchContracts = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/regular-contracts');
      const data = await res.json();
      if (res.ok) {
        setRegularContracts(data.contracts || []);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Fetch Analytics
  const fetchAnalytics = useCallback(async () => {
    setAnalyticsLoading(true);
    try {
      const res = await fetch('/api/admin/analytics');
      const data = await res.json();
      if (res.ok) {
        setAnalytics(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyticsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (adminUser) {
      fetchEnquiries();
      fetchContracts();
      fetchAnalytics();
    }
  }, [adminUser, fetchEnquiries, fetchContracts, fetchAnalytics]);

  // Fetch Single Enquiry Detail + Customer History
  const openEnquiryDetail = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`);
      const data = await res.json();
      if (res.ok && data.enquiry) {
        setSelectedEnquiry(data.enquiry);
        setCustomerHistory(data.customerHistory || []);
        // Pre-fill quotation defaults
        setQuotationForm({
          materialType: data.enquiry.scrapType || '',
          estimatedQuantity: data.enquiry.approximateQuantity
            ? `${data.enquiry.approximateQuantity} ${data.enquiry.quantityUnit}`
            : '',
          rate: '',
          unit: data.enquiry.quantityUnit === 'TON' ? 'TON' : 'KG',
          estimatedTotal: '',
          notes: '',
        });
        // Pre-fill pickup defaults
        setPickupForm({
          scheduledDate: data.enquiry.preferredPickupDate || '',
          scheduledTime: data.enquiry.preferredPickupTime || '',
          driverName: '',
          vehicleNumber: '',
          notes: '',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Change Enquiry Status
  const handleStatusChange = async (newStatus: string) => {
    if (!selectedEnquiry) return;
    setUpdatingAction(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        setSelectedEnquiry(data.enquiry);
        fetchEnquiries();
        fetchAnalytics();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingAction(false);
    }
  };

  // Create Quotation
  const handleCreateQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !quotationForm.rate || !quotationForm.estimatedTotal) return;

    setUpdatingAction(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}/quotation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quotationForm),
      });
      if (res.ok) {
        await openEnquiryDetail(selectedEnquiry.id);
        fetchEnquiries();
        fetchAnalytics();
        alert('Quotation created and added to enquiry record!');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingAction(false);
    }
  };

  // Schedule Pickup
  const handleSchedulePickup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !pickupForm.scheduledDate) return;

    setUpdatingAction(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}/pickup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pickupForm),
      });
      if (res.ok) {
        await openEnquiryDetail(selectedEnquiry.id);
        fetchEnquiries();
        fetchAnalytics();
        alert('Pickup scheduled successfully!');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingAction(false);
    }
  };

  // Add Contact Log
  const handleAddContactLog = async (method: string) => {
    if (!selectedEnquiry || !noteText.trim()) return;
    setUpdatingAction(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactMethod: method, summary: noteText }),
      });
      if (res.ok) {
        setNoteText('');
        await openEnquiryDetail(selectedEnquiry.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingAction(false);
    }
  };

  // Export CSV
  const handleExportCsv = () => {
    const url = `/api/admin/enquiries/export?status=${statusFilter}`;
    window.open(url, '_blank');
  };

  // Copy Quotation Message
  const handleCopyQuotationText = (quot: any) => {
    if (!selectedEnquiry || !quot) return;
    const text = `*PANWAR ENTERPRISES - OFFICIAL SCRAP QUOTATION*\n\n` +
      `Enquiry ID: ${selectedEnquiry.enquiryNumber}\n` +
      `Company: ${selectedEnquiry.companyName}\n` +
      `Attention: ${selectedEnquiry.contactPerson}\n` +
      `Material: ${quot.materialType}\n` +
      `Estimated Quantity: ${quot.estimatedQuantity}\n` +
      `Offered Rate: ₹${quot.rate}/${quot.unit}\n` +
      `Estimated Valuation: ₹${quot.estimatedTotal.toLocaleString('en-IN')}\n\n` +
      `Terms: Certified computer weighbridge slips. Instant RTGS/account settlement.\n` +
      `Direct Contact: ${BUSINESS_INFO.phone}\n` +
      `PANWAR ENTERPRISES • Tankri, Bawal, Rewari`;

    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2500);
  };

  // Logout
  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const getStatusBadge = (status: string) => {
    const config = STATUS_OPTIONS.find((s) => s.value === status) || {
      label: status,
      color: '#CBD5E1',
      bg: 'rgba(255, 255, 255, 0.1)',
    };
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: config.color,
          background: config.bg,
          border: `1px solid ${config.color}33`,
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: config.color }} />
        {config.label}
      </span>
    );
  };

  if (loading && !adminUser) {
    return (
      <div className="industrial-bg" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#F59E0B', fontSize: '1.2rem', fontWeight: 600 }}>Loading Management Platform...</div>
      </div>
    );
  }

  return (
    <div className="industrial-bg" style={{ minHeight: '90vh', padding: '36px 0 80px 0' }}>
      <div className="container">
        {/* Top Management Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border-metal)',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-amber">BUSINESS CONTROL HUB</span>
              <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 600 }}>● SYSTEM ACTIVE</span>
            </div>
            <h1 style={{ fontSize: '2rem', marginTop: '6px' }}>
              PANWAR ENTERPRISES <span style={{ color: '#F59E0B' }}>ADMIN</span>
            </h1>
            <p style={{ fontSize: '0.88rem', color: '#94A3B8' }}>
              Logged in as <strong>{adminUser?.name || 'Administrator'}</strong> ({adminUser?.role || 'SUPER_ADMIN'})
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => {
                fetchEnquiries();
                fetchContracts();
                fetchAnalytics();
              }}
              className="btn btn-secondary btn-sm"
              disabled={refreshing}
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>

            <button onClick={handleExportCsv} className="btn btn-primary btn-sm">
              <Download size={14} /> Export CSV
            </button>

            <Link href="/" target="_blank" className="btn btn-outline btn-sm">
              <ExternalLink size={14} /> View Website
            </Link>

            <button onClick={handleLogout} className="btn btn-outline btn-sm" style={{ color: '#EF4444', borderColor: '#EF4444' }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Enquiries vs Regular Contracts vs Analytics) */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`btn btn-sm ${activeTab === 'enquiries' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <FileText size={16} />
            <span>Company Scrap Enquiries ({stats.total})</span>
          </button>

          <button
            onClick={() => setActiveTab('contracts')}
            className={`btn btn-sm ${activeTab === 'contracts' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Calendar size={16} />
            <span>Regular Pickup Contracts ({regularContracts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`btn btn-sm ${activeTab === 'analytics' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <BarChart3 size={16} />
            <span>Enquiry Analytics &amp; Statistics</span>
          </button>
        </div>

        {/* ========================================================
            TAB 1: SCRAP ENQUIRIES MANAGEMENT
            ======================================================== */}
        {activeTab === 'enquiries' && (
          <>
            {/* Stat Cards Strip */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '14px',
              marginBottom: '32px',
            }}>
              {[
                { label: 'Total Enquiries', count: stats.total, color: '#F8FAFC' },
                { label: 'New', count: stats.new, color: '#38BDF8' },
                { label: 'Under Review', count: stats.underReview, color: '#FBBF24' },
                { label: 'Contacted', count: stats.contacted, color: '#A78BFA' },
                { label: 'Quotation Given', count: stats.quotationGiven, color: '#FB923C' },
                { label: 'Pickup Scheduled', count: stats.pickupScheduled, color: '#34D399' },
                { label: 'Completed', count: stats.completed, color: '#10B981' },
                { label: 'Cancelled', count: stats.cancelled, color: '#F87171' },
              ].map((s, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-metal)',
                    borderRadius: '10px',
                    padding: '16px 14px',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                  onClick={() => {
                    const statusVal = s.label === 'Total Enquiries' ? 'ALL' :
                      s.label === 'New' ? 'NEW' :
                      s.label === 'Under Review' ? 'UNDER_REVIEW' :
                      s.label === 'Contacted' ? 'CONTACTED' :
                      s.label === 'Quotation Given' ? 'QUOTATION_GIVEN' :
                      s.label === 'Pickup Scheduled' ? 'PICKUP_SCHEDULED' :
                      s.label === 'Completed' ? 'COMPLETED' : 'CANCELLED';
                    setStatusFilter(statusVal);
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {s.label}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.9rem',
                    fontWeight: 800,
                    color: s.color,
                    marginTop: '4px',
                    lineHeight: 1,
                  }}>
                    {s.count}
                  </div>
                </div>
              ))}
            </div>

            {/* Filter and Search Bar */}
            <div
              className="metal-card"
              style={{
                padding: '20px',
                marginBottom: '24px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', flex: '1', minWidth: '260px', position: 'relative' }}>
                <Search size={18} color="#64748B" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                <input
                  type="text"
                  placeholder="Search by Company, Phone, ID (e.g. PE-2026), Location, Material..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '42px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="form-select"
                  style={{ width: 'auto', minWidth: '150px' }}
                >
                  <option value="ALL">All Statuses</option>
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st.value} value={st.value}>{st.label}</option>
                  ))}
                </select>

                {/* Scrap Type Filter */}
                <select
                  value={scrapTypeFilter}
                  onChange={(e) => setScrapTypeFilter(e.target.value)}
                  className="form-select"
                  style={{ width: 'auto', minWidth: '150px' }}
                >
                  <option value="ALL">All Scrap Types</option>
                  <option value="Iron">Iron</option>
                  <option value="Steel">Steel</option>
                  <option value="Aluminium">Aluminium</option>
                  <option value="Copper">Copper</option>
                  <option value="Machinery">Machinery</option>
                  <option value="Automobile">Automobile</option>
                  <option value="Warehouse">Warehouse</option>
                </select>

                {/* Location Filter */}
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="form-select"
                  style={{ width: 'auto', minWidth: '140px' }}
                >
                  <option value="ALL">All Locations</option>
                  <option value="Manesar">Manesar</option>
                  <option value="Bawal">Bawal</option>
                  <option value="Gurugram">Gurugram</option>
                  <option value="Neemrana">Neemrana</option>
                  <option value="Rewari">Rewari</option>
                </select>

                <button onClick={handleExportCsv} className="btn btn-outline btn-sm" title="Download Excel/CSV sheet">
                  <Download size={14} /> Export CSV
                </button>
              </div>
            </div>

            {/* Enquiries Table */}
            <div className="metal-table-wrapper">
              <table className="metal-table">
                <thead>
                  <tr>
                    <th>Enquiry ID</th>
                    <th>Date</th>
                    <th>Company / Contact</th>
                    <th>Scrap Type</th>
                    <th>Quantity</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Quotation</th>
                    <th>Pickup Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.length === 0 ? (
                    <tr>
                      <td colSpan={10} style={{ textAlign: 'center', padding: '48px', color: '#64748B' }}>
                        No scrap enquiries found matching current filters.
                      </td>
                    </tr>
                  ) : (
                    enquiries.map((enq) => {
                      const latestQuot = enq.quotations && enq.quotations[0];
                      const latestPickup = enq.pickups && enq.pickups[0];
                      return (
                        <tr key={enq.id} style={{ cursor: 'pointer' }} onClick={() => openEnquiryDetail(enq.id)}>
                          <td>
                            <strong style={{ color: '#F59E0B', fontFamily: 'monospace' }}>
                              {enq.enquiryNumber}
                            </strong>
                          </td>
                          <td style={{ whiteSpace: 'nowrap', fontSize: '0.82rem', color: '#94A3B8' }}>
                            {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>
                          <td>
                            <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{enq.companyName}</div>
                            <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                              {enq.contactPerson} • <a href={`tel:${enq.phone}`} onClick={(e) => e.stopPropagation()} style={{ color: '#38BDF8' }}>{enq.phone}</a>
                            </div>
                          </td>
                          <td>
                            <div style={{ color: '#E2E8F0', fontWeight: 600 }}>{enq.scrapType}</div>
                            {enq.images && enq.images.length > 0 && (
                              <div style={{ fontSize: '0.75rem', color: '#F59E0B' }}>
                                📷 {enq.images.length} file(s) attached
                              </div>
                            )}
                          </td>
                          <td>
                            {enq.approximateQuantity ? (
                              <span style={{ fontWeight: 600, color: '#FFFFFF' }}>
                                {enq.approximateQuantity} {enq.quantityUnit}
                              </span>
                            ) : (
                              <span style={{ color: '#64748B' }}>To Assess</span>
                            )}
                          </td>
                          <td>
                            <div style={{ color: '#E2E8F0' }}>{enq.city || 'Regional'}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{enq.industrialArea || ''}</div>
                          </td>
                          <td>{getStatusBadge(enq.status)}</td>
                          <td>
                            {latestQuot ? (
                              <div>
                                <span style={{ color: '#10B981', fontWeight: 700 }}>
                                  ₹{latestQuot.estimatedTotal.toLocaleString('en-IN')}
                                </span>
                                <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                                  @ ₹{latestQuot.rate}/{latestQuot.unit}
                                </div>
                              </div>
                            ) : (
                              <span style={{ color: '#64748B', fontSize: '0.82rem' }}>Pending</span>
                            )}
                          </td>
                          <td>
                            {latestPickup ? (
                              <div style={{ color: '#34D399', fontSize: '0.82rem', fontWeight: 600 }}>
                                {latestPickup.scheduledDate}
                              </div>
                            ) : enq.preferredPickupDate ? (
                              <div style={{ color: '#94A3B8', fontSize: '0.82rem' }}>
                                Pref: {enq.preferredPickupDate}
                              </div>
                            ) : (
                              <span style={{ color: '#64748B', fontSize: '0.82rem' }}>—</span>
                            )}
                          </td>
                          <td>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openEnquiryDetail(enq.id);
                              }}
                              className="btn btn-outline btn-sm"
                              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                            >
                              <Eye size={13} /> View
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ========================================================
            TAB 2: REGULAR RECURRING CONTRACT REQUESTS
            ======================================================== */}
        {activeTab === 'contracts' && (
          <div className="metal-card" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '18px' }}>
              Recurring Scrap Collection Leads
            </h3>
            <div className="metal-table-wrapper">
              <table className="metal-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Company</th>
                    <th>Contact Person</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Scrap Type</th>
                    <th>Monthly Volume</th>
                    <th>Frequency</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {regularContracts.length === 0 ? (
                    <tr>
                      <td colSpan={9} style={{ textAlign: 'center', padding: '36px', color: '#64748B' }}>
                        No regular contract inquiries recorded yet.
                      </td>
                    </tr>
                  ) : (
                    regularContracts.map((rc) => (
                      <tr key={rc.id}>
                        <td>{new Date(rc.createdAt).toLocaleDateString('en-IN')}</td>
                        <td><strong style={{ color: '#FFFFFF' }}>{rc.companyName}</strong></td>
                        <td>{rc.contactPerson}</td>
                        <td>
                          <a href={`tel:${rc.phone}`} style={{ color: '#38BDF8', fontWeight: 600 }}>
                            {rc.phone}
                          </a>
                        </td>
                        <td>{rc.location}</td>
                        <td>{rc.scrapType}</td>
                        <td><strong style={{ color: '#F59E0B' }}>{rc.approximateMonthlyQuantity}</strong></td>
                        <td>{rc.pickupFrequency}</td>
                        <td>{getStatusBadge(rc.status)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: ENQUIRY ANALYTICS & STATISTICS
            ======================================================== */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {analyticsLoading || !analytics ? (
              <div className="metal-card" style={{ padding: '48px', textAlign: 'center', color: '#F59E0B' }}>
                Computing live analytics &amp; statistics...
              </div>
            ) : (
              <>
                {/* Analytics Key Metrics Strip */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '18px',
                }}>
                  <div className="stat-card">
                    <div className="stat-number">{analytics.summary.totalEnquiries}</div>
                    <div className="stat-label">Total Commercial Enquiries</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-number" style={{ color: '#FBBF24' }}>
                      {analytics.summary.totalTonnage} <span style={{ fontSize: '1.2rem' }}>TONS</span>
                    </div>
                    <div className="stat-label">Total Evaluated Volume</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-number" style={{ color: '#10B981' }}>
                      ₹{(analytics.summary.totalQuotedValue / 100000).toFixed(1)} <span style={{ fontSize: '1.2rem' }}>LAKH</span>
                    </div>
                    <div className="stat-label">Total Quoted Value (INR)</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-number" style={{ color: '#38BDF8' }}>
                      ₹{(analytics.summary.averageDealValue / 1000).toFixed(0)} <span style={{ fontSize: '1.2rem' }}>K</span>
                    </div>
                    <div className="stat-label">Average Quotation Size</div>
                  </div>
                </div>

                {/* Material Distribution & Regional Hubs */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                  gap: '24px',
                }}>
                  {/* Scrap Category Volume Distribution */}
                  <div className="metal-card" style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F59E0B', fontWeight: 800, fontSize: '0.9rem', marginBottom: '18px' }}>
                      <Scale size={18} />
                      <span>SCRAP CATEGORY &amp; TONNAGE BREAKDOWN</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {analytics.materialDistribution.map((m: any, idx: number) => (
                        <div key={idx} style={{
                          background: '#0B1119',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          border: '1px solid var(--border-metal)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                          <div>
                            <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.95rem' }}>{m.name}</div>
                            <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{m.count} enquiries recorded</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ color: '#FBBF24', fontWeight: 800, fontSize: '1.1rem' }}>
                              {m.tonnage} Tons
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Regional Industrial Hubs Distribution */}
                  <div className="metal-card" style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8', fontWeight: 800, fontSize: '0.9rem', marginBottom: '18px' }}>
                      <MapPin size={18} />
                      <span>REGIONAL INDUSTRIAL HUB ACTIVITY</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {analytics.locationDistribution.map((loc: any, idx: number) => (
                        <div key={idx} style={{
                          background: '#0B1119',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          border: '1px solid var(--border-metal)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                          <div style={{ color: '#E2E8F0', fontWeight: 600 }}>{loc.name}</div>
                          <span className="badge badge-steel" style={{ fontWeight: 800 }}>
                            {loc.count} Lots
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Conversion Funnel & Monthly Trend */}
                <div className="metal-card" style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 800, fontSize: '0.9rem', marginBottom: '18px' }}>
                    <TrendingUp size={18} />
                    <span>WORKFLOW CONVERSION FUNNEL</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', textAlign: 'center' }}>
                    {[
                      { label: 'New Enquiries', count: analytics.statusFunnel.NEW, color: '#38BDF8' },
                      { label: 'Under Review', count: analytics.statusFunnel.UNDER_REVIEW, color: '#FBBF24' },
                      { label: 'Contacted', count: analytics.statusFunnel.CONTACTED, color: '#A78BFA' },
                      { label: 'Quotation Given', count: analytics.statusFunnel.QUOTATION_GIVEN, color: '#FB923C' },
                      { label: 'Pickup Scheduled', count: analytics.statusFunnel.PICKUP_SCHEDULED, color: '#34D399' },
                      { label: 'Completed', count: analytics.statusFunnel.COMPLETED, color: '#10B981' },
                    ].map((step, idx) => (
                      <div key={idx} style={{
                        background: '#0B1119',
                        borderRadius: '8px',
                        padding: '16px 10px',
                        border: '1px solid var(--border-metal)',
                      }}>
                        <div style={{ fontSize: '1.6rem', fontWeight: 900, color: step.color }}>{step.count}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px' }}>{step.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ========================================================
            DETAILED ENQUIRY DRAWER / MODAL
            ======================================================== */}
        {selectedEnquiry && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 110,
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
            <div style={{
              width: '100%',
              maxWidth: '920px',
              height: '100%',
              background: '#0B1017',
              borderLeft: '1px solid var(--border-metal)',
              overflowY: 'auto',
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
            }}>
              {/* Modal Top Nav */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                borderBottom: '1px solid var(--border-metal)',
                paddingBottom: '20px',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      fontFamily: 'monospace',
                      fontSize: '1.4rem',
                      fontWeight: 900,
                      color: '#F59E0B',
                    }}>
                      {selectedEnquiry.enquiryNumber}
                    </span>
                    {getStatusBadge(selectedEnquiry.status)}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '4px' }}>
                    Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {selectedEnquiry.quotations && selectedEnquiry.quotations.length > 0 && (
                    <button
                      onClick={() => setShowQuotationSlip(true)}
                      className="btn btn-secondary btn-sm"
                      title="Print or view formal quotation voucher"
                    >
                      <Printer size={14} /> Quotation Slip
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    style={{
                      background: '#1A2433',
                      border: '1px solid var(--border-metal)',
                      borderRadius: '8px',
                      padding: '8px',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                    }}
                    aria-label="Close details"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Status Workflow Selector Bar */}
              <div style={{
                background: '#111824',
                border: '1px solid var(--border-metal)',
                borderRadius: '12px',
                padding: '18px 20px',
              }}>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Workflow Status Actions:
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {STATUS_OPTIONS.map((st) => (
                    <button
                      key={st.value}
                      disabled={updatingAction || selectedEnquiry.status === st.value}
                      onClick={() => handleStatusChange(st.value)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        border: selectedEnquiry.status === st.value ? `2px solid ${st.color}` : '1px solid var(--border-metal)',
                        background: selectedEnquiry.status === st.value ? st.bg : '#0B1119',
                        color: selectedEnquiry.status === st.value ? st.color : '#CBD5E1',
                        cursor: selectedEnquiry.status === st.value ? 'default' : 'pointer',
                      }}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Company & Contact Info Card with Click-to-Call & Direct WhatsApp */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '20px',
              }}>
                <div className="metal-card" style={{ padding: '24px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>
                    COMPANY &amp; REPRESENTATIVE
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '4px' }}>
                    {selectedEnquiry.companyName}
                  </h3>
                  <div style={{ fontSize: '0.95rem', color: '#CBD5E1', marginBottom: '16px' }}>
                    Contact: <strong>{selectedEnquiry.contactPerson}</strong>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Phone size={15} color="#38BDF8" />
                      <a href={`tel:${selectedEnquiry.phone}`} className="btn-call btn-sm" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>
                        📞 Call {selectedEnquiry.phone}
                      </a>
                    </div>

                    {selectedEnquiry.whatsapp && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MessageSquare size={15} color="#25D366" />
                        <a
                          href={`https://wa.me/${selectedEnquiry.whatsapp}?text=${encodeURIComponent(`Hello ${selectedEnquiry.contactPerson}, contacting from PANWAR ENTERPRISES regarding Enquiry ${selectedEnquiry.enquiryNumber}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-whatsapp btn-sm"
                          style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                        >
                          💬 WhatsApp {selectedEnquiry.whatsapp}
                        </a>
                      </div>
                    )}

                    {selectedEnquiry.email && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#CBD5E1' }}>
                        <span>✉</span> <a href={`mailto:${selectedEnquiry.email}`} style={{ textDecoration: 'underline' }}>{selectedEnquiry.email}</a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="metal-card" style={{ padding: '24px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>
                    PICKUP LOCATION &amp; SCHEDULING
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                    <MapPin size={18} color="#94A3B8" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ color: '#E2E8F0', fontSize: '0.92rem', lineHeight: 1.5 }}>
                      <strong>{selectedEnquiry.pickupAddress}</strong>
                      <div>
                        {[selectedEnquiry.industrialArea, selectedEnquiry.city, selectedEnquiry.pincode]
                          .filter(Boolean)
                          .join(', ')}
                      </div>
                    </div>
                  </div>

                  <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ color: '#64748B' }}>Preferred Date:</span>{' '}
                      <strong style={{ color: '#F8FAFC' }}>{selectedEnquiry.preferredPickupDate || 'Flexible'}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Preferred Time:</span>{' '}
                      <strong style={{ color: '#F8FAFC' }}>{selectedEnquiry.preferredPickupTime || 'Regular Hours'}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company & Customer Historical Orders / Enquiries */}
              {customerHistory && customerHistory.length > 0 && (
                <div className="metal-card" style={{ padding: '24px', borderLeft: '4px solid #A78BFA' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A78BFA', fontWeight: 800, fontSize: '0.85rem', marginBottom: '12px' }}>
                    <History size={16} />
                    <span>CLIENT TRANSACTION &amp; ORDER HISTORY ({customerHistory.length} previous lots)</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {customerHistory.map((hist: any) => (
                      <div
                        key={hist.id}
                        style={{
                          background: '#0B1119',
                          borderRadius: '6px',
                          padding: '10px 14px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '0.85rem',
                          border: '1px solid var(--border-metal)',
                          cursor: 'pointer',
                        }}
                        onClick={() => openEnquiryDetail(hist.id)}
                      >
                        <div>
                          <span style={{ fontFamily: 'monospace', color: '#F59E0B', fontWeight: 700 }}>
                            {hist.enquiryNumber}
                          </span>
                          <span style={{ color: '#CBD5E1', marginLeft: '10px' }}>
                            {hist.scrapType} ({hist.approximateQuantity || '—'} {hist.quantityUnit})
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {hist.quotations && hist.quotations[0] && (
                            <span style={{ color: '#10B981', fontWeight: 700 }}>
                              ₹{hist.quotations[0].estimatedTotal.toLocaleString('en-IN')}
                            </span>
                          )}
                          {getStatusBadge(hist.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Scrap Details & Customer Message */}
              <div className="metal-card" style={{ padding: '24px' }}>
                <div style={{ fontSize: '0.8rem', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>
                  SCRAP MATERIAL SPECIFICATION
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>MATERIAL TYPE</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>{selectedEnquiry.scrapType}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>APPROX QUANTITY</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FBBF24' }}>
                      {selectedEnquiry.approximateQuantity
                        ? `${selectedEnquiry.approximateQuantity} ${selectedEnquiry.quantityUnit}`
                        : 'Unspecified'}
                    </div>
                  </div>
                </div>

                {selectedEnquiry.scrapDescription && (
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>DESCRIPTION</div>
                    <div style={{ color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.6, background: '#0B1119', padding: '12px', borderRadius: '8px' }}>
                      {selectedEnquiry.scrapDescription}
                    </div>
                  </div>
                )}

                {selectedEnquiry.additionalMessage && (
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>CUSTOMER NOTES</div>
                    <div style={{ color: '#94A3B8', fontSize: '0.88rem', background: '#0B1119', padding: '10px', borderRadius: '8px' }}>
                      {selectedEnquiry.additionalMessage}
                    </div>
                  </div>
                )}
              </div>

              {/* Uploaded Photos & Media (Private Protected Storage) */}
              <div className="metal-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase' }}>
                    PRIVATE SCRAP MEDIA ({selectedEnquiry.images?.length || 0})
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#10B981' }}>🔒 Confidential / Admin Protected</span>
                </div>

                {(!selectedEnquiry.images || selectedEnquiry.images.length === 0) ? (
                  <div style={{ color: '#64748B', fontSize: '0.88rem' }}>No media attached to this enquiry.</div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '14px' }}>
                    {selectedEnquiry.images.map((img: any) => (
                      <div
                        key={img.id}
                        style={{
                          position: 'relative',
                          aspectRatio: '1/1',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: '1px solid var(--border-metal)',
                          cursor: 'pointer',
                          background: '#0B1119',
                        }}
                        onClick={() => {
                          if (img.fileType === 'IMAGE') setLightboxImage(img.fileUrl);
                        }}
                      >
                        {img.fileType === 'VIDEO' ? (
                          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                            <Video size={28} color="#38BDF8" />
                            <a
                              href={img.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontSize: '0.75rem', color: '#38BDF8', marginTop: '6px', textAlign: 'center' }}
                            >
                              Play Video
                            </a>
                          </div>
                        ) : (
                          <img
                            src={img.fileUrl}
                            alt={img.fileName}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ========================================================
                  ADMIN QUOTATION SYSTEM
                  ======================================================== */}
              <div className="metal-card" style={{ padding: '28px', borderLeft: '4px solid #FB923C' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.9rem', color: '#FB923C', fontWeight: 800, textTransform: 'uppercase' }}>
                    QUOTATION MANAGEMENT
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Dynamic Market Rates</span>
                </div>

                {selectedEnquiry.quotations && selectedEnquiry.quotations.length > 0 && (
                  <div style={{
                    background: '#0E1722',
                    borderRadius: '10px',
                    padding: '16px',
                    border: '1px solid var(--border-metal)',
                    marginBottom: '20px',
                  }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '4px' }}>CURRENT ACTIVE QUOTATION</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ fontSize: '1.2rem', color: '#FFFFFF', fontWeight: 700 }}>
                        {selectedEnquiry.quotations[0].materialType} — ₹{selectedEnquiry.quotations[0].rate}/{selectedEnquiry.quotations[0].unit}
                      </div>
                      <div style={{ fontSize: '1.3rem', color: '#10B981', fontWeight: 800 }}>
                        Total: ₹{selectedEnquiry.quotations[0].estimatedTotal.toLocaleString('en-IN')}
                      </div>
                    </div>
                    {selectedEnquiry.quotations[0].notes && (
                      <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '6px' }}>
                        Note: {selectedEnquiry.quotations[0].notes}
                      </div>
                    )}

                    {/* Quick Action Buttons: WhatsApp Quotation & Copy Quote */}
                    <div style={{ marginTop: '14px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <a
                        href={`https://wa.me/${selectedEnquiry.whatsapp || selectedEnquiry.phone}?text=${encodeURIComponent(
                          `*PANWAR ENTERPRISES - QUOTATION*\n\nHello ${selectedEnquiry.contactPerson},\n\nWe have reviewed your scrap enquiry (${selectedEnquiry.enquiryNumber}) for ${selectedEnquiry.companyName}.\n\n• Material: ${selectedEnquiry.quotations[0].materialType}\n• Estimated Quantity: ${selectedEnquiry.quotations[0].estimatedQuantity}\n• Offered Rate: ₹${selectedEnquiry.quotations[0].rate}/${selectedEnquiry.quotations[0].unit}\n• Total Valuation: ₹${selectedEnquiry.quotations[0].estimatedTotal.toLocaleString('en-IN')}\n\nTerms: Computer weighbridge slip verification with immediate bank RTGS payment before vehicle departure.\n\nPlease confirm pickup availability.\n\nPANWAR ENTERPRISES (9813155887)`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp btn-sm"
                      >
                        <MessageSquare size={14} /> Send Quotation via WhatsApp
                      </a>

                      <button
                        onClick={() => handleCopyQuotationText(selectedEnquiry.quotations[0])}
                        className="btn btn-outline btn-sm"
                      >
                        {copiedQuote ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                        {copiedQuote ? 'Copied!' : 'Copy Quotation Text'}
                      </button>

                      <button
                        onClick={() => setShowQuotationSlip(true)}
                        className="btn btn-secondary btn-sm"
                      >
                        <Printer size={14} /> Formal Slip
                      </button>
                    </div>
                  </div>
                )}

                {/* Create/Update Quotation Form */}
                <form onSubmit={handleCreateQuotation}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Material Name</label>
                      <input
                        type="text"
                        required
                        value={quotationForm.materialType}
                        onChange={(e) => setQuotationForm({ ...quotationForm, materialType: e.target.value })}
                        placeholder="e.g. Iron Scrap / Stamping"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Rate (₹)</label>
                      <input
                        type="number"
                        step="any"
                        required
                        value={quotationForm.rate}
                        onChange={(e) => {
                          const rateVal = e.target.value;
                          setQuotationForm((prev) => {
                            const qtyNum = parseFloat(selectedEnquiry.approximateQuantity || '0');
                            const est = qtyNum && rateVal ? (qtyNum * parseFloat(rateVal)).toFixed(0) : prev.estimatedTotal;
                            return { ...prev, rate: rateVal, estimatedTotal: est };
                          });
                        }}
                        placeholder="e.g. 42"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Unit</label>
                      <select
                        value={quotationForm.unit}
                        onChange={(e) => setQuotationForm({ ...quotationForm, unit: e.target.value })}
                        className="form-select"
                      >
                        <option value="KG">per KG</option>
                        <option value="TON">per TON</option>
                        <option value="PIECE">per PIECE</option>
                      </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Estimated Total Value (₹)</label>
                      <input
                        type="number"
                        step="any"
                        required
                        value={quotationForm.estimatedTotal}
                        onChange={(e) => setQuotationForm({ ...quotationForm, estimatedTotal: e.target.value })}
                        placeholder="e.g. 340000"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">Quotation Notes / Terms</label>
                    <input
                      type="text"
                      value={quotationForm.notes}
                      onChange={(e) => setQuotationForm({ ...quotationForm, notes: e.target.value })}
                      placeholder="e.g. Valid for 48 hours. Computer weighbridge payment."
                      className="form-input"
                    />
                  </div>

                  <button type="submit" disabled={updatingAction} className="btn btn-primary btn-sm">
                    {updatingAction ? 'Saving...' : 'Save & Issue Quotation'}
                  </button>
                </form>
              </div>

              {/* ========================================================
                  ADMIN PICKUP LOGISTICS SCHEDULER
                  ======================================================== */}
              <div className="metal-card" style={{ padding: '28px', borderLeft: '4px solid #34D399' }}>
                <div style={{ fontSize: '0.9rem', color: '#34D399', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px' }}>
                  PICKUP SCHEDULING &amp; LOGISTICS DISPATCH
                </div>

                {selectedEnquiry.pickups && selectedEnquiry.pickups.length > 0 && (
                  <div style={{
                    background: '#0E1722',
                    borderRadius: '10px',
                    padding: '16px',
                    border: '1px solid var(--border-metal)',
                    marginBottom: '18px',
                  }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '4px' }}>SCHEDULED DISPATCH</div>
                    <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.05rem' }}>
                      Date: {selectedEnquiry.pickups[0].scheduledDate} {selectedEnquiry.pickups[0].scheduledTime}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '4px' }}>
                      Driver: {selectedEnquiry.pickups[0].driverName || 'To Be Assigned'} • Vehicle: {selectedEnquiry.pickups[0].vehicleNumber || 'Standard Fleet'}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSchedulePickup}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Pickup Date</label>
                      <input
                        type="date"
                        required
                        value={pickupForm.scheduledDate}
                        onChange={(e) => setPickupForm({ ...pickupForm, scheduledDate: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Pickup Time Slot</label>
                      <input
                        type="text"
                        value={pickupForm.scheduledTime}
                        onChange={(e) => setPickupForm({ ...pickupForm, scheduledTime: e.target.value })}
                        placeholder="e.g. 10:00 AM"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Driver / Supervisor Name</label>
                      <input
                        type="text"
                        value={pickupForm.driverName}
                        onChange={(e) => setPickupForm({ ...pickupForm, driverName: e.target.value })}
                        placeholder="e.g. Surender Kumar"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Vehicle Registration Number</label>
                      <input
                        type="text"
                        value={pickupForm.vehicleNumber}
                        onChange={(e) => setPickupForm({ ...pickupForm, vehicleNumber: e.target.value })}
                        placeholder="e.g. HR-36-AB-1234"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">Logistics Instructions</label>
                    <input
                      type="text"
                      value={pickupForm.notes}
                      onChange={(e) => setPickupForm({ ...pickupForm, notes: e.target.value })}
                      placeholder="e.g. Dispatch hydra crane with 16-wheel trailer."
                      className="form-input"
                    />
                  </div>

                  <button type="submit" disabled={updatingAction} className="btn btn-secondary btn-sm">
                    {updatingAction ? 'Scheduling...' : 'Confirm Pickup Dispatch'}
                  </button>
                </form>
              </div>

              {/* Admin Notes & Contact Log Timeline */}
              <div className="metal-card" style={{ padding: '24px' }}>
                <div style={{ fontSize: '0.8rem', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '14px' }}>
                  CONTACT LOGS &amp; INTERNAL NOTES
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <input
                    type="text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Log a call outcome or note (e.g. Spoke with GM on phone, requested revised rate)..."
                    className="form-input"
                  />
                  <button
                    onClick={() => handleAddContactLog('PHONE')}
                    disabled={updatingAction || !noteText.trim()}
                    className="btn btn-primary btn-sm"
                  >
                    Add Log
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {selectedEnquiry.contactLogs?.map((log: any) => (
                    <div
                      key={log.id}
                      style={{
                        background: '#0B1119',
                        border: '1px solid var(--border-metal)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        fontSize: '0.85rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.75rem' }}>
                        <span>Logged by {log.loggedBy || 'Admin'} • {log.contactMethod}</span>
                        <span>{new Date(log.createdAt).toLocaleString('en-IN')}</span>
                      </div>
                      <div style={{ color: '#E2E8F0', marginTop: '4px' }}>{log.summary}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            FORMAL PRINTABLE QUOTATION SLIP MODAL
            ======================================================== */}
        {showQuotationSlip && selectedEnquiry && selectedEnquiry.quotations?.[0] && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            zIndex: 140,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}>
            <div style={{
              background: '#FFFFFF',
              color: '#0F172A',
              borderRadius: '12px',
              maxWidth: '680px',
              width: '100%',
              padding: '36px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0F172A', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>
                    PANWAR ENTERPRISES
                  </h2>
                  <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '4px' }}>
                    Industrial Scrap Solutions • 35+ Years of Experience
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                    Tankri, Bawal, District Rewari, Haryana | Ph: 9813155887
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#D97706' }}>OFFICIAL QUOTATION</div>
                  <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.95rem' }}>{selectedEnquiry.enquiryNumber}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Date: {new Date().toLocaleDateString('en-IN')}</div>
                </div>
              </div>

              {/* Client Info */}
              <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #E2E8F0', fontSize: '0.88rem' }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0F172A' }}>{selectedEnquiry.companyName}</div>
                <div>Attention: {selectedEnquiry.contactPerson} (Ph: {selectedEnquiry.phone})</div>
                <div>Location: {selectedEnquiry.pickupAddress}, {selectedEnquiry.city}</div>
              </div>

              {/* Itemized Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#0F172A', color: '#FFFFFF', textAlign: 'left' }}>
                    <th style={{ padding: '8px 12px' }}>Material</th>
                    <th style={{ padding: '8px 12px' }}>Est. Quantity</th>
                    <th style={{ padding: '8px 12px' }}>Offered Rate</th>
                    <th style={{ padding: '8px 12px', textAlign: 'right' }}>Total (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '12px' }}><strong>{selectedEnquiry.quotations[0].materialType}</strong></td>
                    <td style={{ padding: '12px' }}>{selectedEnquiry.quotations[0].estimatedQuantity}</td>
                    <td style={{ padding: '12px' }}>₹{selectedEnquiry.quotations[0].rate}/{selectedEnquiry.quotations[0].unit}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#047857' }}>
                      ₹{selectedEnquiry.quotations[0].estimatedTotal.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Commercial Terms */}
              <div style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5, marginBottom: '24px' }}>
                <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>Commercial Terms:</div>
                • Weighbridge: Material weighed at government-certified computer weighbridge.<br />
                • Payment: Immediate RTGS / account transfer before transport departure.<br />
                • Validity: Rates valid for 48 hours based on daily market fluctuation.<br />
                • Logistics: Hydra cranes and heavy trailers mobilized directly by Panwar Enterprises.
              </div>

              {/* Signature */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Generated by Panwar Enterprises ERP</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Bhim Singh Panwar</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Authorized Commercial Head</div>
                </div>
              </div>

              {/* Buttons */}
              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  onClick={() => window.print()}
                  style={{
                    padding: '8px 16px',
                    background: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Print Quotation Slip
                </button>
                <button
                  onClick={() => setShowQuotationSlip(false)}
                  style={{
                    padding: '8px 16px',
                    background: '#E2E8F0',
                    color: '#0F172A',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lightbox for Images */}
        {lightboxImage && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.95)',
              zIndex: 150,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
            onClick={() => setLightboxImage(null)}
          >
            <button
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#1E293B',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '50%',
                padding: '10px',
                cursor: 'pointer',
              }}
              onClick={() => setLightboxImage(null)}
            >
              <X size={24} />
            </button>
            <img
              src={lightboxImage}
              alt="Scrap Preview Full"
              style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', borderRadius: '8px' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
