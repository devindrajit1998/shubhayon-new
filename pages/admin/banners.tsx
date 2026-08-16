import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2,
  Save,
  Sparkles,
  ImageIcon,
  ExternalLink,
  Home,
  Briefcase,
  Package,
  Layers,
  BookOpen,
  ShieldCheck,
  Camera,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageKitUploader from '@/components/admin/ImageKitUploader';
import { useAdminData } from '@/context/AdminDataContext';

type PageTab = 'home' | 'services' | 'packages' | 'gallery' | 'about' | 'policy' | 'polaroids';

export default function AdminBannersPage() {
  const { banners, updateBanners } = useAdminData();
  const [formData, setFormData] = useState(banners);
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (banners) {
      setFormData(banners);
    }
  }, [banners]);

  const handleChange = (field: keyof typeof banners, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    setSaveSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBanners(formData);
    setSaveSuccess(true);
    setShowSuccessPopup(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const tabs: { id: PageTab; label: string; icon: any; route: string }[] = [
    { id: 'home', label: 'Homepage', icon: Home, route: '/' },
    { id: 'services', label: 'Services Page', icon: Briefcase, route: '/services' },
    { id: 'packages', label: 'Packages Page', icon: Package, route: '/packages' },
    { id: 'gallery', label: 'Gallery Page', icon: Layers, route: '/gallery' },
    { id: 'about', label: 'About Us Page', icon: BookOpen, route: '/about' },
    { id: 'policy', label: 'Policy Page', icon: ShieldCheck, route: '/policy' },
    { id: 'polaroids', label: '3-Polaroid Cluster', icon: Camera, route: '/about' },
  ];

  return (
    <AdminLayout
      title="Banners & Media Manager"
      subtitle="Customize distinct banner background images, titles, and taglines for every page on your website."
      activeNav="banners"
    >
      <form onSubmit={handleSave} className="w-full space-y-6">
        {/* Top notification and save trigger */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8dfd3] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Page-Specific Banners &amp; Media</h2>
            <p className="text-xs text-gray-500">Configure distinct hero backdrops and titles for each page</p>
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
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#c8102e] to-[#9e0a22] hover:from-[#a80b24] hover:to-[#80071a] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save All Page Banners</span>
            </button>
          </div>
        </div>

        {/* Page Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#c8102e] text-white border-[#c8102e] shadow-xs'
                    : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. HOMEPAGE BANNER CONTENT */}
        {activeTab === 'home' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] shadow-xs space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  Page 1 of 6
                </span>
                <h3 className="text-xl font-bold font-serif-display text-gray-900">
                  Homepage Main Hero Banner
                </h3>
                <p className="text-xs text-gray-500">
                  Appears on the main website landing page (`/`)
                </p>
              </div>

              <Link
                href="/"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border border-[#e0cbaf] bg-[#faf7f2] hover:bg-[#f3ede1] text-[#784d16] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Preview Homepage</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Hero Subtitle / Script Prefix
                </label>
                <input
                  type="text"
                  placeholder="e.g. We make"
                  value={formData.homeHeroSubtitle}
                  onChange={(e) => handleChange('homeHeroSubtitle', e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Hero Main Headline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Every moment Unforgettable"
                  value={formData.homeHeroTitle}
                  onChange={(e) => handleChange('homeHeroTitle', e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Hero Tagline / Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Shuvayan brings your dream celebration to life with creativity, elegance & flawless execution."
                  value={formData.homeHeroTagline}
                  onChange={(e) => handleChange('homeHeroTagline', e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="sm:col-span-2 bg-[#fcfaf7] p-5 rounded-2xl border border-[#ebdcc8] mt-2">
                <ImageKitUploader
                  label="Homepage Background Image"
                  aspect="banner"
                  folder="/shuvayan_banners"
                  currentImageUrl={formData.homeHeroBgImage}
                  onUploadSuccess={(url) => handleChange('homeHeroBgImage', url)}
                  onClear={() => handleChange('homeHeroBgImage', '')}
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. SERVICES PAGE BANNER */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] shadow-xs space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  Page 2 of 6
                </span>
                <h3 className="text-xl font-bold font-serif-display text-gray-900">
                  Services Page Hero Banner
                </h3>
                <p className="text-xs text-gray-500">
                  Appears at the top of the Our Services page (`/services`)
                </p>
              </div>

              <Link
                href="/services"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border border-[#e0cbaf] bg-[#faf7f2] hover:bg-[#f3ede1] text-[#784d16] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Preview Services Page</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Services Page Main Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Our Services"
                  value={formData.servicesHeroTitle}
                  onChange={(e) => handleChange('servicesHeroTitle', e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Services Tagline / Subtitle
                </label>
                <input
                  type="text"
                  placeholder="e.g. Traditional Rituals, Decor & Styling"
                  value={formData.servicesHeroSubtitle}
                  onChange={(e) => handleChange('servicesHeroSubtitle', e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="sm:col-span-2 bg-[#fcfaf7] p-5 rounded-2xl border border-[#ebdcc8] mt-2">
                <ImageKitUploader
                  label="Services Page Hero Background Image"
                  aspect="banner"
                  folder="/shuvayan_banners"
                  currentImageUrl={formData.servicesHeroBgImage}
                  onUploadSuccess={(url) => handleChange('servicesHeroBgImage', url)}
                  onClear={() => handleChange('servicesHeroBgImage', '')}
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. PACKAGES PAGE BANNER */}
        {activeTab === 'packages' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] shadow-xs space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  Page 3 of 6
                </span>
                <h3 className="text-xl font-bold font-serif-display text-gray-900">
                  Packages Page Hero Banner
                </h3>
                <p className="text-xs text-gray-500">
                  Appears at the top of the Wedding Packages page (`/packages`)
                </p>
              </div>

              <Link
                href="/packages"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border border-[#e0cbaf] bg-[#faf7f2] hover:bg-[#f3ede1] text-[#784d16] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Preview Packages Page</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Packages Page Main Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Best Packages / Curated Wedding Packages"
                  value={formData.packagesHeroTitle}
                  onChange={(e) => handleChange('packagesHeroTitle', e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Packages Subtitle / Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Transparent, All-Inclusive Wedding Tiers"
                  value={formData.packagesHeroSubtitle}
                  onChange={(e) => handleChange('packagesHeroSubtitle', e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="sm:col-span-2 bg-[#fcfaf7] p-5 rounded-2xl border border-[#ebdcc8] mt-2">
                <ImageKitUploader
                  label="Packages Page Hero Background Image"
                  aspect="banner"
                  folder="/shuvayan_banners"
                  currentImageUrl={formData.packagesHeroBgImage}
                  onUploadSuccess={(url) => handleChange('packagesHeroBgImage', url)}
                  onClear={() => handleChange('packagesHeroBgImage', '')}
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. GALLERY PAGE BANNER */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] shadow-xs space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  Page 4 of 6
                </span>
                <h3 className="text-xl font-bold font-serif-display text-gray-900">
                  Gallery Page Hero Banner
                </h3>
                <p className="text-xs text-gray-500">
                  Appears at the top of the Portfolio Gallery page (`/gallery`)
                </p>
              </div>

              <Link
                href="/gallery"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border border-[#e0cbaf] bg-[#faf7f2] hover:bg-[#f3ede1] text-[#784d16] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Preview Gallery Page</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Gallery Page Main Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Moments that last forever"
                  value={formData.galleryHeroTitle}
                  onChange={(e) => handleChange('galleryHeroTitle', e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Gallery Subtitle / Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Real Bengali Brides & Royal Mandap Designs"
                  value={formData.galleryHeroSubtitle}
                  onChange={(e) => handleChange('galleryHeroSubtitle', e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="sm:col-span-2 bg-[#fcfaf7] p-5 rounded-2xl border border-[#ebdcc8] mt-2">
                <ImageKitUploader
                  label="Gallery Page Hero Background Image"
                  aspect="banner"
                  folder="/shuvayan_banners"
                  currentImageUrl={formData.galleryHeroBgImage}
                  onUploadSuccess={(url) => handleChange('galleryHeroBgImage', url)}
                  onClear={() => handleChange('galleryHeroBgImage', '')}
                />
              </div>
            </div>
          </div>
        )}

        {/* 5. ABOUT US PAGE BANNER */}
        {activeTab === 'about' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] shadow-xs space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  Page 5 of 6
                </span>
                <h3 className="text-xl font-bold font-serif-display text-gray-900">
                  About Us Page Hero Banner
                </h3>
                <p className="text-xs text-gray-500">
                  Appears at the top of the About Us page (`/about`)
                </p>
              </div>

              <Link
                href="/about"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border border-[#e0cbaf] bg-[#faf7f2] hover:bg-[#f3ede1] text-[#784d16] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Preview About Page</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  About Page Main Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. About Us"
                  value={formData.aboutHeroTitle}
                  onChange={(e) => handleChange('aboutHeroTitle', e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  About Subtitle / Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Heritage Bengali Wedding Artisans"
                  value={formData.aboutHeroSubtitle}
                  onChange={(e) => handleChange('aboutHeroSubtitle', e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="sm:col-span-2 bg-[#fcfaf7] p-5 rounded-2xl border border-[#ebdcc8] mt-2">
                <ImageKitUploader
                  label="About Us Hero Background Image"
                  aspect="banner"
                  folder="/shuvayan_banners"
                  currentImageUrl={formData.aboutHeroBgImage}
                  onUploadSuccess={(url) => handleChange('aboutHeroBgImage', url)}
                  onClear={() => handleChange('aboutHeroBgImage', '')}
                />
              </div>
            </div>
          </div>
        )}

        {/* 6. POLICY PAGE BANNER */}
        {activeTab === 'policy' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] shadow-xs space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  Page 6 of 6
                </span>
                <h3 className="text-xl font-bold font-serif-display text-gray-900">
                  Policy &amp; Terms Page Hero Banner
                </h3>
                <p className="text-xs text-gray-500">
                  Appears at the top of the Booking Policy &amp; Terms page (`/policy`)
                </p>
              </div>

              <Link
                href="/policy"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border border-[#e0cbaf] bg-[#faf7f2] hover:bg-[#f3ede1] text-[#784d16] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Preview Policy Page</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Policy Page Main Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Policy & Terms"
                  value={formData.policyHeroTitle}
                  onChange={(e) => handleChange('policyHeroTitle', e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Policy Subtitle / Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Transparent Booking & Service Commitments"
                  value={formData.policyHeroSubtitle}
                  onChange={(e) => handleChange('policyHeroSubtitle', e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="sm:col-span-2 bg-[#fcfaf7] p-5 rounded-2xl border border-[#ebdcc8] mt-2">
                <ImageKitUploader
                  label="Policy Page Hero Background Image"
                  aspect="banner"
                  folder="/shuvayan_banners"
                  currentImageUrl={formData.policyHeroBgImage}
                  onUploadSuccess={(url) => handleChange('policyHeroBgImage', url)}
                  onClear={() => handleChange('policyHeroBgImage', '')}
                />
              </div>
            </div>
          </div>
        )}

        {/* 7. 3-POLAROID SNAPSHOT CLUSTER */}
        {activeTab === 'polaroids' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] shadow-xs space-y-6 animate-fadeIn">
            <div className="border-b border-gray-100 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                Hanging Showcase
              </span>
              <h3 className="text-xl font-bold font-serif-display text-gray-900">
                3-Polaroid Snapshot Cluster (Hangs in Inner Headers)
              </h3>
              <p className="text-xs text-gray-500">
                These 3 tilted snapshots hang over the breadcrumb across Gallery, Services, Packages, About, and Policy pages.
              </p>
            </div>

            {/* Live Preview Cluster */}
            <div className="bg-[#1a0e0d] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center border border-[#3b201d] overflow-hidden shadow-inner">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d99824] mb-6 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Polaroid Cluster Preview</span>
              </span>

              <div className="relative flex items-center justify-center w-72 sm:w-80 h-48">
                {/* Left Snapshot */}
                <div className="absolute -left-4 w-28 aspect-[3/4] bg-white p-1.5 shadow-2xl transform -rotate-14 rounded-xs transition-transform duration-300">
                  <div className="relative w-full h-full bg-gray-900 overflow-hidden">
                    {formData.snapshotLeft && (
                      <Image
                        src={formData.snapshotLeft}
                        alt="Left snapshot preview"
                        fill
                        className="object-cover object-top"
                      />
                    )}
                  </div>
                </div>

                {/* Center Snapshot */}
                <div className="relative z-20 w-32 aspect-[3/4] bg-white p-1.5 shadow-2xl rounded-xs transition-transform duration-300">
                  <div className="relative w-full h-full bg-gray-900 overflow-hidden">
                    {formData.snapshotMid && (
                      <Image
                        src={formData.snapshotMid}
                        alt="Center snapshot preview"
                        fill
                        className="object-cover object-center"
                      />
                    )}
                  </div>
                </div>

                {/* Right Snapshot */}
                <div className="absolute -right-4 w-28 aspect-[3/4] bg-white p-1.5 shadow-2xl transform rotate-14 rounded-xs transition-transform duration-300">
                  <div className="relative w-full h-full bg-gray-900 overflow-hidden">
                    {formData.snapshotRight && (
                      <Image
                        src={formData.snapshotRight}
                        alt="Right snapshot preview"
                        fill
                        className="object-cover object-center"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Uploaders for 3 snapshots */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="bg-[#fcfaf7] p-4 rounded-2xl border border-[#ebdcc8]">
                <ImageKitUploader
                  label="Left Photo (Tilted -14°)"
                  folder="/shuvayan_banners"
                  currentImageUrl={formData.snapshotLeft}
                  onUploadSuccess={(url) => handleChange('snapshotLeft', url)}
                  onClear={() => handleChange('snapshotLeft', '')}
                />
              </div>

              <div className="bg-[#fcfaf7] p-4 rounded-2xl border border-[#ebdcc8]">
                <ImageKitUploader
                  label="Center Photo (Main Spotlight)"
                  folder="/shuvayan_banners"
                  currentImageUrl={formData.snapshotMid}
                  onUploadSuccess={(url) => handleChange('snapshotMid', url)}
                  onClear={() => handleChange('snapshotMid', '')}
                />
              </div>

              <div className="bg-[#fcfaf7] p-4 rounded-2xl border border-[#ebdcc8]">
                <ImageKitUploader
                  label="Right Photo (Tilted +14°)"
                  folder="/shuvayan_banners"
                  currentImageUrl={formData.snapshotRight}
                  onUploadSuccess={(url) => handleChange('snapshotRight', url)}
                  onClear={() => handleChange('snapshotRight', '')}
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save */}
        <div className="flex justify-end pt-4 pb-8">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#c8102e] to-[#9e0a22] hover:from-[#a80b24] hover:to-[#80071a] text-white text-xs font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Banner Settings</span>
          </button>
        </div>
      </form>

      {/* Success Confirmation Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#ebdcc8] text-center space-y-5 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-200 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-2 inline-block">
                Firebase Cloud Synced
              </span>
              <h3 className="text-xl font-bold font-serif-display text-gray-900">
                Page Banners Saved Successfully!
              </h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Your distinct background banners, titles, and polaroid snapshots have been updated and are live across all public pages.
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
