import React, { useState } from 'react';
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
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData } from '@/context/AdminDataContext';

export default function AdminSettingsPage() {
  const { settings, updateSettings, resetAllToDefault } = useAdminData();
  const [formData, setFormData] = useState(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: keyof typeof settings, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    setSaveSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <AdminLayout
      title="Site Settings & Contact Info"
      subtitle="Update phone numbers, WhatsApp, email, office address, and social links displayed across the footer and header."
      activeNav="settings"
    >
      <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
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

        {/* 4. Danger Zone / Reset Defaults */}
        <div className="bg-red-50/70 rounded-2xl p-6 border border-red-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="w-4 h-4" />
            <h3 className="text-sm font-bold">Reset Demo Data</h3>
          </div>
          <p className="text-xs text-red-700 leading-relaxed">
            Reset all content (services, packages, artists, and banners) back to default starter demo values and clear local modifications.
          </p>

          <button
            type="button"
            onClick={() => {
              if (
                confirm(
                  'Are you sure you want to reset all content back to factory default values? This cannot be undone.'
                )
              ) {
                resetAllToDefault();
                alert('Site content reset to factory defaults.');
                window.location.reload();
              }
            }}
            className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All to Defaults</span>
          </button>
        </div>

        {/* Save button bottom */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-semibold px-6 py-3 rounded-xl shadow-md transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
