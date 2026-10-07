'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  UploadCloud,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  Video,
  X,
  ArrowRight,
  Clock,
  MapPin,
  Calendar,
  Building2,
  User,
  Scale,
} from 'lucide-react';
import { BUSINESS_INFO, SCRAP_CATEGORIES } from '@/lib/constants';

function SellScrapForm() {
  const searchParams = useSearchParams();
  const initialScrapType = searchParams.get('scrapType') || '';

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    whatsapp: '',
    email: '',
    scrapType: initialScrapType || 'Iron Scrap',
    customScrapType: '',
    approximateQuantity: '',
    quantityUnit: 'TON',
    pickupAddress: '',
    city: '',
    industrialArea: '',
    pincode: '',
    scrapDescription: '',
    preferredPickupDate: '',
    preferredPickupTime: '',
    additionalMessage: '',
    confirmInfo: false,
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    enquiryNumber?: string;
    message?: string;
  } | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialScrapType) {
      setFormData((prev) => ({ ...prev, scrapType: initialScrapType }));
    }
  }, [initialScrapType]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);

    // Limit check (max 10 images)
    if (selectedImages.length + newFiles.length > 10) {
      setErrorMsg('You can upload up to 10 scrap photos.');
      return;
    }

    const updated = [...selectedImages, ...newFiles];
    setSelectedImages(updated);

    // Generate previews
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setErrorMsg('');
  };

  const removeImage = (index: number) => {
    const updatedFiles = [...selectedImages];
    updatedFiles.splice(index, 1);
    setSelectedImages(updatedFiles);

    const updatedPreviews = [...imagePreviews];
    URL.revokeObjectURL(updatedPreviews[index]);
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 60 * 1024 * 1024) {
        setErrorMsg('Video file must be under 60MB.');
        return;
      }
      setSelectedVideo(file);
      setErrorMsg('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!formData.companyName.trim()) {
      setErrorMsg('Please enter your Company Name.');
      return;
    }
    if (!formData.contactPerson.trim()) {
      setErrorMsg('Please enter Contact Person Name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit Phone Number.');
      return;
    }
    if (!formData.pickupAddress.trim()) {
      setErrorMsg('Please enter the Pickup Address.');
      return;
    }
    if (selectedImages.length === 0) {
      setErrorMsg('Please upload at least one scrap photo for evaluation.');
      return;
    }
    if (!formData.confirmInfo) {
      setErrorMsg('Please check the confirmation box before submitting.');
      return;
    }

    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('companyName', formData.companyName);
      data.append('contactPerson', formData.contactPerson);
      data.append('phone', formData.phone);
      data.append('whatsapp', formData.whatsapp || formData.phone);
      if (formData.email) data.append('email', formData.email);

      const finalScrapType =
        formData.scrapType === 'OTHER' && formData.customScrapType
          ? formData.customScrapType
          : formData.scrapType;
      data.append('scrapType', finalScrapType);

      if (formData.approximateQuantity) {
        data.append('approximateQuantity', formData.approximateQuantity);
      }
      data.append('quantityUnit', formData.quantityUnit);
      data.append('pickupAddress', formData.pickupAddress);
      if (formData.city) data.append('city', formData.city);
      if (formData.industrialArea) data.append('industrialArea', formData.industrialArea);
      if (formData.pincode) data.append('pincode', formData.pincode);
      if (formData.scrapDescription) data.append('scrapDescription', formData.scrapDescription);
      if (formData.preferredPickupDate) data.append('preferredPickupDate', formData.preferredPickupDate);
      if (formData.preferredPickupTime) data.append('preferredPickupTime', formData.preferredPickupTime);
      if (formData.additionalMessage) data.append('additionalMessage', formData.additionalMessage);

      // Append images
      selectedImages.forEach((img) => {
        data.append('images', img);
      });

      // Append video
      if (selectedVideo) {
        data.append('video', selectedVideo);
      }

      const res = await fetch('/api/enquiries', {
        method: 'POST',
        body: data,
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.error || 'Failed to submit enquiry.');
      }

      setSubmissionResult({
        success: true,
        enquiryNumber: resData.enquiryNumber,
        message: resData.message,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while submitting your enquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello PANWAR ENTERPRISES, I have submitted scrap enquiry ${submissionResult?.enquiryNumber || ''}. Kindly check and provide quotation.`
  );

  return (
    <div className="industrial-bg" style={{ minHeight: '85vh', padding: '60px 0 100px 0' }}>
      <div className="container-narrow">
        {/* Header Breadcrumb & Titles */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge badge-amber" style={{ marginBottom: '14px' }}>
            <ShieldCheck size={16} /> OFFICIAL B2B SCRAP ENQUIRY PORTAL
          </div>
          <h1 style={{ fontSize: 'clamp(2.1rem, 4vw, 3.2rem)', marginBottom: '14px' }}>
            SELL YOUR INDUSTRIAL SCRAP
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#CBD5E1', maxWidth: '680px', margin: '0 auto' }}>
            Upload multiple photos and basic scrap lot details. Our team reviews material specifications and contacts you with the best competitive market rate quotation.
          </p>
        </div>

        {/* ========================================================
            SUCCESS STATE SCREEN
            ======================================================== */}
        {submissionResult && submissionResult.success ? (
          <div
            className="metal-card"
            style={{
              padding: '48px 36px',
              textAlign: 'center',
              border: '2px solid #10B981',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(16, 185, 129, 0.2)',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto',
              }}
            >
              <CheckCircle2 size={44} />
            </div>

            <div className="badge badge-green" style={{ marginBottom: '16px', fontSize: '0.9rem' }}>
              ENQUIRY REGISTERED SUCCESSFULLY
            </div>

            <h2 style={{ fontSize: '1.9rem', color: '#FFFFFF', marginBottom: '12px' }}>
              Thank You! Your Scrap Enquiry Has Been Received.
            </h2>

            <div
              style={{
                background: '#0B121A',
                border: '1px solid var(--border-metal)',
                borderRadius: '12px',
                padding: '20px',
                maxWidth: '440px',
                margin: '24px auto',
              }}
            >
              <div style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                YOUR ENQUIRY TRACKING ID
              </div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.8rem',
                fontWeight: 900,
                color: '#F59E0B',
                letterSpacing: '0.05em',
                marginTop: '4px',
              }}>
                {submissionResult.enquiryNumber}
              </div>
            </div>

            <p style={{ color: '#CBD5E1', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto 32px auto', lineHeight: 1.6 }}>
              <strong>PANWAR ENTERPRISES</strong> will review your uploaded photos and contact you shortly with the best possible quotation and pickup schedule.
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
                marginBottom: '32px',
              }}
            >
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="btn btn-call btn-lg"
              >
                <Phone size={18} />
                CALL {BUSINESS_INFO.phone}
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

            <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <button
                onClick={() => {
                  setSubmissionResult(null);
                  setSelectedImages([]);
                  setImagePreviews([]);
                  setSelectedVideo(null);
                  setFormData({
                    companyName: '',
                    contactPerson: '',
                    phone: '',
                    whatsapp: '',
                    email: '',
                    scrapType: 'Iron Scrap',
                    customScrapType: '',
                    approximateQuantity: '',
                    quantityUnit: 'TON',
                    pickupAddress: '',
                    city: '',
                    industrialArea: '',
                    pincode: '',
                    scrapDescription: '',
                    preferredPickupDate: '',
                    preferredPickupTime: '',
                    additionalMessage: '',
                    confirmInfo: false,
                  });
                }}
                className="btn btn-outline btn-sm"
              >
                Submit Another Scrap Lot
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================
              SCRAP ENQUIRY FORM
              ======================================================== */
          <form onSubmit={handleSubmit} className="metal-card" style={{ padding: '40px 32px' }}>
            {errorMsg && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: '10px',
                  padding: '14px 18px',
                  color: '#FCA5A5',
                  marginBottom: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '0.95rem',
                }}
              >
                <AlertCircle size={20} color="#EF4444" style={{ flexShrink: 0 }} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Section 1: Company & Contact Information */}
            <div style={{ marginBottom: '36px' }}>
              <div
                style={{
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
                  marginBottom: '20px',
                }}
              >
                <Building2 size={18} />
                <span>1. COMPANY &amp; CONTACT INFORMATION</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '18px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="companyName">
                    Company Name <span className="required">*</span>
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g. Apex Auto Components Ltd."
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactPerson">
                    Contact Person <span className="required">*</span>
                  </label>
                  <input
                    id="contactPerson"
                    name="contactPerson"
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder="e.g. Rajiv Sharma (Procurement Head)"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 9812345678"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="whatsapp">
                    WhatsApp Number (If different)
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="e.g. 9812345678"
                    className="form-input"
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label" htmlFor="email">
                    Company Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. procurement@company.com"
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Scrap Material Details */}
            <div style={{ marginBottom: '36px' }}>
              <div
                style={{
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
                  marginBottom: '20px',
                }}
              >
                <Scale size={18} />
                <span>2. SCRAP MATERIAL DETAILS</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '18px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="scrapType">
                    Scrap Type <span className="required">*</span>
                  </label>
                  <select
                    id="scrapType"
                    name="scrapType"
                    required
                    value={formData.scrapType}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="Iron Scrap">Iron Scrap (Heavy Melting / Turnings)</option>
                    <option value="Steel Scrap">Steel Scrap (SS, MS, CRC, Punchings)</option>
                    <option value="Aluminium Scrap">Aluminium Scrap (Extrusions, Castings)</option>
                    <option value="Copper Scrap">Copper Scrap (Busbars, Winding, Armature)</option>
                    <option value="Brass Scrap">Brass Scrap (Honey, Sanitary, Pins)</option>
                    <option value="Metal Scrap">Metal Scrap (General Ferrous/Non-Ferrous)</option>
                    <option value="Machinery Scrap">Machinery Scrap (Lathes, Presses, Lines)</option>
                    <option value="Industrial Scrap">Industrial Scrap (Plant Overhaul &amp; Lots)</option>
                    <option value="Electrical Scrap">Electrical Scrap (Panels, Cables, Transformers)</option>
                    <option value="Plastic Scrap">Plastic Scrap (HD Drums, Runners, Industrial)</option>
                    <option value="Factory Scrap">Factory Scrap (Rejection &amp; Tooling)</option>
                    <option value="Automobile Scrap">Automobile Scrap (Sheet skeletons, Chassis)</option>
                    <option value="Warehouse Scrap">Warehouse Scrap (Pallets, Racking, Angles)</option>
                    <option value="Mixed Scrap">Mixed Industrial Scrap</option>
                    <option value="OTHER">Other Custom Scrap Type</option>
                  </select>
                </div>

                {formData.scrapType === 'OTHER' && (
                  <div className="form-group">
                    <label className="form-label" htmlFor="customScrapType">
                      Specify Scrap Material <span className="required">*</span>
                    </label>
                    <input
                      id="customScrapType"
                      name="customScrapType"
                      type="text"
                      required
                      value={formData.customScrapType}
                      onChange={handleInputChange}
                      placeholder="Specify material composition"
                      className="form-input"
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="approximateQuantity">
                    Approximate Quantity
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      id="approximateQuantity"
                      name="approximateQuantity"
                      type="number"
                      step="any"
                      value={formData.approximateQuantity}
                      onChange={handleInputChange}
                      placeholder="e.g. 10"
                      className="form-input"
                      style={{ flex: 2 }}
                    />
                    <select
                      id="quantityUnit"
                      name="quantityUnit"
                      value={formData.quantityUnit}
                      onChange={handleInputChange}
                      className="form-select"
                      style={{ flex: 1.2 }}
                    >
                      <option value="TON">TON</option>
                      <option value="KG">KG</option>
                      <option value="PIECE">PIECE</option>
                      <option value="OTHER">OTHER</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label" htmlFor="scrapDescription">
                    Scrap Lot Description
                  </label>
                  <textarea
                    id="scrapDescription"
                    name="scrapDescription"
                    rows={3}
                    value={formData.scrapDescription}
                    onChange={handleInputChange}
                    placeholder="Describe scrap conditions, shapes, packaging (e.g. loose pile, bundles, machine beds, need crane loading, etc.)"
                    className="form-textarea"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Media Uploads (Images & Video) */}
            <div style={{ marginBottom: '36px' }}>
              <div
                style={{
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
                  marginBottom: '20px',
                }}
              >
                <UploadCloud size={18} />
                <span>3. UPLOAD SCRAP PHOTOS &amp; VIDEO</span>
              </div>

              {/* Photos Upload Zone */}
              <div className="form-group">
                <label className="form-label">
                  Scrap Images <span className="required">* (Multiple photos allowed)</span>
                </label>

                <div
                  className="file-upload-dropzone"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: 'rgba(245, 158, 11, 0.1)',
                    color: '#F59E0B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 14px auto',
                  }}>
                    <ImageIcon size={28} />
                  </div>
                  <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>
                    Click to Select or Drag Scrap Photos
                  </div>
                  <div className="form-hint">
                    PNG, JPG, JPEG, WEBP up to 25MB each. You can select multiple images at once.
                  </div>
                </div>

                {/* Previews Grid */}
                {imagePreviews.length > 0 && (
                  <div style={{
                    marginTop: '16px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                    gap: '12px',
                  }}>
                    {imagePreviews.map((src, idx) => (
                      <div
                        key={idx}
                        style={{
                          position: 'relative',
                          aspectRatio: '1/1',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: '1px solid var(--border-metal)',
                          background: '#0B1119',
                        }}
                      >
                        <img
                          src={src}
                          alt={`Scrap preview ${idx + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            background: 'rgba(0, 0, 0, 0.75)',
                            border: 'none',
                            color: '#FFFFFF',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                          aria-label="Remove image"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video Upload (Optional) */}
              <div className="form-group" style={{ marginTop: '20px' }}>
                <label className="form-label">
                  Upload Scrap Video (Optional)
                </label>
                <div
                  style={{
                    background: '#0B1119',
                    border: '1px solid var(--border-metal)',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Video size={24} color="#38BDF8" />
                    <div>
                      <div style={{ color: '#E2E8F0', fontSize: '0.9rem', fontWeight: 600 }}>
                        {selectedVideo ? selectedVideo.name : 'Walkthrough clip of the scrap yard (MP4/MOV up to 60MB)'}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                        {selectedVideo
                          ? `${(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB selected`
                          : 'Videos help our quotation team assess accessibility & volume faster'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      style={{ display: 'none' }}
                      onChange={handleVideoChange}
                    />
                    <button
                      type="button"
                      onClick={() => videoInputRef.current?.click()}
                      className="btn btn-outline btn-sm"
                    >
                      {selectedVideo ? 'Change Video' : 'Choose Video'}
                    </button>
                    {selectedVideo && (
                      <button
                        type="button"
                        onClick={() => setSelectedVideo(null)}
                        className="btn btn-outline btn-sm"
                        style={{ color: '#EF4444', borderColor: '#EF4444' }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Pickup Location & Scheduling */}
            <div style={{ marginBottom: '36px' }}>
              <div
                style={{
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
                  marginBottom: '20px',
                }}
              >
                <MapPin size={18} />
                <span>4. PICKUP LOCATION &amp; SCHEDULE</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label" htmlFor="pickupAddress">
                    Factory / Warehouse Address <span className="required">*</span>
                  </label>
                  <input
                    id="pickupAddress"
                    name="pickupAddress"
                    type="text"
                    required
                    value={formData.pickupAddress}
                    onChange={handleInputChange}
                    placeholder="Plot / Shed Number, Street, Landmark"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="city">
                    City / Region
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Manesar / Gurugram / Bawal"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="industrialArea">
                    Industrial Area / Zone
                  </label>
                  <input
                    id="industrialArea"
                    name="industrialArea"
                    type="text"
                    value={formData.industrialArea}
                    onChange={handleInputChange}
                    placeholder="e.g. IMT Sector 8 / HSIIDC Phase 2"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pincode">
                    Pincode
                  </label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="e.g. 122051"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="preferredPickupDate">
                    Preferred Pickup Date
                  </label>
                  <input
                    id="preferredPickupDate"
                    name="preferredPickupDate"
                    type="date"
                    value={formData.preferredPickupDate}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="preferredPickupTime">
                    Preferred Pickup Time
                  </label>
                  <input
                    id="preferredPickupTime"
                    name="preferredPickupTime"
                    type="text"
                    value={formData.preferredPickupTime}
                    onChange={handleInputChange}
                    placeholder="e.g. Morning 10 AM - 1 PM"
                    className="form-input"
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label" htmlFor="additionalMessage">
                    Additional Instructions / Requirements
                  </label>
                  <textarea
                    id="additionalMessage"
                    name="additionalMessage"
                    rows={2}
                    value={formData.additionalMessage}
                    onChange={handleInputChange}
                    placeholder="Any gate pass requirements, PPE safety guidelines, weighing bridge preferences, or vehicle size restrictions."
                    className="form-textarea"
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Confirmation Checkbox */}
            <div style={{
              background: '#0B1119',
              borderRadius: '10px',
              padding: '18px 20px',
              border: '1px solid var(--border-metal)',
              marginBottom: '32px',
            }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="confirmInfo"
                  checked={formData.confirmInfo}
                  onChange={handleInputChange}
                  style={{
                    width: '20px',
                    height: '20px',
                    accentColor: '#F59E0B',
                    marginTop: '2px',
                    cursor: 'pointer',
                  }}
                />
                <span style={{ fontSize: '0.92rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                  <strong>I confirm that the information provided is correct.</strong> I authorize PANWAR ENTERPRISES to evaluate our scrap lot and contact our representative for quotation and pickup logistics.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary btn-lg"
              style={{
                width: '100%',
                padding: '18px',
                fontSize: '1.1rem',
                opacity: submitting ? 0.7 : 1,
                cursor: submitting ? 'not-allowed' : 'pointer',
              }}
            >
              {submitting ? (
                <span>PROCESSING SCRAP ENQUIRY...</span>
              ) : (
                <>
                  <UploadCloud size={22} />
                  <span>SUBMIT SCRAP ENQUIRY</span>
                </>
              )}
            </button>

            {/* Trust Assurances below submit */}
            <div style={{
              marginTop: '24px',
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
              flexWrap: 'wrap',
              fontSize: '0.82rem',
              color: '#94A3B8',
              textAlign: 'center',
            }}>
              <span>🔒 Confidential B2B Data</span>
              <span>⚡ Direct Communication with Management</span>
              <span>⚖️ Transparent Weighbridge Billing</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function SellScrapPage() {
  return (
    <Suspense fallback={
      <div className="industrial-bg" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#F59E0B', fontWeight: 600 }}>Loading scrap enquiry form...</div>
      </div>
    }>
      <SellScrapForm />
    </Suspense>
  );
}

