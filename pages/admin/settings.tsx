import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Settings,
  Phone,
  Mail,
  MapPin,
  Globe,
  Save,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ExternalLink,
  X,
  ImageIcon,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageKitUploader from '@/components/admin/ImageKitUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { useAdminData } from '@/context/AdminDataContext';

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useAdminData();
  const [formData, setFormData] = useState(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleChange = (field: keyof typeof settings, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    setSaveSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaveSuccess(true);
    setShowSuccessPopup(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const currentLogo = formData.logoUrl || '/images/logo.png';

  return (
    <AdminLayout
      title="Site Settings & Contact Info"
      subtitle="Update phone numbers, WhatsApp, email, office address, and social links displayed across the footer and header."
      activeNav="settings"
    >
      <form onSubmit={handleSave} className="w-full space-y-8">
        {/* Save Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8dfd3] shadow-xs flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Website Configuration</h2>
            <p className="text-xs text-gray-500">Changes immediately apply across all public pages</p>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Saved successfully!</span>
              </span>
            )}

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>

        {/* 0. Brand Logo Upload & Real-Time Preview Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-50 text-[#d99824] border border-amber-200">
                <ImageIcon className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-lg font-bold font-serif-display text-gray-900">
                  Brand Logo &amp; Identity
                </h3>
                <p className="text-xs text-gray-500">
                  Updates header navigation, footer branding, and mobile menu across the entire website.
                </p>
              </div>
            </div>

            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Active Brand Asset
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Live Dual Background Logo Preview (Dark Header & Light Card) */}
            <div className="lg:col-span-6 space-y-3">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Live Backdrop Preview
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* On Dark Header */}
                <div className="bg-[#140706] rounded-2xl p-5 border border-[#301c1a] flex flex-col items-center justify-center text-center shadow-inner group">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] mb-3">
                    On Dark Header
                  </span>
                  <div className="relative w-44 h-12">
                    <Image
                      src={currentLogo}
                      alt="Brand Logo on dark backdrop"
                      fill
                      className="object-contain object-center group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* On Light Backdrop */}
                <div className="bg-[#fbf9f6] rounded-2xl p-5 border border-[#e8dfd3] flex flex-col items-center justify-center text-center shadow-inner group">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">
                    On Light Background
                  </span>
                  <div className="relative w-44 h-12">
                    <Image
                      src={currentLogo}
                      alt="Brand Logo on light backdrop"
                      fill
                      className="object-contain object-center group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Logo ImageKit Uploader */}
            <div className="lg:col-span-6 bg-[#fcfaf7] p-5 rounded-2xl border border-[#ebdcc8]">
              <ImageKitUploader
                label="Upload New Brand Logo (PNG / SVG / WebP)"
                folder="/shuvayan_assets"
                currentImageUrl={formData.logoUrl}
                onUploadSuccess={(url) => handleChange('logoUrl', url)}
                onClear={() => handleChange('logoUrl', '')}
              />
            </div>
          </div>
        </div>

        {/* 1. Contact Info Card */}
        <div className="bg-white rounded-2xl p-6 border border-[#e8dfd3] shadow-xs space-y-4">
          <div className="border-b border-gray-100 pb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#c8102e]" />
            <h3 className="text-base font-bold font-serif-display text-gray-900">
              Direct Contact Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Primary Phone Number</label>
              <input
                type="text"
                required
                value={formData.primaryPhone}
                onChange={(e) => handleChange('primaryPhone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Secondary Phone Number</label>
              <input
                type="text"
                value={formData.secondaryPhone}
                onChange={(e) => handleChange('secondaryPhone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">WhatsApp Business Number</label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Contact Email Address</label>
              <input
                type="email"
                required
                value={formData.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">Office / Studio Physical Address</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
              />
            </div>
          </div>
        </div>

        {/* 2. Social Media Links */}
        <div className="bg-white rounded-2xl p-6 border border-[#e8dfd3] shadow-xs space-y-4">
          <div className="border-b border-gray-100 pb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#c8102e]" />
            <h3 className="text-base font-bold font-serif-display text-gray-900">
              Social Media Links
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Facebook Page URL</label>
              <input
                type="url"
                value={formData.facebookUrl}
                onChange={(e) => handleChange('facebookUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Instagram Profile URL</label>
              <input
                type="url"
                value={formData.instagramUrl}
                onChange={(e) => handleChange('instagramUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">YouTube Channel URL</label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3. Cloud Storage & Database Integrations (Firebase & ImageKit) */}
        <div className="bg-white rounded-2xl p-6 border border-[#e8dfd3] shadow-xs space-y-4">
          <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#c8102e]" />
              <h3 className="text-base font-bold font-serif-display text-gray-900">
                Cloud Integrations (Firebase &amp; ImageKit)
              </h3>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#d99824]/20 text-[#855106] px-2.5 py-0.5 rounded-full border border-[#d99824]/40">
              Admin Only
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Firebase Status */}
            <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#e8dfd3] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">🔥 Firebase Auth &amp; Firestore</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Ready
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed text-[11px]">
                Configured in <code className="text-[#c8102e] font-mono">lib/firebase.ts</code>. Supports Firestore cloud sync for inquiries and admin authentication.
              </p>
              <div className="text-[10px] text-gray-400 font-mono">
                Keys: NEXT_PUBLIC_FIREBASE_PROJECT_ID
              </div>
            </div>

            {/* ImageKit Status */}
            <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#e8dfd3] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">🖼️ ImageKit CDN Media Upload</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Ready
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed text-[11px]">
                Configured with <code className="text-[#c8102e] font-mono">pages/api/imagekit/auth.ts</code> and direct client uploader component.
              </p>
              <div className="text-[10px] text-gray-400 font-mono">
                Keys: NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
              </div>
            </div>
          </div>
        </div>

        {/* 4. Policy Page Rich Content Editor (CKEditor / WYSIWYG) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#fff5ea] text-[#c8102e] border border-[#eedfcb]">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-lg font-bold font-serif-display text-gray-900">
                  Policy &amp; Terms Page Content Editor
                </h3>
                <p className="text-xs text-gray-500">
                  Rich formatting editor (CKEditor style) to customize booking terms, milestone schedules, food hygiene, and notices.
                </p>
              </div>
            </div>

            <Link
              href="/policy"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#c8102e] hover:underline"
            >
              <span>Preview Policy Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Policy Body Content (WYSIWYG Rich Editor)
            </label>
            <RichTextEditor
              value={formData.policyHtmlContent || ''}
              onChange={(html) => handleChange('policyHtmlContent', html)}
              placeholder="Format policy clauses, bullet points, headers, notice callouts, or payment milestones..."
              minHeight="380px"
            />
            <p className="text-[11px] text-gray-500">
              Supports Headings (H1, H2, H3), bold/italic styling, numbered lists, bullet lists, custom notice alert callouts, and links.
            </p>
          </div>
        </div>

        {/* Save button bottom */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#c8102e] to-[#9e0a22] hover:from-[#a80b24] hover:to-[#80071a] text-white text-xs font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>
      </form>

      {/* Success Confirmation Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#ebdcc8] text-center space-y-5 animate-scaleUp">
            {/* Animated Check Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-200 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-2 inline-block">
                Firebase Cloud Synced
              </span>
              <h3 className="text-xl font-bold font-serif-display text-gray-900">
                Settings Saved Successfully!
              </h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Your contact numbers, WhatsApp link, email, office address, and social links are saved and live across the website.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/"
                target="_blank"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl border border-[#e0cbaf] bg-[#faf7f2] hover:bg-[#f3ede1] text-[#784d16] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Live Site</span>
              </Link>

              <button
                type="button"
                onClick={() => setShowSuccessPopup(false)}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
