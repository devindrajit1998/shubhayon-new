import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppModals } from '@/context/AppModalContext';
import { useAdminData } from '@/context/AdminDataContext';
import { PackageData } from '@/components/PackageDetailModal';
import { Sparkles, Package, ShieldCheck, CheckCircle2, ArrowRight, IndianRupee, Users } from 'lucide-react';

function PackageCardRow({
  pkg,
  index,
  openQuoteModal,
}: {
  pkg: PackageData;
  index: number;
  openQuoteModal: (packageName: string) => void;
}) {
  const featuresToDisplay = (pkg.fullFeatures && pkg.fullFeatures.length > 0)
    ? pkg.fullFeatures
    : pkg.features || [];

  return (
    <div
      id={`package-full-card-${pkg.id}`}
      className="bg-white rounded-2xl border border-[#eedfcb] shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="p-6 sm:p-8 lg:p-10 space-y-6">
        {/* Top Header Row: Badge, Guest Count & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#f3e7d7] pb-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              {pkg.badge && (
                <span className="inline-flex items-center gap-1 bg-[#c8102e] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  {pkg.badge}
                </span>
              )}
              <span className="text-xs font-semibold text-[#881b21] bg-[#fff5ea] px-3.5 py-1 rounded-full border border-[#eedfcb]">
                {pkg.idealGuests || pkg.idealFor || 'Bespoke Guest Scope'}
              </span>
            </div>

            <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-[34px] leading-tight text-[#c8102e] font-medium">
              {pkg.title}
            </h2>
          </div>

          <div>
            <button
              type="button"
              onClick={() => openQuoteModal(pkg.title)}
              className="w-full sm:w-auto bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs sm:text-sm font-semibold px-6 sm:px-8 py-3 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Book / Inquire</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Narrative Descriptions */}
        <div className="space-y-1.5 max-w-4xl">
          {pkg.tagline && (
            <p className="text-[15px] sm:text-[16px] text-[#74161f] font-medium italic">
              {pkg.tagline}
            </p>
          )}

          {pkg.description && (
            <p className="text-[14px] text-gray-600 leading-relaxed whitespace-pre-line">
              {pkg.description}
            </p>
          )}
        </div>

        {/* Full Width Inclusions & Exclusions Stack */}
        <div className="space-y-6 pt-2">
          {/* Full Width Inclusions Panel */}
          <div className="w-full space-y-5 bg-[#fdfcf9] p-5 sm:p-7 lg:p-8 rounded-2xl border border-[#ede3d4]">
            {pkg.inclusionCategories && pkg.inclusionCategories.length > 0 ? (
              <div className="space-y-7">
                {pkg.inclusionCategories.map((category, catIdx) => (
                  <div key={catIdx} className="space-y-4 border-b border-[#ebdcc8] last:border-b-0 pb-6 last:pb-0">
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#74161f] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#c8102e]" />
                      <span>{category.categoryName} INCLUSIONS</span>
                    </h4>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-4">
                      {category.topics.map((topic, topIdx) => (
                        <div key={topIdx} className="flex items-start gap-3 text-xs sm:text-[13px]">
                          <CheckCircle2 className="w-4 h-4 text-[#c8102e] flex-shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <span className="font-bold text-gray-900 leading-snug">
                              {topIdx + 1}. {topic.title}:
                            </span>
                            {topic.description && (
                              <p className="text-xs text-gray-600 leading-relaxed">
                                {topic.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#74161f] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c8102e]" />
                  <span>Package Inclusions &amp; Services</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {featuresToDisplay.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#c8102e] flex-shrink-0 mt-0.5" />
                      <span className="leading-snug font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Full Width Exclusions Panel at Bottom */}
          {pkg.exclusions && pkg.exclusions.length > 0 && (
            <div className="w-full space-y-3.5 bg-red-50/45 p-5 sm:p-6 lg:p-7 rounded-2xl border border-red-200/60">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-red-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span>Exclusions</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {pkg.exclusions.map((ex, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-red-800">
                    <span className="text-red-400 font-bold text-sm leading-none mt-0.5">&times;</span>
                    <span className="leading-snug">{ex}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PackagesPage() {
  const { openQuoteModal, openPackageModal } = useAppModals();
  const { packages, banners, isLoading, error } = useAdminData();

  const bannerBg = banners?.packagesHeroBgImage || banners?.innerHeroBgImage || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/galler-banner.png';
  const bannerTitle = banners?.packagesHeroTitle || 'Best Packages';
  const snapLeft = banners?.packagesSnapshotLeft || banners?.snapshotLeft || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-left.jpg';
  const snapMid = banners?.packagesSnapshotMid || banners?.snapshotMid || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-mid.png';
  const snapRight = banners?.packagesSnapshotRight || banners?.snapshotRight || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-right.jpg';

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdfa] selection:bg-[#c8102e] selection:text-white">
      <Head>
        <title>Curated Wedding Packages | Shuvayan Event Management</title>
        <meta
          name="description"
          content="Explore our transparent wedding packages tailored for intimate family weddings to grand royal celebrations in Kolkata and West Bengal."
        />
      </Head>

      {/* Main Header */}
      <Header activePage="packages" />

      <main className="flex-1">
        {/* 1. Hero Banner matching Services & Gallery inner page style */}
        <section
          id="packages-hero"
          className="relative z-20 h-[320px] sm:h-[340px] lg:h-[350px] overflow-visible bg-[#1a0f0e] select-none"
        >
          {/* Background image with dark warm wedding backdrop */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src={bannerBg}
              alt="Packages Wedding Background"
              fill
              priority
              className="object-cover object-center brightness-95"
              referrerPolicy="no-referrer"
            />
            {/* Left dark vignette for headline legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#120606]/95 via-[#190908]/75 to-transparent" />
            {/* Top dark gradient for header overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/30" />
          </div>

          {/* Main Container - max-w-[1340px] aligned with Header */}
          <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col sm:flex-row items-center justify-between">
            {/* Heading */}
            <div className="pt-20 sm:pt-12 lg:pt-14 text-center sm:text-left w-full sm:w-auto sm:max-w-md md:max-w-xl">
              <h1 className="font-serif-display font-normal text-[26px] sm:text-4xl md:text-5xl lg:text-[58px] xl:text-[65px] text-white leading-[1.15] sm:leading-[1.12] tracking-tight drop-shadow-sm">
                {bannerTitle}
              </h1>
            </div>

            {/* Polaroid Snapshots */}
            <div className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 lg:right-8 xl:right-12 top-[168px] sm:top-[115px] lg:top-[120px] z-30">
              <div className="relative flex items-center justify-center w-56 sm:w-64 md:w-80 lg:w-[380px] xl:w-[420px]">
                {/* Left Snapshot */}
                <div
                  className="absolute -left-2 sm:-left-4 md:-left-6 lg:-left-10 w-20 sm:w-26 md:w-34 lg:w-40 xl:w-44 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_10px_25px_rgba(0,0,0,0.55)] transform -rotate-14 hover:rotate-0 hover:z-30 hover:scale-105 transition-all duration-300 ring-1 ring-black/10 rounded-xs"
                >
                  <div className="relative w-full h-full overflow-hidden bg-gray-900">
                    <Image
                      src={snapLeft}
                      alt="Groom & Bride"
                      fill
                      className="object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Center Snapshot */}
                <div
                  className="relative z-20 w-24 sm:w-30 md:w-38 lg:w-46 xl:w-50 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_18px_35px_rgba(0,0,0,0.7)] transform hover:scale-105 transition-all duration-300 ring-1 ring-black/10 rounded-xs"
                >
                  <div className="relative w-full h-full overflow-hidden bg-gray-900">
                    <Image
                      src={snapMid}
                      alt="Bengali Bride in Palki"
                      fill
                      className="object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Right Snapshot */}
                <div
                  className="absolute -right-2 sm:-right-4 md:-right-6 lg:-right-10 w-20 sm:w-26 md:w-34 lg:w-40 xl:w-44 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_10px_25px_rgba(0,0,0,0.55)] transform rotate-14 hover:rotate-0 hover:z-30 hover:scale-105 transition-all duration-300 ring-1 ring-black/10 rounded-xs"
                >
                  <div className="relative w-full h-full overflow-hidden bg-gray-900">
                    <Image
                      src={snapRight}
                      alt="Wedding Couple"
                      fill
                      className="object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Breadcrumbs Navigation */}
        <section id="packages-breadcrumb" className="relative z-10 bg-[#fff5ea] py-3.5 border-b border-[#eedfcb]">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs sm:text-[13px] text-[#554343]">
              <Link href="/" className="hover:text-[#9e1b21] transition-colors font-medium">
                Home
              </Link>
              <span className="text-[#a89595]">&gt;</span>
              <span className="text-[#881b21] font-semibold">Packages</span>
            </div>
          </div>
        </section>

        {/* 3. Packages List Content (One-by-one full width card) */}
        <section className="py-10 sm:py-14 lg:py-16 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <p
              id="packages-subheading"
              className="text-[#c91103] font-light text-sm sm:text-[25px] tracking-normal leading-tight mb-0 sm:mb-0.5"
            >
              We Offer
            </p>
            <h2
              id="packages-heading"
              className="font-serif-display text-3xl sm:text-4xl lg:text-[40px] font-normal text-[#787576] tracking-tight leading-tight"
            >
              Curated Wedding Packages
            </h2>

            {/* Red line with Heart Divider */}
            <div className="flex items-center justify-center gap-3 mt-2 sm:mt-2.5 mb-0">
              <span className="w-14 sm:w-16 h-[1px] bg-[#c8102e]" />
              <span className="relative w-3.5 h-3.5 inline-block">
                <Image
                  src="/images/heart.svg"
                  alt="Heart"
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </span>
              <span className="w-14 sm:w-16 h-[1px] bg-[#c8102e]" />
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-2xl border border-[#eedfcb] p-8 animate-pulse grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-7 space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-16 bg-gray-200 rounded w-full" />
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-4 bg-gray-200 rounded" />
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-5 aspect-[4/3] bg-gray-200 rounded-xl" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!isLoading && error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-lg mx-auto">
              <p className="text-sm font-semibold text-red-700">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && packages.length === 0 && (
            <div className="bg-white border border-dashed border-[#d8b590] rounded-3xl p-16 text-center max-w-lg mx-auto">
              <Package className="w-12 h-12 text-[#d99824] mx-auto mb-3" />
              <h3 className="font-serif-display text-xl font-bold text-gray-800 mb-1">
                No Packages Found
              </h3>
              <p className="text-xs text-gray-500 mb-5">
                Our team is currently updating the wedding packages. Inquire directly for bespoke packages.
              </p>
              <button
                onClick={() => openQuoteModal('Custom Wedding Planning')}
                className="bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition-colors cursor-pointer"
              >
                Inquire With Wedding Specialist
              </button>
            </div>
          )}

          {/* Real Firebase Packages List rendered one-by-one as full width cards */}
          {!isLoading && !error && packages.length > 0 && (
            <div className="space-y-8 sm:space-y-10">
              {packages.map((pkg, index) => (
                <PackageCardRow
                  key={pkg.id}
                  pkg={pkg}
                  index={index}
                  openQuoteModal={openQuoteModal}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
