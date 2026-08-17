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
  UtensilsCrossed,
  Layers3,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageKitUploader from '@/components/admin/ImageKitUploader';
import { useAdminData, BannerSettings } from '@/context/AdminDataContext';

type PageTab = 'home' | 'about' | 'services' | 'packages' | 'gallery' | 'menu' | 'policy' | 'polaroids';
type PolaroidPageTarget = 'global' | 'about' | 'services' | 'packages' | 'gallery' | 'menu' | 'policy';

export default function AdminBannersPage() {
  const { banners, updateBanners } = useAdminData();
  const [formData, setFormData] = useState<BannerSettings>(banners);
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [selectedPolaroidTarget, setSelectedPolaroidTarget] = useState<PolaroidPageTarget>('about');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (banners) {
      setFormData(banners);
    }
  }, [banners]);

  const handleChange = (field: keyof BannerSettings, val: string) => {
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
    { id: 'about', label: 'About Us', icon: BookOpen, route: '/about' },
    { id: 'services', label: 'Services', icon: Briefcase, route: '/services' },
    { id: 'packages', label: 'Packages', icon: Package, route: '/packages' },
    { id: 'gallery', label: 'Gallery', icon: Layers, route: '/gallery' },
    { id: 'menu', label: 'Catering Menu', icon: UtensilsCrossed, route: '/menu' },
    { id: 'policy', label: 'Policy & Terms', icon: ShieldCheck, route: '/policy' },
    { id: 'polaroids', label: '3-Polaroids Studio', icon: Camera, route: '/about' },
  ];

  // Helper component to render the 3-Polaroid cluster preview and uploaders
  const renderPolaroidClusterEditor = (
    leftKey: keyof BannerSettings,
    midKey: keyof BannerSettings,
    rightKey: keyof BannerSettings,
    pageTitle: string,
    pageSubtitle: string
  ) => {
    const leftVal = (formData[leftKey] as string) || formData.snapshotLeft || '';
    const midVal = (formData[midKey] as string) || formData.snapshotMid || '';
    const rightVal = (formData[rightKey] as string) || formData.snapshotRight || '';

    return (
      <div className="space-y-6 pt-4 border-t border-[#ebdcc8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30">
              Page-Specific Visuals
            </span>
            <span className="text-xs font-bold text-gray-800">3-Polaroid Cluster for {pageTitle}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {pageSubtitle || `Configure distinct hanging polaroid snapshots for ${pageTitle}. Leave blank to use global defaults.`}
          </p>
        </div>

        {/* Visual Live Cluster Preview */}
        <div className="bg-[#1a0e0d] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center border border-[#3b201d] overflow-hidden shadow-inner">
          <span className="text-xs font-bold uppercase tracking-wider text-[#d99824] mb-6 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Live {pageTitle} Polaroid Cluster Preview</span>
          </span>

          <div className="relative flex items-center justify-center w-72 sm:w-80 h-48">
            {/* Left Snapshot */}
            <div className="absolute -left-4 w-28 aspect-[3/4] bg-white p-1.5 shadow-2xl transform -rotate-14 rounded-xs transition-transform duration-300">
              <div className="relative w-full h-full bg-gray-900 overflow-hidden">
                {leftVal ? (
                  <Image src={leftVal} alt="Left snapshot" fill className="object-cover object-top" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/30 text-[10px]">Left Photo</div>
                )}
              </div>
            </div>

            {/* Center Snapshot */}
            <div className="relative z-20 w-32 aspect-[3/4] bg-white p-1.5 shadow-2xl rounded-xs transition-transform duration-300">
              <div className="relative w-full h-full bg-gray-900 overflow-hidden">
                {midVal ? (
                  <Image src={midVal} alt="Center snapshot" fill className="object-cover object-center" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/30 text-[10px]">Center Photo</div>
                )}
              </div>
            </div>

            {/* Right Snapshot */}
            <div className="absolute -right-4 w-28 aspect-[3/4] bg-white p-1.5 shadow-2xl transform rotate-14 rounded-xs transition-transform duration-300">
              <div className="relative w-full h-full bg-gray-900 overflow-hidden">
                {rightVal ? (
                  <Image src={rightVal} alt="Right snapshot" fill className="object-cover object-center" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/30 text-[10px]">Right Photo</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Uploaders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[#fcfaf7] p-4 rounded-2xl border border-[#ebdcc8]">
            <ImageKitUploader
              label="Left Snapshot (Tilted -14°)"
              folder="/shuvayan_banners"
              currentImageUrl={formData[leftKey] as string}
              onUploadSuccess={(url) => handleChange(leftKey, url)}
              onClear={() => handleChange(leftKey, '')}
            />
          </div>

          <div className="bg-[#fcfaf7] p-4 rounded-2xl border border-[#ebdcc8]">
            <ImageKitUploader
              label="Center Snapshot (Spotlight)"
              folder="/shuvayan_banners"
              currentImageUrl={formData[midKey] as string}
              onUploadSuccess={(url) => handleChange(midKey, url)}
              onClear={() => handleChange(midKey, '')}
            />
          </div>

          <div className="bg-[#fcfaf7] p-4 rounded-2xl border border-[#ebdcc8]">
            <ImageKitUploader
              label="Right Snapshot (Tilted +14°)"
              folder="/shuvayan_banners"
              currentImageUrl={formData[rightKey] as string}
              onUploadSuccess={(url) => handleChange(rightKey, url)}
              onClear={() => handleChange(rightKey, '')}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout
      title="Banners & Media Manager"
      subtitle="Customize distinct banner background images, titles, and 3-polaroid hanging snapshot clusters for each page."
      activeNav="banners"
    >
      <form onSubmit={handleSave} className="w-full space-y-6">
        {/* Top Notification Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8dfd3] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Page-Specific Banners &amp; Polaroid Clusters</h2>
            <p className="text-xs text-gray-500">Configure distinct hero backdrops, titles, and 3-polaroid snapshots per page</p>
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
              <span>Save All Page Settings</span>
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

        {/* 1. HOMEPAGE TAB */}
        {activeTab === 'home' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] shadow-xs space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  Page 1 of 7
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

        {/* 2. ABOUT US TAB */}
        {activeTab === 'about' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] shadow-xs space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  Page 2 of 7
                </span>
                <h3 className="text-xl font-bold font-serif-display text-gray-900">
                  About Us Page Hero Banner &amp; Polaroids
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

            {/* About 3-Polaroid Cluster */}
            {renderPolaroidClusterEditor(
              'aboutSnapshotLeft',
              'aboutSnapshotMid',
              'aboutSnapshotRight',
              'About Us Page',
              'Customize the 3 hanging polaroids that appear over the About Us header.'
            )}
          </div>
        )}

        {/* 3. SERVICES TAB */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] shadow-xs space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  Page 3 of 7
                </span>
                <h3 className="text-xl font-bold font-serif-display text-gray-900">
                  Services Page Hero Banner &amp; Polaroids
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

            {/* Services 3-Polaroid Cluster */}
            {renderPolaroidClusterEditor(
              'servicesSnapshotLeft',
              'servicesSnapshotMid',
              'servicesSnapshotRight',
              'Services Page',
              'Customize the 3 hanging polaroids that appear over the Services header.'
            )}
          </div>
        )}

        {/* 4. PACKAGES TAB */}
        {activeTab === 'packages' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] shadow-xs space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  Page 4 of 7
                </span>
                <h3 className="text-xl font-bold font-serif-display text-gray-900">
                  Packages Page Hero Banner &amp; Polaroids
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
                  placeholder="e.g. Curated Wedding Packages"
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

            {/* Packages 3-Polaroid Cluster */}
            {renderPolaroidClusterEditor(
              'packagesSnapshotLeft',
              'packagesSnapshotMid',
              'packagesSnapshotRight',
              'Packages Page',
              'Customize the 3 hanging polaroids that appear over the Packages header.'
            )}
          </div>
        )}

        {/* 5. GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] shadow-xs space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  Page 5 of 7
                </span>
                <h3 className="text-xl font-bold font-serif-display text-gray-900">
                  Gallery Page Hero Banner &amp; Polaroids
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

            {/* Gallery 3-Polaroid Cluster */}
            {renderPolaroidClusterEditor(
              'gallerySnapshotLeft',
              'gallerySnapshotMid',
              'gallerySnapshotRight',
              'Gallery Page',
              'Customize the 3 hanging polaroids that appear over the Gallery header.'
            )}
          </div>
        )}

        {/* 6. CATERING MENU TAB */}
        {activeTab === 'menu' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] shadow-xs space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  Page 6 of 7
                </span>
                <h3 className="text-xl font-bold font-serif-display text-gray-900">
                  Catering Menu Page Hero Banner &amp; Polaroids
                </h3>
                <p className="text-xs text-gray-500">
                  Appears at the top of the Catering Menu page (`/menu`)
                </p>
              </div>

              <Link
                href="/menu"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border border-[#e0cbaf] bg-[#faf7f2] hover:bg-[#f3ede1] text-[#784d16] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Preview Menu Page</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Menu Page Main Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Plate Menus & Feasts"
                  value={formData.menuHeroTitle || ''}
                  onChange={(e) => handleChange('menuHeroTitle', e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Menu Subtitle / Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gourmet Bengali Catering"
                  value={formData.menuHeroSubtitle || ''}
                  onChange={(e) => handleChange('menuHeroSubtitle', e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="sm:col-span-2 bg-[#fcfaf7] p-5 rounded-2xl border border-[#ebdcc8] mt-2">
                <ImageKitUploader
                  label="Menu Page Hero Background Image"
                  aspect="banner"
                  folder="/shuvayan_banners"
                  currentImageUrl={formData.menuHeroBgImage || ''}
                  onUploadSuccess={(url) => handleChange('menuHeroBgImage', url)}
                  onClear={() => handleChange('menuHeroBgImage', '')}
                />
              </div>
            </div>

            {/* Menu 3-Polaroid Cluster */}
            {renderPolaroidClusterEditor(
              'menuSnapshotLeft',
              'menuSnapshotMid',
              'menuSnapshotRight',
              'Catering Menu Page',
              'Customize the 3 hanging polaroids that appear over the Catering Menu header.'
            )}
          </div>
        )}

        {/* 7. POLICY TAB */}
        {activeTab === 'policy' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] shadow-xs space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  Page 7 of 7
                </span>
                <h3 className="text-xl font-bold font-serif-display text-gray-900">
                  Policy &amp; Terms Page Hero Banner &amp; Polaroids
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

            {/* Policy 3-Polaroid Cluster */}
            {renderPolaroidClusterEditor(
              'policySnapshotLeft',
              'policySnapshotMid',
              'policySnapshotRight',
              'Policy & Terms Page',
              'Customize the 3 hanging polaroids that appear over the Policy header.'
            )}
          </div>
        )}

        {/* 8. DEDICATED 3-POLAROID MASTER STUDIO TAB */}
        {activeTab === 'polaroids' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] shadow-xs space-y-6 animate-fadeIn">
            <div className="border-b border-gray-100 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                3-Polaroid Master Studio
              </span>
              <h3 className="text-xl font-bold font-serif-display text-gray-900">
                Multi-Page 3-Polaroid Snapshot Manager
              </h3>
              <p className="text-xs text-gray-500">
                Customize distinct hanging snapshots for any specific page, or set the global fallback cluster.
              </p>
            </div>

            {/* Page Target Selector Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                { id: 'global' as PolaroidPageTarget, label: '🌐 Global Fallback Default' },
                { id: 'about' as PolaroidPageTarget, label: '📖 About Us Page' },
                { id: 'services' as PolaroidPageTarget, label: '💼 Services Page' },
                { id: 'packages' as PolaroidPageTarget, label: '📦 Packages Page' },
                { id: 'gallery' as PolaroidPageTarget, label: '🖼️ Gallery Page' },
                { id: 'menu' as PolaroidPageTarget, label: '🍽️ Catering Menu Page' },
                { id: 'policy' as PolaroidPageTarget, label: '🛡️ Policy Page' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedPolaroidTarget(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedPolaroidTarget === item.id
                      ? 'bg-[#c8102e] text-white border-[#c8102e] shadow-xs'
                      : 'bg-[#faf7f2] hover:bg-gray-100 text-gray-700 border-[#e8ded1]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Active Selected Page Cluster Editor */}
            {selectedPolaroidTarget === 'global' &&
              renderPolaroidClusterEditor(
                'snapshotLeft',
                'snapshotMid',
                'snapshotRight',
                'Global Fallback Default',
                'Used whenever a page does not have its own specific polaroid snapshots configured.'
              )}

            {selectedPolaroidTarget === 'about' &&
              renderPolaroidClusterEditor(
                'aboutSnapshotLeft',
                'aboutSnapshotMid',
                'aboutSnapshotRight',
                'About Us Page',
                'Hangs over the header of the About Us page (`/about`).'
              )}

            {selectedPolaroidTarget === 'services' &&
              renderPolaroidClusterEditor(
                'servicesSnapshotLeft',
                'servicesSnapshotMid',
                'servicesSnapshotRight',
                'Services Page',
                'Hangs over the header of the Services page (`/services`).'
              )}

            {selectedPolaroidTarget === 'packages' &&
              renderPolaroidClusterEditor(
                'packagesSnapshotLeft',
                'packagesSnapshotMid',
                'packagesSnapshotRight',
                'Packages Page',
                'Hangs over the header of the Packages page (`/packages`).'
              )}

            {selectedPolaroidTarget === 'gallery' &&
              renderPolaroidClusterEditor(
                'gallerySnapshotLeft',
                'gallerySnapshotMid',
                'gallerySnapshotRight',
                'Gallery Page',
                'Hangs over the header of the Gallery page (`/gallery`).'
              )}

            {selectedPolaroidTarget === 'menu' &&
              renderPolaroidClusterEditor(
                'menuSnapshotLeft',
                'menuSnapshotMid',
                'menuSnapshotRight',
                'Catering Menu Page',
                'Hangs over the header of the Catering Menu page (`/menu`).'
              )}

            {selectedPolaroidTarget === 'policy' &&
              renderPolaroidClusterEditor(
                'policySnapshotLeft',
                'policySnapshotMid',
                'policySnapshotRight',
                'Policy & Terms Page',
                'Hangs over the header of the Policy page (`/policy`).'
              )}
          </div>
        )}

        {/* Bottom Save Action */}
        <div className="flex justify-end pt-4 pb-8">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#c8102e] to-[#9e0a22] hover:from-[#a80b24] hover:to-[#80071a] text-white text-xs font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Banner &amp; Polaroid Settings</span>
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
                Settings Saved Successfully!
              </h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Your distinct background banners, titles, and per-page 3-polaroid snapshots have been updated and are live across all pages.
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
