import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sliders,
  CheckCircle2,
  Save,
  RotateCcw,
  Sparkles,
  Eye,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData } from '@/context/AdminDataContext';

export default function AdminBannersPage() {
  const { banners, updateBanners } = useAdminData();
  const [formData, setFormData] = useState(banners);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: keyof typeof banners, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    setSaveSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBanners(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <AdminLayout
      title="Banners & Media Manager"
      subtitle="Configure homepage hero banners, inner page backgrounds, and the 3-Polaroid snapshot cluster."
      activeNav="banners"
    >
      <form onSubmit={handleSave} className="space-y-8 max-w-5xl">
        {/* Top notification and save trigger */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8dfd3] shadow-xs flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Hero Media &amp; Banners</h2>
            <p className="text-xs text-gray-500">Live preview and update website banners</p>
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
              <span>Save Banner Changes</span>
            </button>
          </div>
        </div>

        {/* 1. Inner Page Polaroid Snapshot Cluster Manager */}
        <div className="bg-white rounded-2xl p-6 border border-[#e8dfd3] shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-bold font-serif-display text-gray-900">
              3-Polaroid Snapshot Cluster (Inner Page Banners)
            </h3>
            <p className="text-xs text-gray-500">
              These 3 tilted photos hang across the banner and breadcrumb on Gallery, Services, Packages, About, etc.
            </p>
          </div>

          {/* Live Preview Cluster */}
          <div className="bg-[#1a0e0d] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center border border-[#3b201d] overflow-hidden">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d99824] mb-6">
              Live Polaroid Cluster Preview
            </span>

            <div className="relative flex items-center justify-center w-72 sm:w-80 h-44">
              {/* Left Snapshot */}
              <div className="absolute -left-4 w-28 aspect-[3/4] bg-white p-1 shadow-2xl transform -rotate-14 rounded-xs">
                <div className="relative w-full h-full bg-gray-900 overflow-hidden">
                  <Image
                    src={formData.snapshotLeft}
                    alt="Left snapshot preview"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Center Snapshot */}
              <div className="relative z-20 w-32 aspect-[3/4] bg-white p-1 shadow-2xl rounded-xs">
                <div className="relative w-full h-full bg-gray-900 overflow-hidden">
                  <Image
                    src={formData.snapshotMid}
                    alt="Center snapshot preview"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Right Snapshot */}
              <div className="absolute -right-4 w-28 aspect-[3/4] bg-white p-1 shadow-2xl transform rotate-14 rounded-xs">
                <div className="relative w-full h-full bg-gray-900 overflow-hidden">
                  <Image
                    src={formData.snapshotRight}
                    alt="Right snapshot preview"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields for 3 snapshots */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Left Photo Path (Tilted -14&deg;)
              </label>
              <input
                type="text"
                required
                value={formData.snapshotLeft}
                onChange={(e) => handleChange('snapshotLeft', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Center Photo Path (Main Spotlight)
              </label>
              <input
                type="text"
                required
                value={formData.snapshotMid}
                onChange={(e) => handleChange('snapshotMid', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Right Photo Path (Tilted +14&deg;)
              </label>
              <input
                type="text"
                required
                value={formData.snapshotRight}
                onChange={(e) => handleChange('snapshotRight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
              />
            </div>
          </div>
        </div>

        {/* 2. Homepage Hero Banner Settings */}
        <div className="bg-white rounded-2xl p-6 border border-[#e8dfd3] shadow-xs space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-bold font-serif-display text-gray-900">
              Homepage Hero Banner Content
            </h3>
            <p className="text-xs text-gray-500">
              Headline, taglines, and background image on the main landing page
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Hero Subtitle</label>
              <input
                type="text"
                value={formData.homeHeroSubtitle}
                onChange={(e) => handleChange('homeHeroSubtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Hero Main Title</label>
              <input
                type="text"
                value={formData.homeHeroTitle}
                onChange={(e) => handleChange('homeHeroTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">Hero Tagline Description</label>
              <input
                type="text"
                value={formData.homeHeroTagline}
                onChange={(e) => handleChange('homeHeroTagline', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">Homepage Background Image</label>
              <input
                type="text"
                value={formData.homeHeroBgImage}
                onChange={(e) => handleChange('homeHeroBgImage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3. Inner Page Banner Settings */}
        <div className="bg-white rounded-2xl p-6 border border-[#e8dfd3] shadow-xs space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-bold font-serif-display text-gray-900">
              Inner Pages Hero Banner
            </h3>
            <p className="text-xs text-gray-500">
              Default title and backdrop for Gallery, Services, Packages, etc.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Default Inner Title</label>
              <input
                type="text"
                value={formData.innerHeroTitle}
                onChange={(e) => handleChange('innerHeroTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Inner Page Background Image</label>
              <input
                type="text"
                value={formData.innerHeroBgImage}
                onChange={(e) => handleChange('innerHeroBgImage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-semibold px-6 py-3 rounded-xl shadow-md transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save All Banner Settings</span>
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
